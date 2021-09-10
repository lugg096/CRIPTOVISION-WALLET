import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { IonicComponentsService } from 'src/app/services/ionic-components.service';
import { StorageService } from 'src/app/services/storage.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.page.html',
  styleUrls: ['./wallets.page.scss'],
})
export class WalletsPage implements OnInit {

  constructor(
    public router: Router,
    public _storage: StorageService,
    public alertController: AlertController,
    public _comp: IonicComponentsService,
    private location: Location,
    public loadingController: LoadingController,) { }

  data: any;
  wallets = [];

  ngOnInit() {}

  myBackButton() {
    this.location.back();
  }

  async selectWallet(data) {

    if (this.data.publicKey == data.publicKey) {
      this._comp.presentToast('Wallet en uso', 'danger', 300);
      return;
    }

    let textHeader = 'Usar wallet!';
    let textMessage = 'Quiere usar esta wallet?';

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: textHeader,
      message: textMessage,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: async () => {

            await this._storage.setLocalStorage('DATA', data);
            this.router.navigate(['/inicio']);
          }
        }
      ]
    });

    await alert.present();


  }


  async ionViewDidEnter() {
    this.getData() ;
  }


  async getData() {
    const loading = await this.loadingController.create({
      message: 'Por favor espere...',
      backdropDismiss: false,
      showBackdrop: true,
      spinner: "bubbles"
    });
    await loading.present();
    this.wallets = await this._storage.getLocalStorage('WALLETS');
    this.data = await this._storage.getLocalStorage('DATA');
    loading.dismiss();
  }


  async eliminarWallet(wallet) {

    if (this.data.publicKey == wallet.publicKey) {
      this._comp.presentToast('Wallet en uso', 'danger', 300);
      return;
    }

    let textHeader = 'Eliminar wallet!';
    let textMessage = 'Quiere <strong>eliminar</strong> wallet de dispositivo?';

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: textHeader,
      message: textMessage,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: async () => {
            let u = this.wallets.findIndex(d => d.publicKey == wallet.publicKey);
            if (u == -1) this._comp.presentToast('Error al eliminar wallet', 'danger', 2000);
            else {
              this.wallets.splice(u, 1);
              await this._storage.setLocalStorage('WALLETS', this.wallets);
              this.getData();
              this._comp.presentToast('Wallet se eliminó con éxito', 'success', 2500);

            }
          }
        }
      ]
    });

    await alert.present();
  }


  goConfig() {
    this.router.navigate(['/options']);
  }


  goHome() {
    this.router.navigate(['/home']);
  }

}
