import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookedSwarmPage } from './booked-swarm';

@NgModule({
  declarations: [
    BookedSwarmPage,
  ],
  imports: [
    IonicPageModule.forChild(BookedSwarmPage),
  ],
})
export class BookedSwarmPageModule {}
