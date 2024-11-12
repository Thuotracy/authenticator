import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../confirm.validator';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  form!: FormGroup;
  submitted=false;
  data: any;

  constructor (private formBuilder: FormBuilder,
    private dataservice: DataService,
    private toastr: ToastrService
  ){}

  createForm(){
    this.form=this.formBuilder.group({
     
     name:[null,Validators.required],
     email:['',[Validators.required,Validators.email]],
     password:['',[Validators.required,Validators.minLength(6)]],
     confirmpassword:['',[Validators.required]]
     
    },
    {
      validator: MustMatch('password','confirmpassword')
     }
  )
     
    }

    ngOnInit(): void{
      this.createForm();
     }

     get f(){
      return this.form.controls;
     }

     onSubmit(){
      this.submitted=true;
      if(this.form.invalid){
        return;
      }
      this.dataservice.registerUser(this.form.value).subscribe(
        (res: any) => {
          this.data = res;
          if (this.data.status === 1) {
            this.toastr.success(
              JSON.stringify(this.data.message),
              JSON.stringify(this.data.code),
              {
                timeOut: 2000,
                progressBar: true
              }
            );
          } else {
            this.toastr.error(
              JSON.stringify(this.data.message),
              JSON.stringify(this.data.code),
              {
                timeOut: 2000,
                progressBar: true
              }
            );
          }
          this.submitted = false;
          this.form.reset(); // Reset entire form
        },
        (error) => {
          console.error('Error:', error);
          this.toastr.error('Registration failed', 'Error', {
            timeOut: 2000,
            progressBar: true
          });
        }
      );
     }

     
}
