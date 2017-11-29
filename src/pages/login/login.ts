import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
  });

  public loading: Boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
  ) {
  }

  submit(form: FormGroup) {

    this.loading = true;

    this.userProvider.signInWithEmailAndPassword(form.value.email, form.value.password).then(() => {
      this.loading = false;
      this.navCtrl.setRoot(HomePage);
    }, () => {
      this.loading = false;
    })

  }

}
