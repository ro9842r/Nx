import { Component, input } from '@angular/core';
import { Member } from '../types';

@Component({
  selector: 'lib-member-card',
  imports: [],
  template: `
    <div class="flex items-center gap-3 rounded-lg border border-slate-100 p-3">
      <span class="text-sm font-medium text-slate-900">{{ member().name }}</span>
      <span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{{ member().roleCode }}</span>
    </div>
  `,
})
export class MemberCardComponent {
  readonly member = input.required<Member>();
}
