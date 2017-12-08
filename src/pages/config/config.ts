import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})

export class ConfigPage {
  private investiments: any;
  private keepings: any;
  constructor(
    private nav: NavController,
    public local: Storage,
  ) {

    this.local.get('percentagens').then((result) => {
      if(JSON.parse(result)){
        this.investiments = JSON.parse(result).investiments;
        this.keepings = JSON.parse(result).keepings;
      }else{
        this.investiments = 5;
        this.keepings = 10;
      }
    });

  }

  saveConfig(keepings, investiments){
    this.local.set('percentagens', JSON.stringify({keepings: keepings, investiments: investiments}));
  }

  addKeepings(){
    this.keepings++;
    this.local.set('percentagens', JSON.stringify({keepings: this.keepings, investiments: this.investiments}));
  }
  subtractKeepings(){
    this.keepings--;
    this.local.set('percentagens', JSON.stringify({keepings: this.keepings, investiments: this.investiments}));
  }
  subtractInvestiments(){
    this.investiments--;
    this.local.set('percentagens', JSON.stringify({keepings: this.keepings, investiments: this.investiments}));
  }
  addInvestiments(){
    this.investiments++;
    this.local.set('percentagens', JSON.stringify({keepings: this.keepings, investiments: this.investiments}));
  }

  logout(){
    this.local.set('logged', false).then(() => {
      this.nav.setRoot(LoginPage, {animate: true});
    });
  }

}
