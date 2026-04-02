import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ResultMatrixFacade } from '@oper/rm-state';
import { UpdateResultMatrixInput } from '@oper/rm-types';
import {
  buildGovernmentPriorityGroup,
  buildPriorityAreaGroup,
  buildStrategicObjectiveGroup,
  GovernmentPriorityForm,
  PriorityAreaForm,
  StrategicObjectiveForm,
} from '../create/create.schema';
import { buildEditResultMatrixForm, EditResultMatrixForm } from './edit.schema';

@Component({
  selector: 'lib-result-matrix-edit',
  imports: [ReactiveFormsModule, RouterLink],
  template: `<section class="mx-auto w-full max-w-5xl p-4 sm:p-6">
    <form class="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" [formGroup]="form" (ngSubmit)="submit()">
      <header class="space-y-1">
        <h2 class="text-2xl font-semibold text-slate-900">Edit Result Matrix</h2>
        <p class="text-sm text-slate-600">Update hierarchy and keep the 1:N structure valid.</p>
      </header>

      @if (notFound) {
        <p class="text-sm text-rose-700">Result matrix not found.</p>
      } @else {
        <div class="grid gap-3 sm:grid-cols-2">
          <label class="space-y-1 text-sm">
            <span class="font-medium text-slate-800">Matrix name</span>
            <input formControlName="name" class="w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label class="space-y-1 text-sm">
            <span class="font-medium text-slate-800">Country strategy ID</span>
            <input formControlName="countryStrategyId" class="w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
        </div>

        <div formArrayName="governmentPriorities" class="space-y-4">
          @for (priorityGroup of governmentPriorities.controls; track $index) {
            <article class="space-y-3 rounded-xl border border-slate-200 p-4" [formGroupName]="$index">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <label class="flex-1 space-y-1 text-sm">
                  <span class="font-medium text-slate-800">Government Priority {{ $index + 1 }}</span>
                  <input formControlName="name" class="w-full rounded-lg border border-slate-300 px-3 py-2" />
                </label>
                <button type="button" class="rounded-lg border border-rose-200 px-2 py-1 text-xs text-rose-700" (click)="removePriority($index)">
                  Remove priority
                </button>
              </div>

              <div formArrayName="priorityAreas" class="space-y-3">
                @for (areaGroup of getPriorityAreas($index).controls; track $index) {
                  <section class="space-y-2 rounded-lg border border-slate-100 bg-slate-50 p-3" [formGroupName]="$index">
                    <div class="flex flex-wrap items-center gap-2">
                      <label class="flex-1 space-y-1 text-sm">
                        <span class="font-medium text-slate-800">Priority Area {{ $index + 1 }}</span>
                        <input formControlName="name" class="w-full rounded-lg border border-slate-300 px-3 py-2" />
                      </label>
                      <button type="button" class="rounded-lg border border-rose-200 px-2 py-1 text-xs text-rose-700" (click)="removeArea(priorityGroup, $index)">
                        Remove area
                      </button>
                    </div>

                    <div formArrayName="strategicObjectives" class="space-y-2">
                      @for (objectiveGroup of getObjectives(areaGroup).controls; track $index) {
                        <div class="grid gap-2 rounded-md border border-slate-200 bg-white p-3 sm:grid-cols-[1fr_1fr_auto]" [formGroupName]="$index">
                          <input formControlName="title" placeholder="Strategic objective" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                          <input formControlName="description" placeholder="Description (optional)" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                          <button type="button" class="rounded-lg border border-rose-200 px-2 py-1 text-xs text-rose-700" (click)="removeObjective(areaGroup, $index)">
                            Remove
                          </button>
                        </div>
                      }
                      <button type="button" class="rounded-lg border border-slate-300 px-3 py-1 text-xs text-slate-700" (click)="addObjective(areaGroup)">
                        Add objective
                      </button>
                    </div>
                  </section>
                }
                <button type="button" class="rounded-lg border border-slate-300 px-3 py-1 text-xs text-slate-700" (click)="addArea(priorityGroup)">
                  Add priority area
                </button>
              </div>
            </article>
          }
        </div>

        <div class="flex flex-wrap gap-3">
          <button type="button" class="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700" (click)="addPriority()">
            Add government priority
          </button>
          <button type="submit" class="rounded-lg border border-slate-900 bg-slate-900 px-3 py-2 text-sm text-white" [disabled]="form.invalid || saving()">
            {{ saving() ? 'Saving...' : 'Save changes' }}
          </button>
          <a [routerLink]="['/result-matrix/detail', matrixId]" class="self-center text-sm text-slate-700 hover:underline">Cancel</a>
        </div>
      }
    </form>
  </section>`,
})
export class ResultMatrixEdit implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly facade = inject(ResultMatrixFacade);

  readonly matrixId = this.route.snapshot.paramMap.get('id') ?? '';
  readonly saving = this.facade.store.saving;
  form: EditResultMatrixForm = buildEditResultMatrixForm(this.fb, {
    name: '',
    countryStrategyId: '',
    governmentPriorities: [],
  });
  notFound = false;

  get governmentPriorities(): FormArray<GovernmentPriorityForm> {
    return this.form.controls.governmentPriorities;
  }

  ngOnInit(): void {
    if (!this.matrixId) {
      this.notFound = true;
      return;
    }
    this.facade.loadById(this.matrixId);
    const current = this.facade.store.selected();
    if (!current) {
      this.notFound = true;
      return;
    }

    const editable = this.facade.toEditableResultMatrix(current);
    this.form = buildEditResultMatrixForm(this.fb, {
      name: editable.name,
      countryStrategyId: editable.countryStrategyId,
      governmentPriorities: editable.governmentPriorities.map((priority) => ({
        name: priority.name,
        priorityAreas: priority.priorityAreas.map((area) => ({
          name: area.name,
          strategicObjectives: area.strategicObjectives.map((objective) => ({
            title: objective.title,
            description: objective.description,
          })),
        })),
      })),
    });
  }

  addPriority(): void {
    this.governmentPriorities.push(buildGovernmentPriorityGroup(this.fb));
  }

  removePriority(index: number): void {
    if (this.governmentPriorities.length <= 1) {
      return;
    }
    this.governmentPriorities.removeAt(index);
  }

  getPriorityAreas(priorityIndex: number): FormArray<PriorityAreaForm> {
    return this.governmentPriorities.at(priorityIndex).controls.priorityAreas;
  }

  addArea(priorityGroup: GovernmentPriorityForm): void {
    priorityGroup.controls.priorityAreas.push(buildPriorityAreaGroup(this.fb));
  }

  removeArea(priorityGroup: GovernmentPriorityForm, areaIndex: number): void {
    if (priorityGroup.controls.priorityAreas.length <= 1) {
      return;
    }
    priorityGroup.controls.priorityAreas.removeAt(areaIndex);
  }

  getObjectives(areaGroup: PriorityAreaForm): FormArray<StrategicObjectiveForm> {
    return areaGroup.controls.strategicObjectives;
  }

  addObjective(areaGroup: PriorityAreaForm): void {
    areaGroup.controls.strategicObjectives.push(buildStrategicObjectiveGroup(this.fb));
  }

  removeObjective(areaGroup: PriorityAreaForm, objectiveIndex: number): void {
    if (areaGroup.controls.strategicObjectives.length <= 1) {
      return;
    }
    areaGroup.controls.strategicObjectives.removeAt(objectiveIndex);
  }

  submit(): void {
    if (this.form.invalid || !this.matrixId) {
      this.form.markAllAsTouched();
      return;
    }
    const updated = this.facade.update(this.matrixId, this.toPayload());
    if (updated) {
      void this.router.navigate(['/result-matrix/detail', updated.id]);
    }
  }

  private toPayload(): UpdateResultMatrixInput {
    const raw = this.form.getRawValue();
    return {
      name: raw.name,
      countryStrategyId: raw.countryStrategyId,
      governmentPriorities: raw.governmentPriorities.map((priority) => ({
        name: priority.name,
        priorityAreas: priority.priorityAreas.map((area) => ({
          name: area.name,
          strategicObjectives: area.strategicObjectives.map((objective) => ({
            title: objective.title,
            description: objective.description || undefined,
          })),
        })),
      })),
    };
  }
}
