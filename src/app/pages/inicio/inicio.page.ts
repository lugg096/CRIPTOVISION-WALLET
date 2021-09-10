import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GenerarCodeQRComponent } from 'src/app/components/generar-code-qr/generar-code-qr.component';
import { DataService } from 'src/app/services/data-service.service';
import { IonicComponentsService } from 'src/app/services/ionic-components.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    private _modal: ModalController,
    public router: Router,
    private _data: DataService,
    public _comp: IonicComponentsService,
    public _onboarding: OnboardingService,
    public _storage: StorageService,) { }

  listMonedas = [
    {
      name: 'Criptovision',
      nameAbrev: 'VSION',
      monto: 0,
      tipoCambio: 10,
      porcentaje: '- 0.32%',
      logo: {
        tipo: 'img',
        icon: null,
        color: 'mediumturquoise',
        img: '../../../assets/images/LOGO-ICONO2.png'
      }
    },
    {
      name: 'Binance',
      nameAbrev: 'BNB',
      monto: 0,
      tipoCambio: 120,
      porcentaje: '- 0.59%',
      logo: {
        tipo: 'img',
        icon: null,
        color: 'coral',
        img: '../../../assets/images/Binance-icon.png'
      }
    }
  ];

  data: any;
  nameWallet = '';

  moneda = {
    name: '',
    nameAbrev: '',
    monto: 0,
    tipoCambio: 0,
    porcentaje: '',
    logo: {
      tipo: '',
      icon: null,
      color: '#000',
      img: ''
    }
  }

  ngOnInit() {
    this.moneda = this.listMonedas[0];
    this.insertWallet();

  }


  async insertWallet() {//insertar Wallet en listado por version de app
    let wallets: any[] = await this._storage.getLocalStorage('WALLETS') || [];
    if (wallets.length == 0) {
      let data = await this._storage.getLocalStorage('DATA');
      wallets.push(data);
      await this._storage.setLocalStorage('WALLETS', wallets);
    }
  }


  goOptions() {
    this.router.navigate(['/options']);
  }

  async getCoins(event?) {
    this.data = await this._storage.getLocalStorage('DATA');
    let pk = this.data.publicKey;
    this.nameWallet = this.data.NAME;

    this._onboarding.getCoinVision(pk).subscribe((res: any) => {
      this.listMonedas[0].monto = res.balance / 100000000;
    },err=>{
       this._comp.presentToast('Error con CoinVision', 'danger', 2000);
    });

    this._onboarding.getCoinBNB(pk).subscribe((res: any) => {
      this.listMonedas[1].monto = res / 1000000000000000000;
    },err=>{
      this._comp.presentToast('Error con BNB', 'danger', 2000);
   });

    if (event) event.target.complete();

  }

  async ionViewDidEnter() {
    this.getCoins();
  }

  goWallets(){
    this.router.navigate(['/wallets']);
  }

  verToken(item) {
    this.moneda = item;
  }

  async recibir() {

    this._modal.create({
      component: GenerarCodeQRComponent,
      componentProps: {
        codeQR: this.data.publicKey,
        texto: 'Dirección de la cuenta',
        title:'Recibir'
      }
    }).then((modal) => modal.present());

  }


  async transactions(moneda) {
    const monedaName = encodeURIComponent(moneda.nameAbrev);
    this.router.navigateByUrl(`/transactions/${monedaName}`);
  }

  async transaction(moneda) {
    this._data.changeMessage(moneda);
    this.router.navigate(['/transferir']);
  }

}
