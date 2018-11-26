import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsectPickerPage } from './insect-picker';

@NgModule({
  declarations: [
    InsectPickerPage,
  ],
  imports: [
    IonicPageModule.forChild(InsectPickerPage),
  ],
})
export class InsectPickerPageModule {}
