import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  constructor(
    private _http: HttpClient,
    private navCtrl: NavController
  ) { }

  dominio: any = env.url;
  abi: any = env.abi;


  getAccount(hashPhoto) {
    const parametro = { operacion: 'getAccount', hash:  hashPhoto };
    return this._http.get(this.dominio, { params: parametro });
  }


  trasfer(data) {
    console.log('data',data);
    let url = 'http://18.230.79.100:8080/?operacion=sendTransactionToken&abi=' + this.abi + '&address=0xba4Ce0070deEf6703e1b47bFDe36f41Ade70df2D&node=https://bsc-dataseed1.binance.org/&addressTo=' + data.addressTo + '&amount=' + data.amount + '&addressFrom=' + data.addressFrom + '&privateKey=' + data.privateKey;
    console.log('MOSTRAR URL', url);
    return this._http.get(url);
  }

  trasferBNB(data) {
    console.log('data',data);
    let url = 'http://18.230.79.100:8080/?operacion=sendTransaction&message=wallet20&publicKeyTo='+data.addressTo +'&privateKey='+data.privateKey+'&node=https://bsc-dataseed1.binance.org/&value=' + data.amount;
    console.log('MOSTRAR URL', url);
    return this._http.get(url);
  }


  getCoinVision(publicKey) {
    console.log('publicKey',publicKey);
    let url = 'http://18.230.79.100:8080/?operacion=balance&abi=' + this.abi +  '&address=0xba4Ce0070deEf6703e1b47bFDe36f41Ade70df2D&node=https://bsc-dataseed1.binance.org/&addressTo='+publicKey
    console.log('MOSTRAR URL', url);
    return this._http.get(url);
  }


  getCoinBNB(publicKey){
    console.log('publicKey',publicKey);
    let url = 'http://18.230.79.100:8080/?operacion=getBalance&addressTo='+publicKey+'&node=https://bsc-dataseed1.binance.org/';
    console.log('MOSTRAR URL', url);
    return this._http.get(url);
  }

  getTransactionBNB(tx){
    console.log('tx',tx);
    let url = 'http://18.230.79.100:8080/?operacion=getTransaction&tx='+tx+'&node=https://bsc-dataseed1.binance.org';
    console.log('MOSTRAR URL', url);
    return this._http.get(url);
  }

  getAllTransactionVision(publicKey){
    console.log('publicKey',publicKey);
    let url = 'https://api.bscscan.com/api?module=account&action=tokentx&address='+publicKey+'&startblock=0&endblock=99999999&sort=asc&apikey=AFJRB721726A3EWUM6CIMVXQVG987EVD1G';
    console.log('MOSTRAR URL', url);
    return this._http.get(url);
  }

  getAllTransactionBnb(publicKey){
    console.log('publicKey',publicKey);
    let url = 'https://api.bscscan.com/api?module=account&action=txlist&address='+publicKey+'&startblock=0&endblock=99999999&sort=asc&apikey=AFJRB721726A3EWUM6CIMVXQVG987EVD1G';
    console.log('MOSTRAR URL', url);
    return this._http.get(url);
  }
  


  
 



















  /* ******************************* */

  setCredential(data) {
    const parametro = data;
    console.log('Parametro', parametro);
    return this._http.get(this.dominio, { params: parametro });
  }

  sendTransaction(data) {
    const parametro = data;
    console.log('Parametro', parametro);
    return this._http.get(this.dominio, { params: parametro });
  }

  sendValidationEmail(data) {
    console.log('MOSTRAR data', data);
    const URL = 'http://appcuerdo.com/send.php?mode=mail&to=' + data.email + '&did=' + data.did + '&dni=' + data.dni;
    return this._http.get(URL);
  }


  get1(data: any) {
    const URL = 'https://api.appcuerdo.com/v1/document/create/?modo=P&channel=' + data.aCode + '&hashBase64=' + data.aFileHashBase64 + '&hash=' + data.hash + "&sello=" + data.sello;
    return this._http.get(URL);
  }

  postFirebase(data: any) {
    const URL = 'https://appcuerdo.com/send.php/?mode=emailAdm&to=' + data.emailAdm + '&channel=' + data.aCode + "&html=" + btoa(data.pURL) + "&name=" + data.aName + "&size=" + data.aSize + "&type=" + data.aType + "&title=" + data.aFileTitle + "&hash=" + data.aFileHash + "&typeSign=" + data.aTypeSign;
    return this._http.get(URL);
  }


  getQR(url) {
    return this._http.get(url);
  }
}