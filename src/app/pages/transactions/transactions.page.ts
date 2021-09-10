import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IonicComponentsService } from 'src/app/services/ionic-components.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  constructor(
    public router: Router,
    public _comp: IonicComponentsService,
    public _onboarding: OnboardingService,
    public loadingController: LoadingController,
    public _storage: StorageService,
    private activatedRoute: ActivatedRoute) { }

  moneda: any ='';
  data: any={
    publicKey:''
  };

  transactionList: any = [];
  divisor: number;

  imagen :boolean;

  ngOnInit() {

  }

  async ionViewDidEnter() {

    const monedaName = this.activatedRoute.snapshot.paramMap.get('moneda');
    const decodedMoneda = decodeURIComponent(monedaName);
    this.moneda = decodedMoneda; 
    this.getDataStorage();
  }

  async getDataStorage() {
    let data = await this._storage.getLocalStorage('DATA');
    data.publicKey = data.publicKey.toLowerCase();
    this.data = data;
    this.getTransaction();
  }


  getTransaction(event?) {

    if (this.moneda == 'VSION') {
      this.divisor = 100000000;
      this.getTransactionsVision(this.data.publicKey, event);
    }
    if (this.moneda == 'BNB') {
      this.divisor = 1000000000000000000;
      this.getAllTransactionBnb(this.data.publicKey, event);
    }
  }


 async getTransactionsVision(publicKey, event?) {
    const loading = await this.loadingController.create({
      message: 'Por favor espere...',
      backdropDismiss: false,
      showBackdrop: true,
      spinner: "bubbles"
    });
    await loading.present();

    this._onboarding.getAllTransactionVision(publicKey).subscribe((res: any) => {

      this.transactionList = [];
      if(res.result.length==0)this.imagen=true;
      res.result.forEach((dato: any) => {
        this.imagen=false;
        dato.to = dato.to.toLowerCase();
        let p1=dato.from.substring(0,6);
        let p2 =dato.from.substring(dato.from.length-4,dato.from.length);
        dato.fromAbrev=p1+'...'+p2;

        let p3=dato.hash.substring(0,6);
        let p4 =dato.hash.substring(dato.hash.length-4,dato.hash.length);
        dato.hashAbrev=p3+'...'+p4;

        this.transactionList.unshift(dato);
      });
      loading.dismiss();
      if (event) event.target.complete();
    }, err => {
      if (event) event.target.complete();
        this._comp.presentToast('Error con servidor', 'danger', 2000);
    })
  }

 async getAllTransactionBnb(publicKey, event?) {
    const loading = await this.loadingController.create({
      message: 'Por favor espere...',
      backdropDismiss: false,
      showBackdrop: true,
      spinner: "bubbles"
    });
    await loading.present();
    this._onboarding.getAllTransactionBnb(publicKey).subscribe((res: any) => {
      
      this.transactionList = [];
      if(res.result.length==0)this.imagen=true;
      res.result.forEach((dato: any) => {
        this.imagen=false;
        dato.to = dato.to.toLowerCase()
        dato.value = Math.ceil(dato.value/1000000)*1000000;
        
        let p1=dato.from.substring(0,6);
        let p2 =dato.from.substring(dato.from.length-4,dato.from.length);
        dato.fromAbrev=p1+'...'+p2;

        let p3=dato.hash.substring(0,6);
        let p4 =dato.hash.substring(dato.hash.length-4,dato.hash.length);
        dato.hashAbrev=p3+'...'+p4;

        this.transactionList.unshift(dato);
      });
      loading.dismiss();
      if (event) event.target.complete();
    }, err => {
      if (event) event.target.complete();
      alert('error con servidor '+err);
    })
  }


  goInicio() {
    this.router.navigate(['/inicio']);
  }

}
