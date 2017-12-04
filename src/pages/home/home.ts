import { Component, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReportPage } from '../report/report';
import { IncomesPage } from '../incomes/incomes';
import { OutgoingsPage } from '../outgoings/outgoings';

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
    this.navCtrl.push(IncomesPage);
  }
  openAddOutgoing() {
    this.navCtrl.push(OutgoingsPage);      
  }
  openAnalysis(incomes = 0, outgoings = 100, rest = 0) {
    const investiments = 0;
    const keepings = 0;
    const fun = 0;
    this.navCtrl.push(ReportPage, { incomes, outgoings, investiments, keepings, rest, fun });
  }
  openConfig() {
      
  }

}
