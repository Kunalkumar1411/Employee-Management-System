import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.scss'
})
export class EmployeeDetail implements OnInit {

  employee?: Employee;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.employeeService.getById(id).subscribe({
      next: (data) => this.employee = data
    });
  }
}