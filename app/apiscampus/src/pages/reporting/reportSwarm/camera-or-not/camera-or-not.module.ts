import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraOrNotPage } from './camera-or-not';

@NgModule({
  declarations: [
    CameraOrNotPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraOrNotPage),
  ],
})
export class CameraOrNotPageModule {}
