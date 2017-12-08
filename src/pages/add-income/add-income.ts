import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { IncomeProvider } from '../../providers/income/income';
import { Utils } from '../../providers/utils';
import { DatePicker } from '@ionic-native/date-picker';
import moment from 'moment';

/**
 * Generated class for the AddIncomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-income',
  templateUrl: 'add-income.html',
})
export class AddIncomePage {

  public form: FormGroup = new FormGroup({
    valor: new FormControl('', Validators.required),
    todoMes: new FormControl(true, Validators.required),
    data: new FormControl(moment().format('YYYY-MM-DD')),
  });

  public todoMes: Boolean = true;
  public loading: Boolean = false;
  public deleting: Boolean = false;
  public id: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public incomeProvider: IncomeProvider,
    public utils: Utils,
    public datePicker: DatePicker,
  ) {
    const income = navParams.get('income');
    if(income) {
      this.id = income.id;
      this.form.controls.valor.setValue(income.valor.toFixed(2));
      this.form.controls.todoMes.setValue(income.todoMes);
      this.todoMes = income.todoMes;
      this.form.controls.data.setValue(moment(new Date(income.data)).format('YYYY-MM-DD'));
    }
  }

  add(form: FormGroup) {
    this.loading = true;
    const income = {...form.value};
    income.valor = parseFloat(income.valor);
    if(!income.todoMes) {
      income.data = moment(income.data, 'YYYY-MM-DD').toDate().getTime();
    }
    this.userProvider.getCurrentUser().subscribe(({ email }) => {
      this.incomeProvider.add(email, income, this.id).then(() => {
        this.loading = false;
        this.navParams.get('reload')();
        this.navCtrl.pop();
      });
    }, () => {
      this.loading = false;
    });
  }

  delete() {
    this.deleting = true;
    this.userProvider.getCurrentUser().subscribe(({ email }) => {
      this.incomeProvider.delete(email, this.id).then(() => {
        this.deleting = false;
        this.navParams.get('reload')();
        this.navCtrl.pop();
      });
    }, () => {
      this.deleting = false;
    });
  }

  change() {
    let amount = this.form.value.valor;
    amount = this.utils.detectAmount(amount);
    this.form.controls.valor.setValue(amount);
  }

  pickDate(event) {
    event.preventDefault();
    const options = {
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }
    this.datePicker.show(options).then((date) => {
      this.form.controls.data.setValue(moment(date).format('YYYY-MM-DD'));
    });
  }

}
