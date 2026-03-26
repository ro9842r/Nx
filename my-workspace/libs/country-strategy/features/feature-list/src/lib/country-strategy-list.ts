import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type CountryStrategySummary = {
  id: string;
  title: string;
  owner: string;
};

const COUNTRY_STRATEGIES: CountryStrategySummary[] = [
  { id: '64', title: 'Brazil Growth', owner: 'Ops Team' },
  { id: '65', title: 'Chile Expansion', owner: 'Sales Team' },
];

@Component({
  selector: 'lib-country-strategy-list',
  imports: [RouterLink],
  templateUrl: './country-strategy-list.html',
  styleUrl: './country-strategy-list.scss',
})
export class CountryStrategyList {
  readonly strategies = COUNTRY_STRATEGIES;
}
