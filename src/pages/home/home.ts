import { Component, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import Chart from 'chart.js';

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

  ionViewDidLoad() {
  
  }

}
