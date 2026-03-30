import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountryStrategyService } from '../../data-access';

@Component({
  selector: 'lib-country-strategy-list',
  imports: [RouterLink],
  templateUrl: './country-strategy-list.html',
  styleUrl: './country-strategy-list.scss',
})
export class CountryStrategyList implements OnInit {
  private readonly service = inject(CountryStrategyService);
  readonly strategies = this.service.store.strategies;

  ngOnInit(): void {
    this.service.load();
  }
}
