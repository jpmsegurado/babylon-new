import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddIncomePage } from '../add-income/add-income';

/**
 * Generated class for the AddIncomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-incomes',
  templateUrl: 'incomes.html',
})
export class IncomesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  add() {
    this.navCtrl.push(AddIncomePage);
  }

}
