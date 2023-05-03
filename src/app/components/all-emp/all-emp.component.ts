import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { DataService } from 'src/app/services/data.service';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-all-emp',
  templateUrl: './all-emp.component.html',
  styleUrls: ['./all-emp.component.scss']
})
export class AllEmpComponent implements OnInit{
  displayedColumns: string[] = ['fname', 'lname', 'empid', 'email','record','date','img','action'
];
  dataSource!: MatTableDataSource<any []>;
  msg="";
  
  constructor( private empdata:LoginService,
    private empidservice:DataService,
    private router: Router,
     private _coreservice: CoreService,
     private loginservice:LoginService
     ,private authService: AuthserviceService){
  }
  @ViewChild(MatSort)
  sort!: MatSort;
  public currentUser: any;
    ngOnInit(): void {
    this.currentUser = this.loginservice.Username?.role;
    console.log('Current user:', localStorage.getItem('role'));
    
    console.log(this.loginservice);
    this.empdata.getemployee().subscribe (response => {
      console.log('json',response);

      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;

    });
  }
  sortDirection: string = 'asc';
  
  navigateToEmployeeDetail(empid: number): void {
    this.router.navigate(['emp/:id', empid]);
  }

  navigate(empid: number){  
  
  this.empdata.getemployee().subscribe(res=>{
    const user = res.map((a: any) =>{
      return a.empid === empid && a.role === "Admin"
    });
    if(user){
      this.router.navigate(['emp/:id', empid]);
      console.log(user)
          }
          else{      
                  this.msg ='Invalid username or password';
                  console.log(res.map((a: any) => a.role));
              } 
  })
  }
  
  deleteemployee(id:number){
    if(localStorage.getItem('role')=== 'Admin'){
      this.empidservice.deleteemployee(id).subscribe({
        next: (res) => {
          this._coreservice.openSnackBar('employee deleted', 'done');
         
        },
        error: console.log,
        
      })
    }
    else{
      alert('you are not authorized')
    }
     
   
  }
  logout(){
    localStorage.clear();
this.loginservice.logout();
alert('Are you sure you want to logout')

this.router.navigate(['login']);


  }
}
