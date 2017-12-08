import { Component, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReportPage } from '../report/report';
import { IncomesPage } from '../incomes/incomes';
import { OutgoingsPage } from '../outgoings/outgoings';
import moment from 'moment';
import { IncomeProvider } from '../../providers/income/income';
import sumBy from 'lodash/fp/sumBy';
import { UserProvider } from '../../providers/user/user';
import VMasker from 'vanilla-masker';
import config from '../../providers/config';
import { OutgoingProvider } from '../../providers/outgoing/outgoing';
import { ConfigPage } from '../config/config';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public now: moment.Moment = moment();
  public loading: Boolean = true;
  public incomes: any;
  public outgoings: any;
  public mes: String = config.meses[moment().get('month')];
  public keepings: any;
  public investiments: any;

  constructor(
    public navCtrl: NavController,
    public el: ElementRef,
    public incomeProvider: IncomeProvider,
    public outgoingProvider: OutgoingProvider,
    public userProvider: UserProvider,
    public storage: Storage,
  ) {

  }

  ionViewWillEnter() {
    this.userProvider.getCurrentUser().subscribe(({ email }) => {
      this.load(email);
    })

    this.storage.get('percentagens').then((i) => {
      const info = i != null ? JSON.parse(i) : { investiments: 5, keepings: 10 };
      this.keepings = info.keepings;
      this.investiments = info.investiments;
    });
  }

  openAddIncome() {
    this.navCtrl.push(IncomesPage);
  }
  openAddOutgoing() {
    this.navCtrl.push(OutgoingsPage);      
  }

  getInvestiments(incomes: any): any{
    let prod = (this.investiments / 100) * incomes;
    let integer = Math.floor(prod);
    return integer;
  }

  getKeepings(incomes: any): any{
    let prod = (this.keepings / 100) * incomes;
    let integer = Math.floor(prod);
    return integer;
  }

  openAnalysis(inc, out) {
    const incomes = parseFloat(inc.replace(/\./g,''));
    const outgoings = parseFloat(out.replace(/\./g,''));
    let rest = incomes - outgoings;
    rest = rest > 0 ? rest : 0;
    const investiments = this.getInvestiments(incomes);
    const keepings = this.getKeepings(incomes);
    let fun = rest - (incomes + keepings);
    fun = fun > 0 ? fun : 0;
    this.navCtrl.push(ReportPage, { incomes, outgoings, investiments, keepings, rest, fun });
  }

  openConfig() {
    this.navCtrl.push(ConfigPage);
  }

  load(email) {
    const start = this.now.startOf('month').toDate().getTime();
    const end = this.now.endOf('month').toDate().getTime();
    this.loading = true;
    this.incomeProvider.getFiltered(start, end, email).then((incomes: any) => {
      this.incomes = sumBy((income) => {
        return income.valor;
      })(incomes);
      this.incomes = VMasker.toMoney(this.incomes.toFixed(2))
      this.loading = false;
    }, () => this.loading = false);

    this.outgoingProvider.getFiltered(start, end, email).then((outgoings: any) => {
      this.outgoings = sumBy((income) => {
        return income.valor;
      })(outgoings);
      this.outgoings = VMasker.toMoney(this.outgoings.toFixed(2))
      this.loading = false;
    }, () => this.loading = false);
  }

}
