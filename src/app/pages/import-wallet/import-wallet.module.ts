import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportWalletPageRoutingModule } from './import-wallet-routing.module';

import { ImportWalletPage } from './import-wallet.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ImportWalletPageRoutingModule
  ],
  declarations: [ImportWalletPage]
})
export class ImportWalletPageModule {}
