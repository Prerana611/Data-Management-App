import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EmployeeManagementSystem';
    displayedColumns: string[] = ['fname', 'lname', 'empid', 'email', 'password', 'pnumber', 'role', 'record',
    'date', 'occupation',
    'name', 'age'
  ];
  
  dataSource!: MatTableDataSource<any []>;

  constructor(private _emplist:DataService){
  }
  getemployeelist() {
    // this._emplist.getemployee().subscribe({
    //   next: (res: any) => {
    //     this.dataSource = new MatTableDataSource(res);
    //   },
    //   error: console.log,
    // })
    this._emplist.getemployee().subscribe (response => {
              this.dataSource = new MatTableDataSource(response);

      console.log('json',response);
    });
  }
}
