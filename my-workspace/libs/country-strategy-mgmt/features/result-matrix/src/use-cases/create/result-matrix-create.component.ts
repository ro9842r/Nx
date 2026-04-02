import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ResultMatrixFacade } from '@oper/rm-state';
import { CreateResultMatrixInput } from '@oper/rm-types';
import {
  buildCreateResultMatrixForm,
  buildGovernmentPriorityGroup,
  buildPriorityAreaGroup,
  buildStrategicObjectiveGroup,
  GovernmentPriorityForm,
  PriorityAreaForm,
  StrategicObjectiveForm,
} from './create.schema';

@Component({
  selector: 'lib-result-matrix-create',
  imports: [ReactiveFormsModule, RouterLink],
  template: `<section class="mx-auto w-full max-w-5xl p-4 sm:p-6">
    <form class="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" [formGroup]="form" (ngSubmit)="submit()">
      <header class="space-y-1">
        <h2 class="text-2xl font-semibold text-slate-900">Create Result Matrix</h2>
        <p class="text-sm text-slate-600">Define 1:N hierarchy for priorities, areas, and objectives.</p>
      </header>

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
          {{ saving() ? 'Saving...' : 'Create matrix' }}
        </button>
        <a [routerLink]="['/result-matrix/list']" class="self-center text-sm text-slate-700 hover:underline">Cancel</a>
      </div>

      @if (form.invalid && submitted) {
        <p class="text-sm text-rose-700">Please fill all required fields. Each priority must have at least one area and each area at least one objective.</p>
      }
    </form>
  </section>`,
})
export class ResultMatrixCreate {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly facade = inject(ResultMatrixFacade);

  readonly form = buildCreateResultMatrixForm(this.fb);
  readonly saving = this.facade.store.saving;
  submitted = false;

  get governmentPriorities(): FormArray<GovernmentPriorityForm> {
    return this.form.controls.governmentPriorities;
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
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.toPayload();
    const created = this.facade.create(payload);
    void this.router.navigate(['/result-matrix/detail', created.id]);
  }

  private toPayload(): CreateResultMatrixInput {
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
