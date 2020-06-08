import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './components/message/message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [MessageComponent],
  entryComponents: [MessageComponent],
})
export class ChatModule { }
