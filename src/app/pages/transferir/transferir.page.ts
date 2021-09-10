import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertController, IonSlides, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonicComponentsService } from 'src/app/services/ionic-components.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data-service.service';
import { sha256, sha224 } from 'js-sha256';
import * as sha1 from 'js-sha1';
import { OnboardingService } from 'src/app/services/onboarding.service';


@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.page.html',
  styleUrls: ['./transferir.page.scss'],
})
export class TransferirPage implements OnInit {

  public transferForm: FormGroup;
  public submitAttempt: boolean = false;
  public data: any = { publicKey: '' };
  public moneda: any = {
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
  divisor: number = 0;

  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('slidesPadre', { static: false }) private slidesPadre: IonSlides;

  public digitos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  pin: string = "";

  slideOpts = {
    allowSlideNext: false,
    allowSlidePrev: false,
    slidesPerView: 1,
    initialSlide: 0,
    speed: 400
  };
  constructor(
    public formBuilder: FormBuilder,
    public _comp: IonicComponentsService,
    private barcodeScanner: BarcodeScanner,
    public _storage: StorageService,
    public router: Router,
    public alertController: AlertController,
    private _data: DataService,
    public _onboarding: OnboardingService,
    public loadingController: LoadingController) {
    this.transferForm = formBuilder.group({
      publicKey: ['', Validators.required],
      monto: [0, Validators.required]
    });
  }

  ngOnInit() {
    this._data.currentMessage.subscribe((moneda: any) => {
      this.moneda = moneda;
      if (this.moneda.nameAbrev == 'VSION') {
        this.divisor = 100000000;
      }
      if (this.moneda.nameAbrev == 'BNB') {
        this.divisor = 1000000000000000000;
      }
    })
    this.getData();
  }

/* publicKey=''; */
p1='';
p2='';
center='';
  async getData() {
    this.data  = await this._storage.getLocalStorage('DATA');
    this.p1=this.data.publicKey.substring(0,6);
    this.p2 =this.data.publicKey.substring(this.data.publicKey.length-4,this.data.publicKey.length);
    this.center = this.data.publicKey.substring(6,this.data.publicKey.length-4);
  }

  async scan() {
    this.barcodeScanner.scan({ prompt: "Lee la llave publica" }).then(async publicKey => {
      if (publicKey) {
        if (publicKey.text.indexOf(":")!=-1){
          let data = publicKey.text.split(":");
          this.transferForm.controls['publicKey'].setValue(data[1]);
        } else  this.transferForm.controls['publicKey'].setValue(publicKey.text);
      }

    }).catch(err => {
      this._comp.presentToast('Error en lector QR', 'danger', 3000);
      console.log('Error', err);
    })
  }


  p1Des='';
  p2Des='';
  centerDes='';

  async continuar() {
    this.submitAttempt = true;

    this.p1Des=this.transferForm.value.publicKey.substring(0,6);
    this.p2Des =this.transferForm.value.publicKey.substring(this.transferForm.value.publicKey.length-4,this.transferForm.value.publicKey.length);
    this.centerDes = this.transferForm.value.publicKey.substring(6,this.transferForm.value.publicKey.length-4);
    if (this.transferForm.valid) {
      if (this.moneda.monto < this.transferForm.value.monto) {
        this._comp.presentToast('Cantidad excedida', 'danger', 3000);
        return;
      }  
      if(this.transferForm.value.monto<=0){
        this._comp.presentToast('Cantidad incorrecta', 'danger', 3000);
        return;
      }
      this.nextSlidePadre();
    }
  }

  goInicio() {
    this.router.navigate(['/inicio']);
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


  /* PIN */
  public dataSlideValid = {
    titulo: "",
    subTitulo: "Ingresar ePIN",
    texto: "Ingrese ePIN de 6 dígitos de Vsion Wallet"
  }

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

      let dataTransfer = {
        addressTo: this.transferForm.value.publicKey,
        amount: this.transferForm.value.monto * this.divisor,
        addressFrom: this.data.publicKey,
        privateKey: privateKey
      }


      const loading = await this.loadingController.create({
        message: 'Por favor espere...',
        backdropDismiss: false,
        showBackdrop: true,
        spinner: "bubbles"
      });
      await loading.present();




      if (this.moneda.nameAbrev == 'VSION') {
        this._onboarding.trasfer(dataTransfer).subscribe((res: any) => {
          loading.dismiss();
          this.nextSlidePadre();
        }, err => {
          loading.dismiss();
          if (err.error == 'Returned error: insufficient funds for gas * price + value') {
            this.comprar();
          } else {
            this.goInicio();
            this._comp.presentToast(err.error.reason , 'danger', 2000);
          }
        });
      }
      if (this.moneda.nameAbrev == 'BNB') {
        this._onboarding.trasferBNB(dataTransfer).subscribe((res: any) => {
          loading.dismiss();
          this.nextSlidePadre();
        }, err => {
          loading.dismiss();
          if (err.error == 'Returned error: insufficient funds for gas * price + value') {
            this.comprar();
          } else {
            this.goInicio();
            this._comp.presentToast(err.error.reason, 'danger', 2000);
          }
        });
      }

    } else this._comp.presentToast('El PIN no es correcto', 'danger', 2000);

  }



  async comprar() {

    const alert = await this.alertController.create({
      cssClass: 'alert-validar',
      message: ' <div class="container"><img class="imgIcon"   src="../assets/images/Binance-icon.png">' +
        ' </div> <p class="text-wrap mt-2"><b style="font-size: 11px; color: rgba(0, 0, 0, 0.768);">Debe cargar ' + 'BNB' + ' a su cuenta</b> <br>' +
        ' <small style="color: darkgrey;">Si desea hacerlo por transferencia interbancaria puede enviar un correo a:</small> <br>  <br>' +
        '<small class="colorPregunta">recargas@0xaddress.com</small> <br> <small style="color: darkgrey;">Correo corporativo</small></p>',
      buttons: [
        {
          text: 'Ok',
          handler: async () => {
            this.goInicio();
          }
        }
      ]
    });

    await alert.present();
  }
}