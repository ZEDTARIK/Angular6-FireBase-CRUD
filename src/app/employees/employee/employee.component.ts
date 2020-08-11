import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployees();
  }

  onSubmit() {
    if (this.employeeService.form.valid) {
      if (this.employeeService.form.get('$key').value == null) {
        this.employeeService.insertEmployee(this.employeeService.form.value);
      } else {
        this.employeeService.updateEmployee(this.employeeService.form.value);
      }
      this.onResetForm();
      Swal.fire({
        position: 'top',
        type: 'success',
        title: 'Your Employee has been saved',
        timer: 6000
      });
    }

  }

  onResetForm(form?: NgForm) {
    this.employeeService.form.reset();
  }

}
