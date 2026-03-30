import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryStrategyService } from '../../data-access';

@Component({
  selector: 'lib-country-strategy-detail',
  imports: [],
  templateUrl: './country-strategy-detail.html',
  styleUrl: './country-strategy-detail.scss',
})
export class CountryStrategyDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(CountryStrategyService);

  readonly countryStrategyId = this.route.snapshot.paramMap.get('id') ?? '';
  readonly strategy = this.service.store.selected;

  ngOnInit(): void {
    if (this.countryStrategyId) {
      this.service.loadById(this.countryStrategyId);
    }
  }
}
