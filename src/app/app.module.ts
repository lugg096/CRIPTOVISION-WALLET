import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { RecibirComponent } from './components/recibir/recibir.component';
import { QRCodeModule } from 'angularx-qrcode';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { DataService } from './services/data-service.service';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { GenerarCodeQRComponent } from './components/generar-code-qr/generar-code-qr.component';;
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';


@NgModule({
  declarations: [AppComponent, RecibirComponent,TransactionsComponent,GenerarCodeQRComponent],
  entryComponents: [RecibirComponent,TransactionsComponent,GenerarCodeQRComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    QRCodeModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    SocialSharing,
    Clipboard,
    DataService,
    FileOpener,
    ImagePicker
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
