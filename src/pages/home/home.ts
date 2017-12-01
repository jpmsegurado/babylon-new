import { Component, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import Chart from 'chart.js';
import { AddIncomePage } from '../add-income/add-income';
import { AddOutgoingPage } from '../add-outgoing/add-outgoing';
import { ReportPage } from '../report/report';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public el: ElementRef,
  ) {

  }

  openAddIncome() {
      this.navCtrl.push(AddIncomePage);
  }
  openAddOutgoing() {
      this.navCtrl.push(AddOutgoingPage);      
  }
  openAnalysis(incomes, outgoings, rest) {
      this.navCtrl.push(ReportPage, { incomes, outgoings, rest });
  }
  openConfig() {
      
  }

}
