import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { __param } from 'tslib';
 
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  Student: any;
  constructor(private dataservice:DataService,private router:Router, private route:ActivatedRoute ){
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
    })
   }

   updateemp(){
    this.dataservice.update(this.Student).subscribe({
      next:(data)=>{
console.log('updated')
      },
      error:(er)=>{
        console.log(er)
      }
    })
   }
}
