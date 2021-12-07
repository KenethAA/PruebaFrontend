import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotoComponent } from './pages/voto/voto.component';
import { MenuComponent } from './pages/menu/menu.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
 
  { path: '', component:MenuComponent,
    children:[
      {path:'welcome',component:WelcomeComponent},
      {path:'voto',component:VotoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
