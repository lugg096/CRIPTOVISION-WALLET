import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { noLoginGuard } from './guards/noLogin.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'inicio',
   canActivate: [AuthGuard],
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'transferir',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/transferir/transferir.module').then( m => m.TransferirPageModule)
  },
  {
    path: 'transactions/:moneda',
   canActivate: [AuthGuard],
    loadChildren: () => import('./pages/transactions/transactions.module').then( m => m.TransactionsPageModule)
  },
  {
    path: 'import-wallet',
    loadChildren: () => import('./pages/import-wallet/import-wallet.module').then( m => m.ImportWalletPageModule)
  },
  {
    path: 'options',
    loadChildren: () => import('./pages/options/options.module').then( m => m.OptionsPageModule)
  },
  {
    path: 'wallets',
    loadChildren: () => import('./pages/wallets/wallets.module').then( m => m.WalletsPageModule)
  },
  {
    path: 'data-wallet',
    loadChildren: () => import('./pages/data-wallet/data-wallet.module').then( m => m.DataWalletPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
