import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ReportEditPage} from './report-edit';

@NgModule({
  declarations: [
    ReportEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportEditPage),
  ],
})
export class ReportEditPageModule {
}
