import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[LoginService]
})
export class LoginComponent {
  user : any;
  loginform!: FormGroup; 
  msg="";
  constructor(private fb: FormBuilder, private loginservice:LoginService,private routes : Router,
    private authService: AuthserviceService){
   localStorage.setItem('username',this.user);
    this.loginform = this.fb.group({  
     
      empid :new FormControl('', Validators.required) ,
      password:new FormControl('', Validators.required) 

    }); 
  }

// login(){
//   this.service.getemployee().subscribe(res=>{
//     const user = res.find((a:any)=>{
//       return a.email === this.loginform.value.empid && a.password === this.loginform.value.password
//     });
//     if(user){
//       this.routes.navigate(['/add-emp']);
//     }
//     else{
//       this.msg ='Invalid username or password';
// console.log(res);
// console.log(res.map((a: any) => a.email));
// console.log(this.loginform.value.empid)
//     }
//   })
// }
login() {
  const user = { email: this.loginform.value.empid, password: this.loginform.value.password, role:this.loginform.value.role };
  this.user=this.loginform.value.empid;
  const { empid, password } = this.loginform.value;
  this.loginservice.getemployeeforauth(empid, password).subscribe(
    isLoggedIn => {
      if (isLoggedIn) {
        localStorage.setItem('role',this.loginservice.Username)
        // this.authService.setCurrentUser(user);
        this.routes.navigate(['/all-emp']);
        console.log(localStorage)
        console.log('loggedin')
      } else {
        this.msg = 'Invalid username or password';
      }
    },
    error => {
      console.log(error);
      this.msg = 'An error occurred. Please try again later.';
    }
  );
}


}
