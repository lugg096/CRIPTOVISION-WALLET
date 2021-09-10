import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportWalletPage } from './import-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: ImportWalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportWalletPageRoutingModule {}
