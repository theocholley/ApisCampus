import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInformationsPage } from './user-informations';

@NgModule({
  declarations: [
    UserInformationsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserInformationsPage),
  ],
})
export class UserInformationsPageModule {}
