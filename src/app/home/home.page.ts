import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { sha256, sha224 } from 'js-sha256';
import * as sha1 from 'js-sha1';
import { Router } from '@angular/router';
import { IonicComponentsService } from '../services/ionic-components.service';
import { OnboardingService } from '../services/onboarding.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';

import { Plugins, CameraResultType, CameraSource, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
const { Camera, Filesystem } = Plugins;

import { environment as env } from 'src/environments/environment';
import { GenerarCodeQRComponent } from '../components/generar-code-qr/generar-code-qr.component';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  @ViewChild('slidesPadre', { static: false }) private slidesPadre: IonSlides;

  constructor(

    public _storage: StorageService,
    public router: Router,
    public _comp: IonicComponentsService,
    public loadingController: LoadingController,
    public _onboarding: OnboardingService,
    private clipboard: Clipboard,
    private _modal: ModalController,
    private imagePicker: ImagePicker,) { }

  claveValida = false;
  dic: any[] = env.diccionario;
  pin: string = "";
  alias = "Nueva wallet";
  wallets = [];
  imagen = '';

  fraseSeguridad = false;
  fotoSeguridad = false;
  palabrasPrincipal = []; //Palbras Slide 1 
  textValue = '';
  palabras = [];
  palabrasVerif = [];


  slideOptsOnboarding = {
    allowSlideNext: false,
    allowSlidePrev: false,
    slidesPerView: 1,
    initialSlide: 0,
    speed: 400
  };



  ngOnInit() { }

  initFraseSegura() {
    this.palabrasPrincipal = [];
    this.palabras = [];
    this.textValue = '';
    for (let a = 0; a < 12; a++) {
      let wordIndex = Math.floor(Math.random() * 2400);
      this.palabrasPrincipal.push(this.dic[wordIndex]);
      this.palabras.push(this.dic[wordIndex]);

      let separador = ' ';
      if (a == 0) separador = '';
      this.textValue = this.textValue + separador + this.dic[wordIndex];

    }
  }

  async getWallets() {
    this.wallets = await this._storage.getLocalStorage('WALLETS') || [];
  }

  selectPalabra(index) {
    this.palabrasVerif.push(this.palabras[index]);
    this.palabras.splice(index, 1);
    this.claveValida = this.errorClave();
  }

  quitarPalabra(index) {
    this.palabras.push(this.palabrasVerif[index]);
    this.palabrasVerif.splice(index, 1);
    this.claveValida = this.errorClave();
  }

  goWallets() {
    this.router.navigate(['/wallets']);
  }

  async terminarWallet() {
    this._storage.datos.NAME = this.alias;
    try {
      let wallets: any[] = await this._storage.getLocalStorage('WALLETS') || [];
      wallets.push(this._storage.datos);
      await this._storage.setLocalStorage('WALLETS', wallets);
      await this._storage.setLocalStorage('DATA', this._storage.datos);
    } catch (e) {
      alert('Ocurrió un problema de compatibilidad con navegador: ' + e);
    }

    this.router.navigate(['/inicio']);
  }

  copyText() {
    this.clipboard.copy(this.textValue);
    this._comp.presentToast('Frase copiada', 'primary', 500);
  }

  verificarFrase() {
    let hashData = sha256(this.textValue);
    this.getAccount('0x' + hashData);
  }

  errorClave() {
    let claveValida = true;
    for (let a = 0; a < this.palabrasVerif.length; a++) {
      if (this.palabrasPrincipal[a] != this.palabrasVerif[a]) claveValida = false;
    }
    if (this.palabrasVerif.length == 0) return false;
    return claveValida;
  }


  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }


  generarQR() {
    this._modal.create({
      component: GenerarCodeQRComponent,
      componentProps: {
        codeQR: this.textValue,
        texto: 'Frase de seguridad'
      }
    }).then((modal) => modal.present());
  }

  palabrasClave() {
    this.palabras = this.shuffleArray(this.palabras);
    this.nextSlidePadre()
  }


  async ionViewDidEnter() {
    this.initFraseSegura();
    this.getWallets();
    this.pin = '';
    this.alias = "Nueva wallet";
    this.backSlidePadre();
    this.backSlidePadre();
    this.backSlidePadre();
    this.backSlidePadre();
    this.backSlidePadre();
    this.backSlidePadre();
  }


  async getAccount(hashData) {

    const loading = await this.loadingController.create({
      message: 'Por favor espere...',
      backdropDismiss: false,
      showBackdrop: true,
      spinner: "bubbles"
    });
    await loading.present();

    this._onboarding.getAccount(hashData).subscribe((res: any) => {
      if (!res) {
        loading.dismiss();
        this._comp.presentToast('Error en servidor', 'danger', 2000);
        return;
      }

      loading.dismiss();
      this.nextSlidePadre();
      this._storage.datos.ADDRESS = res.address;
      this._storage.datos.DID = sha1(sha256(res.address));
      this._storage.datos.privateKey = res.privateKey;
      this._storage.datos.publicKey = res.publicKey;
    }, err => {
      loading.dismiss();
      this._comp.presentToast('Error parametros enviados', 'danger', 2000);
      
    })

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
      this.nextSlidePadre();
      });

    } catch (e) {
      alert('Unable to write file '+ e)
    }

  }


  async procesarImagen() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      correctOrientation: true
    }).then((imageData) => {
      if (imageData) {
        this.imagen = `data:image/jpeg;base64,${imageData.base64String}`;
        this.nextSlidePadre();
      }
    }, (err) => {
      console.log('Ocurrió un problema, vuelva a intentarlo porfavor: ' + err);
    });
  }

  nextSlidePadre() {
    this.slidesPadre.lockSwipeToNext(false);
    this.slidesPadre.slideNext();
    this.slidesPadre.lockSwipeToNext(true);
  }

  backSlidePadre() {
    this.slidesPadre.lockSwipeToPrev(false);
    this.slidesPadre.slidePrev();
    this.slidesPadre.lockSwipeToPrev(true);
  }

  /* Codigo pin */
  public dataSlideCreate = {
    titulo: "PASO 2",
    subTitulo: "Registrar PIN",
    texto: "Nuevo PIN de 6 dígitos"
  }

  public dataSlideValidacion = {
    titulo: "PASO 3",
    subTitulo: "Confirme su PIN",
    texto: "Ingrese nuevamente PIN de 6 dígitos"
  }

  getClave($event) {
    this.pin = $event;
    this.nextSlidePadre();
  }

  async getClaveValidPhoto($event) {
    if (this.pin == $event) {

      let hashPk = sha256(sha256(this._storage.datos.PHOTO) + sha256(this.pin));
      const loading = await this.loadingController.create({
        message: 'Por favor espere...',
        backdropDismiss: false,
        showBackdrop: true,
        spinner: "bubbles"
      });
      await loading.present();

      this._onboarding.getAccount('0x'+hashPk).subscribe((res: any) => {
        if (!res) {
          loading.dismiss();
          this._comp.presentToast('Error en servidor', 'danger', 2000);
          return;
        }

        loading.dismiss();
        this.nextSlidePadre();
        this._storage.datos.ADDRESS = res.address;
        this._storage.datos.DID = sha1(sha256(res.address));
        this._storage.datos.privateKey = res.privateKey;
        this._storage.datos.publicKey = res.publicKey;
        this.getClaveValid($event);
      }, err => {
        this._comp.presentToast('Error en servidor', 'danger', 2000);
        loading.dismiss();
      })


    }
  }


  async getClaveValid($event) {
    if (this.pin == $event) {

      this._storage.datos.PIN = sha256(sha256(this.pin.toString()));

      let position = Number(this.pin.substr(0, 2));
      if (position > 62) position = position - 62;
      if (position == 0) position = 2;
      let n1 = Number(this.pin.substr(2, 2));
      let n2 = Number(this.pin.substr(4, 2))

      let str = this._storage.datos.privateKey.substr(position, 4);

      let hex1 = str.substr(0, 2);
      let number1 = parseInt(hex1, 16) + n1;

      let hex2 = str.substr(2, 2);
      let number2 = parseInt(hex2, 16) + n2;

      this._storage.datos.privateKey = this._storage.datos.privateKey.substr(0, position) +
        this._storage.datos.privateKey.substr(position + 4, this._storage.datos.privateKey.length) +
        number1 + 'G' + number2;

      this.nextSlidePadre();
    } else this._comp.presentToast('Clave no es la misma', 'danger', 1000);

  }


  goImport() {
    this.router.navigate(['/import-wallet']);
  }


}
