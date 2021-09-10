import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataWalletPageRoutingModule } from './data-wallet-routing.module';

import { DataWalletPage } from './data-wallet.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DataWalletPageRoutingModule
  ],
  declarations: [DataWalletPage]
})
export class DataWalletPageModule {}
