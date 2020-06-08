import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MustMatch } from '../../helpers/must-match.validator';
import { ApiService } from 'src/app/shared/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  public registerFormGroup: FormGroup;
  private regExEmail = `^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$`;

  constructor(
    public readonly registerFormBuilder: FormBuilder,
    public readonly apiService: ApiService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  get formControls() {
    return this.registerFormGroup.controls;
  }

  createForm() {
    this.registerFormGroup = this.registerFormBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.regExEmail)]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit() {
    const userDetails = this.registerFormGroup.value;
    this.apiService.register(userDetails).subscribe((response) => {
      console.log(response);
    }, (error) => {
      if (error.error) {
        if (error.error.code === 11000) {
          console.log(`Error! Duplicate Email.`);
        } else if (error.error.message) {
          console.log(`Error! ${error.error.message}`);
        }
      }

    });
  }

  get isValidForm() {
    return this.registerFormGroup.valid;
  }

}
