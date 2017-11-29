import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import config from '../providers/config';
import { OutgoingProvider } from '../providers/outgoing/outgoing';
import { IncomeProvider } from '../providers/income/income';
import { UserProvider } from '../providers/user/user';
import { OutgoingsPage } from '../pages/outgoings/outgoings';
import { AddOutgoingPage } from '../pages/add-outgoing/add-outgoing';
import { IncomesPage } from '../pages/incomes/incomes';
import { AddIncomePage } from '../pages/add-income/add-income';
import { LoginPage } from '../pages/login/login';

import { ChartComponent } from '../components/chart/chart';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OutgoingsPage,
    AddOutgoingPage,
    IncomesPage,
    AddIncomePage,
    LoginPage,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config.firebase),
    AngularFirestoreModule.enablePersistence(),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OutgoingsPage,
    AddOutgoingPage,
    IncomesPage,
    AddIncomePage,
    LoginPage,
    ChartComponent,
  ],
  providers: [
    AngularFireAuth,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OutgoingProvider,
    IncomeProvider,
    UserProvider
  ]
})
export class AppModule {}
