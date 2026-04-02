import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResultMatrixFacade } from '@oper/rm-state';

@Component({
  selector: 'lib-result-matrix-list',
  imports: [RouterLink],
  template: `<section class="mx-auto w-full max-w-5xl p-4 sm:p-6">
    <div class="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <header class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-2xl font-semibold text-slate-900">Result Matrices</h2>
          <p class="mt-1 text-sm text-slate-600">POC hierarchy: Government Priority -> Priority Areas -> Strategic Objectives</p>
        </div>
        <a
          [routerLink]="['/result-matrix/create']"
          class="rounded-lg border border-slate-900 bg-slate-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
        >
          New Result Matrix
        </a>
      </header>

      @if (loading()) {
        <p class="text-sm text-slate-600">Loading matrices...</p>
      } @else if (matrices().length === 0) {
        <p class="text-sm text-slate-600">No result matrices found.</p>
      } @else {
        <div class="overflow-x-auto rounded-xl border border-slate-200">
          <table class="min-w-full divide-y divide-slate-200 text-sm">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-3 py-2 text-left font-semibold text-slate-700">Name</th>
                <th class="px-3 py-2 text-left font-semibold text-slate-700">Country Strategy</th>
                <th class="px-3 py-2 text-left font-semibold text-slate-700">Status</th>
                <th class="px-3 py-2 text-left font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 bg-white">
              @for (matrix of matrices(); track matrix.id) {
                <tr>
                  <td class="px-3 py-2 text-slate-900">{{ matrix.name }}</td>
                  <td class="px-3 py-2 text-slate-700">{{ matrix.countryStrategyId }}</td>
                  <td class="px-3 py-2 text-slate-700">{{ matrix.status }}</td>
                  <td class="px-3 py-2">
                    <div class="flex flex-wrap gap-2">
                      <a [routerLink]="['/result-matrix/detail', matrix.id]" class="text-blue-700 hover:underline">Detail</a>
                      <a [routerLink]="['/result-matrix/edit', matrix.id]" class="text-emerald-700 hover:underline">Edit</a>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  </section>`,
})
export class ResultMatrixList implements OnInit {
  private readonly facade = inject(ResultMatrixFacade);
  readonly matrices = this.facade.store.matrices;
  readonly loading = this.facade.store.loading;

  ngOnInit(): void {
    this.facade.load();
  }
}
