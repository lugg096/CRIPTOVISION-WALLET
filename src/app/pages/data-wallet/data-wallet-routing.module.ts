import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataWalletPage } from './data-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: DataWalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataWalletPageRoutingModule {}
