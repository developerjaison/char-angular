import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/service/api.service';
import { CustomService } from 'src/app/shared/service/custom.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public loginFormGroup: FormGroup;
  private regExEmail = `^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$`;

  constructor(
    public readonly loginFormBuilder: FormBuilder,
    public readonly apiService: ApiService,
    private readonly customService: CustomService,
    private router: Router
  ) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.loginFormGroup = this.loginFormBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.regExEmail)]],
      password: ['', [Validators.required]]
    });
  }

  get isValidForm() {
    return this.loginFormGroup.valid;
  }

  onSubmit() {
    const credentials = this.loginFormGroup.value;
    this.apiService.login(credentials).subscribe((response: any) => {
      console.log(response);
      if (response.token) {
        this.customService.setToken(response.token);
        this.router.navigateByUrl('/message');
      }
    }, (error) => {
      if (error.error) {
        console.log(`Error! ${error.error.message}`);
      }
    });
  }

}
