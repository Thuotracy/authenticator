import { FormGroup } from "@angular/forms";

export function MustMatch(controlName:string, matchingControlName:string){
   return (formGroup:FormGroup)=>{
       const control=formGroup.controls[controlName];
       const matchingcontrol =formGroup.controls[matchingControlName];
       if(matchingcontrol.errors && !matchingcontrol.errors["mustMatch"]){
           return;
       }
       if(control.value !== matchingcontrol.value){
           matchingcontrol.setErrors({mustMatch:true})
       }
       else{
           matchingcontrol.setErrors(null);
       }
   }
}