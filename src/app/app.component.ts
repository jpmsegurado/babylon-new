import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})



export class MyApp {
  rootPage:any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public userProvider: UserProvider,
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      userProvider.isLogged().then((isLogged) => {
        this.rootPage = isLogged ? HomePage : LoginPage;
        splashScreen.hide();
      })
    });
  }
}

