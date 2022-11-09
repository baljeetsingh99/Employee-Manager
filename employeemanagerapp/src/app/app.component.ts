import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  
  formValue !: FormGroup;
  employeeObj : Employee = new Employee();
  employeeData : any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formBuilder: FormBuilder, private empService : EmployeeService) {}

  ngOnInit(): void {
    this.getEmployee();
    
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      jobTitle: [''],
      phone: [''],
      imageUrl: ['']
    })
    this.getEmployee();
  }


  getEmployee()
  {
    this.empService.getEmployee()
    .subscribe(res=>{
      this.employeeData=res;
    }, err=>{
      console.log("error while fetching data")
    });
  }

  addEmployee()
  {
    console.log(this.employeeObj);
    this.employeeObj.name = this.formValue.value.name;
    this.employeeObj.email = this.formValue.value.email;
    this.employeeObj.jobTitle = this.formValue.value.jobTitle;
    this.employeeObj.phone = this.formValue.value.phone;
    this.employeeObj.imageUrl = this.formValue.value.imageUrl;

    this.empService.addEmployee(this.employeeObj)
    .subscribe(res=>
      {
      console.log(res);
      let ref = document.getElementById("close");
      ref?.click();
      this.formValue.reset();
      this.getEmployee();

      
    }, err=>{
      console.log(err);
    });
    

  }

  deleteEmployee(employee : any){
    this.empService.deleteEmployee(employee.id)
    .subscribe(res=>{
      alert("employee Deleted");
      this.getEmployee();
    })
  }

  onEdit(temp : any)
  {
    
    this.formValue.controls['name'].setValue(temp.name);
    this.formValue.controls['email'].setValue(temp.email);
    this.formValue.controls['jobTitle'].setValue(temp.jobTitle);
    this.formValue.controls['phone'].setValue(temp.phone);
    this.formValue.controls['imageUrl'].setValue(temp.imageUrl);
    this.uempid = temp.id;
    this.uempcode = temp.employeeCode;
  }

  public uempid: number;
  public uempcode: string;
  updateEmployee()
  {
    
    this.employeeObj.id = this.uempid;
    this.employeeObj.name = this.formValue.value.name;
    this.employeeObj.email = this.formValue.value.email;
    this.employeeObj.jobTitle = this.formValue.value.jobTitle;
    this.employeeObj.phone = this.formValue.value.phone;
    this.employeeObj.imageUrl = this.formValue.value.imageUrl;
    this.employeeObj.employeeCode = this.uempcode;
    
    
    
    this.empService.updateEmployee(this.employeeObj)
    .subscribe(res=>{
      console.log(this.employeeObj);
      alert("Updated Successfully")

      let ref = document.getElementById('uclose')
      ref?.click();
      this.formValue.reset();
      this.getEmployee();

    })
  }

  

  



 
}
