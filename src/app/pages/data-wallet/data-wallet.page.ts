import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSlides, ModalController } from '@ionic/angular';
import { GenerarCodeQRComponent } from 'src/app/components/generar-code-qr/generar-code-qr.component';
import { StorageService } from 'src/app/services/storage.service';
import { sha256, sha224 } from 'js-sha256';
import { IonicComponentsService } from 'src/app/services/ionic-components.service';
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
const { Camera, Filesystem } = Plugins;

@Component({
  selector: 'app-data-wallet',
  templateUrl: './data-wallet.page.html',
  styleUrls: ['./data-wallet.page.scss'],
})
export class DataWalletPage implements OnInit {


  @ViewChild('slidesPadre', { static: false }) private slidesPadre: IonSlides;
  data: any = {
    ADDRESS: '',
    DID: '',
    NAME: '',
    PHOTO: '',
    PHOTO_MIN: '',
    privateKey: '',
    publicKey: ''
  }
  loadingController: any;
  imagen = '';
  fotoSeguridad = false;

  constructor(
    public _storage: StorageService,
    private _modal: ModalController,
    public router: Router,
    public _comp: IonicComponentsService,
    public alertController: AlertController,) { }

  slideOpts = {
    allowSlideNext: false,
    allowSlidePrev: false,
    slidesPerView: 1,
    initialSlide: 0,
    speed: 400
  };

  ngOnInit() {}

  async ionViewDidEnter(){
    this.getDataStorage();
  } 

  
  async cambiarNombre(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nombre de cuenta',
      inputs: [
        {
          name: 'nombre',
          id: 'nombre',
          type: 'textarea',
          placeholder: 'Ingrese nombre de cuenta para actualizar',
          value:this.data.NAME
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: async(res) => {

            let index = this.wallets.findIndex(d => d.publicKey == this.data.publicKey);
            if (index == -1) this._comp.presentToast('Error al editar wallet', 'danger', 2000);
            else {
            this.wallets[index].NAME=res.nombre;
              await this._storage.setLocalStorage('DATA', this.wallets[index]);
              await this._storage.setLocalStorage('WALLETS', this.wallets);
              this.getDataStorage();
              this._comp.presentToast('Se actualizo nombre con éxito', 'success', 2500);
            }

          }
        }
      ]
    });

    await alert.present();
  }

  wallets=[];
  photoSegure =false;

  async getDataStorage() {
    this.data = await this._storage.getLocalStorage('DATA');
    this.wallets = await this._storage.getLocalStorage('WALLETS');
    if(this.data.PHOTO!=''){
      if(this.data.PHOTO.substring(0,4)=='data')this.imagen = this.data.PHOTO;
    }
  }
  goConfig() {
    this.router.navigate(['/options']);
  }

  verPk() {

    this.nextSlidePadre();
  }

  fotoSeg() {
    this.fotoSeguridad = true;
    this.nextSlidePadre();
  }


  async downloadPhoto() {
    try {
      let path = `seguridad/token20_${Date.now()}.jpeg`;
      const result = await Filesystem.writeFile({
        path,
        data: this.imagen,
        directory: FilesystemDirectory.Documents,
        recursive: true
      }).then(res => {
        this._comp.presentToast('Descarga completa', 'primary', 1000);
        this._storage.datos.PHOTO = this.imagen;
      });

    } catch (e) {
      console.error('Unable to write file ', e);
    }

  }

  cancelFotoSeg(){
    this.backSlidePadre();
    this.backSlidePadre();
    this.fotoSeguridad = false;
  }

  generarQR(data) {
    this._modal.create({
      component: GenerarCodeQRComponent,
      componentProps: {
        codeQR: data.value,
        texto: data.text,
      }
    }).then((modal) => modal.present());
  }


  nextSlidePadre() {
    this.slidesPadre.lockSwipeToNext(false);
    this.slidesPadre.slideNext();
    this.slidesPadre.lockSwipeToNext(true);
  }

  backSlidePadre() {
    this.fotoSeguridad = false;
    this.slidesPadre.lockSwipeToPrev(false);
    this.slidesPadre.slidePrev();
    this.slidesPadre.lockSwipeToPrev(true);
  }


  /* PIN */
  public dataSlideValid = {
    titulo: "",
    subTitulo: "Ingresar ePIN",
    texto: "Ingrese ePIN de 6 dígitos de Vsion Wallet"
  }
  pin = '';

  async getClave($event) {
    this.pin = $event;
    let hash_PINsha256 = sha256(sha256(this.pin.toString()));
    if (hash_PINsha256 == this.data.PIN) {

      let position = Number(this.pin.substr(0, 2));
      if (position > 62) position = position - 62;
      if (position == 0) position = 2;
      let n1 = Number(this.pin.substr(2, 2));
      let n2 = Number(this.pin.substr(4, 2))

      let dataSegure = this.data.privateKey.substr(62, this.data.privateKey.length);
      let number01 = Number(dataSegure.split("G")[0]) - n1;
      let number02 = Number(dataSegure.split("G")[1]) - n2;

      let privateKey = this.data.privateKey.substr(0, position)
        + number01.toString(16) + number02.toString(16) + this.data.privateKey.substring(position, 62);

      if (!this.fotoSeguridad){
        this.generarQR({ value: privateKey, text: 'Llave privada' });
        this.backSlidePadre();
      }else this.nextSlidePadre();
        
    } else this._comp.presentToast('Clave no es la misma', 'danger', 1000);
  }

}
