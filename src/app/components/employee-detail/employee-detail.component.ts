import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, private http: HttpClient, private empidservice:DataService, private _coreservice: CoreService
  ) { }
  Student: any;
  empid:any;
   empdetailbyid:any
  ngOnInit(): void {
    this.empid= this.route.snapshot.params['id'];
    console.log(this.route.snapshot.params['id'])
   this.getdetailbyid();
  
  }
  setDefaultPic() {
    this.empdetailbyid.img = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg";
  }
  getdetailbyid(){
    this.empidservice.getdetailid(this.empid).subscribe(response=>{
      this.Student= response;
   const   studentObject = this.Student.reduce((obj:any, item:any) => {
        obj = item;
        return obj;
      }, {});
      this.empdetailbyid= studentObject
      
    })
  }
  deleteemployee(id:number){
    this.empidservice.deleteemployee(id).subscribe({
      next: (res) => {
        this._coreservice.openSnackBar('employee deleted', 'done');
       
      },
      error: console.log,
      
    })
  }
}
