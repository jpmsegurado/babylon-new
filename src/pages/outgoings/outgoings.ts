import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddOutgoingPage } from '../add-outgoing/add-outgoing';
import config from '../../providers/config';
import moment from 'moment';
import { UserProvider } from '../../providers/user/user';
import { BlankStateComponent } from '../../components/blank-state/blank-state';
import VMasker from 'vanilla-masker';
import { OutgoingProvider } from '../../providers/outgoing/outgoing';

/**
 * Generated class for the AddIncomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-outgoings',
  templateUrl: 'outgoings.html',
  entryComponents: [BlankStateComponent]
})
export class OutgoingsPage {

  public mesEscolhido: String = config.meses[moment().get('month')];
  public mes: moment.Moment = moment();
  public now: moment.Moment = moment();
  public email: String;
  public loading: Boolean = true;
  public outgoings: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public outgoingProvider: OutgoingProvider,
  ) {
  }

  ionViewDidLoad() {
    this.userProvider.getCurrentUser().subscribe(({ email }) => {
      this.email = email;
      this.load(this.email);
    });
  }

  load(email) {
    const start = this.mes.startOf('month').toDate().getTime();
    const end = this.mes.endOf('month').toDate().getTime();
    this.loading = true;
    this.outgoingProvider.getFiltered(start, end, email).then((incomes: any) => {
      this.outgoings = incomes.map((income) => {
        income.formattedDate = moment(income.data).format('DD/MM/YYYY');
        income.prettyValue = VMasker.toMoney(income.valor.toFixed(2));
        return income;
      });
      this.loading = false;
    }, () => this.loading = false);
  }

  add() {
    this.navCtrl.push(AddOutgoingPage, { reload: () => this.load(this.email) });
  }

  edit(income) {
    this.navCtrl.push(AddOutgoingPage, { income, reload: () => this.load(this.email) });
  }

  previous() {
    this.mes.add(-1, 'month');
    const actualYear = this.now.get('year');
    const year = this.mes.get('year');
    const mes = this.mes.get('month');
    this.load(this.email);
    return this.mesEscolhido = actualYear === year ? `${config.meses[mes]}` : `${config.meses[mes].substring(0, 3)}/${year}`;
  }

  next() {
    this.mes.add(1, 'month');
    const actualYear = this.now.get('year');
    const year = this.mes.get('year');
    const mes = this.mes.get('month');
    this.load(this.email);
    return this.mesEscolhido = actualYear === year ? `${config.meses[mes]}` : `${config.meses[mes].substring(0, 3)}/${year}`;
  }

}
