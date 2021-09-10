import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  constructor( public router: Router,) { }

  ngOnInit() {
  }

  goInicio() {
    this.router.navigate(['/inicio']);
  }

  goWallets(){
    this.router.navigate(['/wallets']);
  }

  goData(){
    this.router.navigate(['/data-wallet']);
  }


}
