import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PictureCheckerPage } from './picture-checker';

@NgModule({
  declarations: [
    PictureCheckerPage,
  ],
  imports: [
    IonicPageModule.forChild(PictureCheckerPage),
  ],
})
export class PictureCheckerPageModule {}
