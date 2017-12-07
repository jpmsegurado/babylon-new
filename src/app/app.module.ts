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
import { ReportPage } from '../pages/report/report';
import { Utils } from '../providers/utils';
import { DatePicker } from '@ionic-native/date-picker';
import { BlankStateComponent } from '../components/blank-state/blank-state';
import { ChartComponent } from '../components/chart/chart';
import { ConfigPage } from '../pages/config/config';
import { RegisterPage } from '../pages/register/register';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OutgoingsPage,
    AddOutgoingPage,
    IncomesPage,
    AddIncomePage,
    LoginPage,
    ReportPage,
    BlankStateComponent,
    ChartComponent,
    ConfigPage,
    RegisterPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config.firebase),
    AngularFirestoreModule,
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
    ReportPage,
    ConfigPage,
    RegisterPage,
  ],
  providers: [
    AngularFireAuth,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OutgoingProvider,
    IncomeProvider,
    UserProvider,
    Utils,
    DatePicker,
  ]
})
export class AppModule {}
