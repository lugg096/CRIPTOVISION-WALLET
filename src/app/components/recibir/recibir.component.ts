import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { IonicComponentsService } from 'src/app/services/ionic-components.service';

@Component({
  selector: 'app-recibir',
  templateUrl: './recibir.component.html',
  styleUrls: ['./recibir.component.scss'],
})
export class RecibirComponent implements OnInit {

  constructor(
    private _modal: ModalController, 
    public _storage: StorageService,
    private socialSharing: SocialSharing,
    private clipboard: Clipboard,
    public _comp: IonicComponentsService) {
  }


  public publickey = 'prueba';
  public data:any;

  ngOnInit() {
    this.getData();

  }

  async getData() {
    this.data = await this._storage.getLocalStorage('DATA');
    this.publickey =this.data.publicKey;
    
  }

  closeModal() {
    this._modal.dismiss({ dataPersonal: null });
  }

  continuar() {
    this._modal.dismiss({
      dataPersonal: {}
    });
  }



  copyText(){
    this.clipboard.copy(this.publickey);
    this._comp.presentToast('Copiado', 'primary', 100);
  }

  async compartirDireccion(){

    this.socialSharing.share(
      '' ,
      '',
      '',
      this.publickey
    );
  }

}
