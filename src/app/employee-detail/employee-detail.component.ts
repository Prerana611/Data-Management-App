import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  displayedColumns: string[] = ['fname', 'lname','password', 'empid', 'email','pnumber','role','record','date']

  // displayedColumns: string[] = ['fname', 'lname','password', 'empid', 'email','pnumber','role','record','date','action']
  dataSource!: MatTableDataSource<any []>;
  constructor(
    private route: ActivatedRoute, private http: HttpClient, private empidservice:DataService, private _coreservice: CoreService
  ) { }
  Student: any;
  empid:any;
  
  ngOnInit(): void {
    this.empid= this.route.snapshot.params['id'];
    console.log(this.route.snapshot.params['id'])
   this.getdetailbyid();
  }
  getdetailbyid(){
    this.empidservice.getdetailid(this.empid).subscribe(response=>{
      console.log(response)
      this.dataSource = new MatTableDataSource(response);
      this.Student= response;
      console.log(this.Student);

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
