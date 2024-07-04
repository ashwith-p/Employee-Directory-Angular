import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeDto } from '../../models/EmployeeDto';
import {  ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employeeService/employee.service';
import { Employee } from '../../models/Employee';
import { firstValueFrom } from 'rxjs';
import { LocationService } from '../../services/locationService/location.service';
import { RoleService } from '../../services/roleService/role.service';
import { DepartentService } from '../../services/departmentService/departent.service';

@Component({
  selector: 'app-role-desc',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './role-desc.component.html',
  styleUrl: './role-desc.component.css'
})
export class RoleDescComponent {
  employees:EmployeeDto[]=[]
  constructor(private route: ActivatedRoute,private employeeService:EmployeeService,private locationService:LocationService,
    private roleService:RoleService,private departmentService:DepartentService){}
  async ngOnInit()
  {
    // this.employees=[
    //   {
    //     FirstName:"Ashwith",
    //     LastName:"Nani",
    //     JoiningDate:"12/12/2023",
    //     Email:"ash@gmail.com",
    //     Location:"Hyderabad",
    //     Department:"Product Engg.",
    //     Role:"Intern",
    //     Id:"TZ0001"
    //   },
    //   {
    //     FirstName:"Keelu",
    //     LastName:"Nani",
    //     JoiningDate:"11/11/2011",
    //     Email:"ashwith@gmail.com",
    //     Location:"Chennai",
    //     Department:"UI/UX",
    //     Role:"Intern",
    //     Id:"TZ0002"
    //   }
    // ]
    const id :number= parseInt(this.route.snapshot.paramMap.get('id')!);
    console.log(id);
    let empData:Employee[]=await firstValueFrom(await this.employeeService.getEmployees());
    for(var emp of empData)
    {
      emp=new Employee(emp);
      if(emp.RoleId==id)
      {
        let loc:string=(await firstValueFrom(await this.locationService.getLocationtById(emp.LocationId)) as any).name as string;
        let role:string=(await firstValueFrom(await this.roleService.getRoleById(emp.RoleId)) as any).name as string;
        let dept= (await firstValueFrom(await this.departmentService.getDepartmentById(emp.DepartmentId)) as any).name as string;
        //this.employees.push(new EmployeeDto(emp.Id,dept,emp.FirstName,emp.LastName,emp.Email,emp.JoiningDate,loc,role))
      }
    }
    console.log(this.employees);
  }
   
}
