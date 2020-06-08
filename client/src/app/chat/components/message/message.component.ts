import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomService } from 'src/app/shared/service/custom.service';
import { Message } from '../../classes/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent implements OnInit {

  public messageFormGroup: FormGroup;
  public messagesList: Array<Message> = [];
  constructor(
    public readonly messageFormBuilder: FormBuilder,
    private readonly apiService: ApiService,
    private router: Router,
    private readonly customService: CustomService
  ) {
    this.createFormGroup();
   }

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.apiService.getMessages().subscribe((response: Array<Message>) => {
      this.messagesList = response;
    });
  }

  sendMessage() {
    this.apiService.sendMessages(this.messageFormGroup.value).subscribe((response: any) => {
      this.getMessages();
    });
  }

  get isFormValid() {
    return this.messageFormGroup.valid;
  }

  createFormGroup() {
    this.messageFormGroup = this.messageFormBuilder.group({
      message: ['', [Validators.required]]
    });
  }

}
