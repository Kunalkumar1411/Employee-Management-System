import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../core/services/employee';
import { AuthService } from '../../../core/services/auth';


@Component({
  selector: 'app-employee-list',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive
  ],

  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss'
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  loading = true;
  error = '';

  searchText = '';
  selectedDepartment = '';

  userName = 'Admin';
  userInitial = 'A';

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }


  // ================================
  // LOAD EMPLOYEES
  // ================================

  loadEmployees(): void {

    this.loading = true;
    this.error = '';

    this.employeeService.getAll().subscribe({

      next: (data) => {

        this.employees = data || [];

        this.filteredEmployees = [...this.employees];

        this.loading = false;

      },

      error: (err) => {

        console.error('Failed to load employees:', err);

        this.error = 'Failed to load employees. Please try again.';

        this.loading = false;

      }

    });

  }


  // ================================
  // SEARCH + FILTER
  // ================================

  filterEmployees(): void {

    const search = this.searchText
      .toLowerCase()
      .trim();

    this.filteredEmployees = this.employees.filter(emp => {

      const fullName =
        `${emp.firstName} ${emp.lastName}`.toLowerCase();

      const email =
        emp.email?.toLowerCase() || '';

      const department =
        emp.department?.toLowerCase() || '';

      const matchesSearch =
        !search ||
        fullName.includes(search) ||
        email.includes(search) ||
        department.includes(search);

      const matchesDepartment =
        !this.selectedDepartment ||
        emp.department === this.selectedDepartment;

      return matchesSearch && matchesDepartment;

    });

  }


  // ================================
  // DELETE EMPLOYEE
  // ================================

  deleteEmployee(id: number): void {

    const confirmed = confirm(
      'Are you sure you want to delete this employee?'
    );

    if (!confirmed) {
      return;
    }

    this.employeeService.delete(id).subscribe({

      next: () => {
        this.loadEmployees();
      },

      error: (err) => {

        console.error('Delete employee failed:', err);

        this.error =
          'Failed to delete employee. Please try again.';

      }

    });

  }


  // ================================
  // EMPLOYEE INITIALS
  // ================================

  getInitials(
    firstName: string,
    lastName: string
  ): string {

    const first =
      firstName?.charAt(0)?.toUpperCase() || '';

    const last =
      lastName?.charAt(0)?.toUpperCase() || '';

    return `${first}${last}`;

  }


  // ================================
  // DEPARTMENT COUNT
  // ================================

  get departments(): string[] {

    const departmentSet = new Set<string>();

    this.employees.forEach(emp => {

      if (emp.department) {
        departmentSet.add(emp.department);
      }

    });

    return Array.from(departmentSet).sort();

  }


  get departmentCount(): number {

    return this.departments.length;

  }


  // ================================
  // ACTIVE EMPLOYEES
  // ================================

  get activeEmployees(): number {

    return this.employees.length;

  }


  // ================================
  // TOTAL SALARY
  // ================================

  get totalSalary(): number {

    return this.employees.reduce(
      (total, employee) =>
        total + Number(employee.salary || 0),
      0
    );

  }


  // ================================
  // LOGOUT
  // ================================

 logout(): void {
  this.authService.logout();
}

}