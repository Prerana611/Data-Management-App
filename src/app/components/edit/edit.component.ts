import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { DataService } from 'src/app/services/data.service';
import { __param } from 'tslib';
 
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  Student: any;
  constructor(private dataservice:DataService,
    private _coreservice: CoreService,private router:Router, private route:ActivatedRoute ){
  }
  
  ngOnInit(): void {
   this.route.paramMap.subscribe((param)=>{
    let id = (param.get('id'));
    this.getbyid(id); 
   })
   
  }
  getbyid(id:any){
    this.dataservice.edit(id).subscribe((data)=>{
console.log(data);
this.Student = data
console.log('data',this.Student.fname)
console.log('data',this.Student)

    })
   }

   updateemp(){
    this.dataservice.update(this.Student).subscribe({
      next:(data)=>{
        this._coreservice.openSnackBar('employee Updated', 'done');

        this.router.navigate(['all-emp']);

console.log('updated')
      },
      error:(er)=>{
        console.log(er)
      }
    })
   }
}
