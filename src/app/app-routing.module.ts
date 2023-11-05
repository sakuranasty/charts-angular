import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home Page',
    loadChildren: () =>
      import('./pages/home/home.module').then((c) => c.HomeModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
