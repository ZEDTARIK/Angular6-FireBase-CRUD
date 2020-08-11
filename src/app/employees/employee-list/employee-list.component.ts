import { Employee } from './../../shared/class/employee.model';
import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  employeeArry = [];
  searchTxt = '';
  ngOnInit() {
    this.getdata();
  }

  getdata() {
    this.employeeService.getEmployees()
      .subscribe(
        data => {
          this.employeeArry = data.map(item => {
            return {
              $key: item.key,
              ...item.payload.val()
            };
          });
        });
  }

  onDelete($key: string) {
    Swal.fire({
      title: 'Are you sure to Delete ?',
      type: 'warning',
      timer: 6000,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it !'
    }).then((result) => {
      if (result.value) {
        this.employeeService.deleteEmployee($key);
        Swal.fire(
          'Deleted !',
          'Your Record has been deleted.',
          'success'
        );
      }
    });
  }

  onFilter(employee: Employee) {
    return employee.FullName.trim().toLowerCase().indexOf(this.searchTxt.trim().toLowerCase()) !== -1 ||
      employee.Email.trim().toLowerCase().indexOf(this.searchTxt.trim().toLowerCase()) !== -1;
  }

}
