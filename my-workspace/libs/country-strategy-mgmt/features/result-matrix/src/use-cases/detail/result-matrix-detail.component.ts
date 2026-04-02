import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ResultMatrixFacade } from '@oper/rm-state';

@Component({
  selector: 'lib-result-matrix-detail',
  imports: [RouterLink],
  template: `<section class="mx-auto w-full max-w-5xl p-4 sm:p-6">
    <div class="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <header class="space-y-2">
        <h2 class="text-2xl font-semibold text-slate-900">Result Matrix Detail</h2>
        <p class="text-sm text-slate-600">Review hierarchy and validate current 1:N model.</p>
      </header>

      @if (loading()) {
        <p class="text-sm text-slate-600">Loading detail...</p>
      } @else if (!matrix()) {
        <p class="text-sm text-rose-700">Result matrix not found.</p>
      } @else {
        <div class="space-y-3 rounded-xl border border-slate-200 p-4">
          <p class="text-sm"><span class="font-semibold">Name:</span> {{ matrix()!.name }}</p>
          <p class="text-sm"><span class="font-semibold">Country Strategy:</span> {{ matrix()!.countryStrategyId }}</p>
          <p class="text-sm"><span class="font-semibold">Status:</span> {{ matrix()!.status }}</p>
        </div>

        <div class="space-y-3">
          @for (priority of matrix()!.governmentPriorities; track priority.id) {
            <article class="rounded-xl border border-slate-200 p-4">
              <h3 class="text-lg font-semibold text-slate-900">{{ priority.order }}. {{ priority.name }}</h3>
              <div class="mt-3 space-y-3">
                @for (area of priority.priorityAreas; track area.id) {
                  <section class="rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <p class="font-medium text-slate-800">{{ priority.order }}.{{ area.order }} {{ area.name }}</p>
                    <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                      @for (objective of area.strategicObjectives; track objective.id) {
                        <li>
                          {{ priority.order }}.{{ area.order }}.{{ objective.order }} {{ objective.title }}
                          @if (objective.description) {
                            <span class="text-slate-500">— {{ objective.description }}</span>
                          }
                        </li>
                      }
                    </ul>
                  </section>
                }
              </div>
            </article>
          }
        </div>
      }

      <div class="flex flex-wrap gap-3">
        <a [routerLink]="['/result-matrix/list']" class="text-sm text-slate-700 hover:underline">Back to list</a>
        @if (matrix()) {
          <a [routerLink]="['/result-matrix/edit', matrix()!.id]" class="text-sm text-emerald-700 hover:underline">Edit matrix</a>
        }
      </div>
    </div>
  </section>`,
})
export class ResultMatrixDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly facade = inject(ResultMatrixFacade);

  readonly matrix = this.facade.store.selected;
  readonly loading = this.facade.store.loading;
  readonly matrixId = this.route.snapshot.paramMap.get('id') ?? '';

  ngOnInit(): void {
    if (this.matrixId) {
      this.facade.loadById(this.matrixId);
    }
  }
}
