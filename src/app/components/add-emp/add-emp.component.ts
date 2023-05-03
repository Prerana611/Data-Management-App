import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import {Moment} from 'moment';
import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/services/core.service';
import { Router } from '@angular/router';
export const MY_FORMATS={
  parse: {
    dateInput:'MM/DD/YYYY',
  },
  display:{
    dateInput:'MM/DD/YYYY',
    monthYearLabel:'MMM YYYY',
    dateA11yLabel:'LL',
    monthYearA11yLabel:'MMMM YYYY'
  }
}
@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.scss'],
  providers:[
    {
      provide:DateAdapter,
      useClass:MomentDateAdapter,
      deps:[MAT_DATE_LOCALE,MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide:MAT_DATE_FORMATS, useValue:MY_FORMATS},
  ]
})
export class AddEmpComponent implements OnInit {
  @ViewChild('myFileInput')
  myFileInput!: ElementRef;
  employeeform!: FormGroup; 
  public ids: string[] = [];
  currentDate = new Date();
  data: string[] = [];
  submitted = false;
  src:any;
  empid=Math.floor(Math.random()*900000)+100000;
  @Input() img:any;



  constructor(private fb: FormBuilder, private dataservice:DataService,
    private _coreservice: CoreService,private router:Router
    ){
   
  }
  ngOnInit(): void {
    // const employee: Employee = {
    //   fname: '' , 
    //   lname:'' ,
    //   empid :'' ,
    //   password:'' ,
    //   email:'',
    //   pnumber:'' ,
    //   quantities:'' ,
    //   role:'' ,
    //   record:'' ,
    //   date:'' ,
    //   img: this.src
    // };
    this.employeeform = this.fb.group({  
      fname: new FormControl('', Validators.required) , 
      lname:new FormControl('', Validators.required) ,
      empid :new FormControl(this.empid, Validators.required) ,
      password:new FormControl('', Validators.required) ,
      email:new FormControl('', [Validators.required, Validators.email]),
      pnumber:new FormControl('', Validators.required) ,
      quantities: this.fb.array([]) ,
      role:new FormControl('', Validators.required) ,
      record:new FormControl(this.currentDate, Validators.required) ,
      date:new FormControl('', Validators.required) ,
      img: new FormControl(null)
    });  
  }
  onFileSelected(event: any) {
 
   if(event.target.files){
var reader = new FileReader();

reader.readAsDataURL(event.target.files[0]);
reader.onload=(event)=>{
 
 this.src= event.target?.result;
 this.employeeform.get('img')?.setValue([this.src]);
}
   }
  }

  newQuantity() {  
    return this.fb.group({  
      name: '',  
      occupation: '',  
      age: ''
    });
  }  
 
  quantities() : FormArray {  
    return this.employeeform.get("quantities") as FormArray  
  }  
  addQuantity() {  
    this.quantities().push(this.newQuantity());  
  }
  onSubmit() {  

    this.submitted = true;
    this.data.push(this.employeeform.value);   
    // this.User.empid=this.employeeform.value.empid;
    // this.User.fname=this.employeeform.value.fname;
    // this.User.lname=this.employeeform.value.lname;
    // this.User.password=this.employeeform.value.password;
    // this.User.email=this.employeeform.value.email;
    // this.User.pnumber=this.employeeform.value.pnumber;
    // this.User.role=this.employeeform.value.role;
    // this.User.date=this.employeeform.value.date;
    // this.User.quantities=this.employeeform.value.quantities;
    // this.User.record=this.employeeform.value.record;
    // this.User.img=this.src

    this.dataservice.addemployee(this.employeeform.value).subscribe
    (response => {
      
      this._coreservice.openSnackBar('empleyee added succesfully', 'done');
      console.log('json',response);
      this.employeeform.reset()
      this.router.navigate(['login']);
 
    });
    ({
      next: (val: any) => {
        
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }  
}
