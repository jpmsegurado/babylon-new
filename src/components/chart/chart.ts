import { Component, ElementRef, Input } from '@angular/core';
import Chart from 'chart.js';
import { NavParams } from 'ionic-angular/navigation/nav-params';

/**
 * Generated class for the ChartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chart',
  templateUrl: 'chart.html'
})
export class ChartComponent {

  @Input() incomes: any;
  @Input() outgoings: any;
  @Input() investiments: any;
  @Input() keepings: any;
  @Input() rest: any;
  @Input() fun: any;
  private chart: any;

  constructor(
    public element: ElementRef,
    public params: NavParams,
  ) {

  }

  ngOnInit() {
    setTimeout(() => {
      const data = [this.outgoings, this.fun, this.keepings, this.investiments];
      console.log(data);
      let ctx = this.element.nativeElement.querySelector("#chart").getContext('2d');
      let chartData = {
        labels: [],
        datasets: [
          {
            data,
            backgroundColor: [
              "#E82C0C",
              '#FFBC10',
              '#02E87E',
              '#1C83E8',
            ]
          }]
      };

      this.chart = ctx != undefined && this.chart == null ? new Chart(ctx, { type: 'pie', data: chartData, options: {
        tooltips: {
          enabled: false
        },
      } }) : null;

    });
  }
}


