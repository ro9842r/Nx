import { Component, input } from '@angular/core';
import { MemberCardComponent } from './member-card.component';
import { Member } from '../types';

@Component({
  selector: 'lib-members-panel',
  imports: [MemberCardComponent],
  template: `
    <div class="rounded-xl border border-slate-200 bg-white p-4">
      <h3 class="text-lg font-semibold text-slate-900">Members</h3>
      <ul class="mt-3 space-y-2">
        @for (member of members(); track member.id) {
          <li><lib-member-card [member]="member" /></li>
        }
      </ul>
    </div>
  `,
})
export class MembersPanelComponent {
  readonly members = input.required<Member[]>();
}
