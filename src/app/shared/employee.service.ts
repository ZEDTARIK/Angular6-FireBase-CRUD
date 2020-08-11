import { Employee } from './class/employee.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private fire: AngularFireDatabase) { }

  employeeList: AngularFireList<any>;
  employee = new Employee();
  form = new FormGroup({
    $key: new FormControl(null),
    FullName: new FormControl('', [ Validators.required, Validators.minLength(3)]),
    Email: new FormControl('', [ Validators.required, Validators.email])
  });
  getEmployees() {
    this.employeeList = this.fire.list('tb_Employees');
    return this.employeeList.snapshotChanges();
  }
  insertEmployee(employee) {
    this.employeeList.push({
      FullName: employee.FullName,
      Email: employee.Email
    });
  }
populateForm(employee) {
  this.form.setValue(employee);
}
  updateEmployee(employee) {
    this.employeeList.update(employee.$key, {
      FullName: employee.FullName,
      Email: employee.Email
    });
  }
  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }
}
