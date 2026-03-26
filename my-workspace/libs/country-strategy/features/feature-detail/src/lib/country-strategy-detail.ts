import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuditEntityType } from '@my-workspace/shared/interfaces';

@Component({
  selector: 'lib-country-strategy-detail',
  imports: [RouterLink],
  templateUrl: './country-strategy-detail.html',
  styleUrl: './country-strategy-detail.scss',
})
export class CountryStrategyDetail {
  private readonly route = inject(ActivatedRoute);
  readonly countryStrategyId = this.route.snapshot.paramMap.get('id') ?? '';
  readonly auditEntityType = AuditEntityType.CountryStrategy;

  get hasCountryStrategyId(): boolean {
    return this.countryStrategyId.trim().length > 0;
  }
}
