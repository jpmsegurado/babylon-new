import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ChartComponent } from '../../components/chart/chart';
import accounting from 'accounting';
/*
  Generated class for the AnalisePage page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
  entryComponents: [ ChartComponent ]
})
export class ReportPage {
  private incomes: any;
  private accounting: any;
  private outgoings: any;
  private investiments: any;
  private keepings: any;
  private rest: any;
  private fun: any;
  public values: any = {};
  constructor(
    private params: NavParams
  ) {
    this.incomes= params.get('incomes');
    this.outgoings = params.get('outgoings');
    this.investiments = params.get('investiments');
    this.keepings = params.get('keepings');
    this.rest = params.get('rest');
    this.fun = params.get('fun');

    this.values.formattedOutgoings = this.outgoings;
    this.values.formattedInvestiments = this.investiments;
    this.values.formattedKeepings = this.keepings;
    this.values.formattedFun = this.fun;

    this.accounting = accounting;

  }

}