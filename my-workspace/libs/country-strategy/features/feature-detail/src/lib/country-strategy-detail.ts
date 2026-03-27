import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuditEntityType } from '@my-workspace/shared/interfaces';
import { CountryStrategyService } from '@my-workspace/country-strategy/core';

@Component({
  selector: 'lib-country-strategy-detail',
  imports: [RouterLink],
  templateUrl: './country-strategy-detail.html',
  styleUrl: './country-strategy-detail.scss',
})
export class CountryStrategyDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(CountryStrategyService);

  readonly countryStrategyId = this.route.snapshot.paramMap.get('id') ?? '';
  readonly auditEntityType = AuditEntityType.CountryStrategy;
  readonly strategy = this.service.store.selected;

  ngOnInit(): void {
    if (this.countryStrategyId) {
      this.service.loadById(this.countryStrategyId);
    }
  }
}
