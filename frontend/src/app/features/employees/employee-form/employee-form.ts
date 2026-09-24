import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from '../../../core/services/employee';
// import { DepartmentService } from '../../../core/services/department';
import { Department } from '../../../models/department.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss'
})
export class EmployeeFormComponent implements OnInit {

  form!: FormGroup;

  // departments: Department[] = [];

  departments = [
  { id: 1, name: 'HR' },
  { id: 2, name: 'Developer' },
  { id: 3, name: 'Sales' },
  { id: 4, name: 'Marketing' },
  { id: 5, name: 'Finance' },
  { id: 6, name: 'Support' },
  { id: 7, name: 'IT' },
  { id: 8, name: 'Operations' },
  { id: 9, name: 'Administration' },
  { id: 10, name: 'Accounts' }
];



  isEditMode = false;

  employeeId: number | null = null;

  loading = false;

  submitting = false;

  error = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    // private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // =========================================
    // FORM
    // =========================================

    this.form = this.fb.group({

      firstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone: [''],

      salary: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      hireDate: [
        '',
        Validators.required
      ],

      // Department NAME
      department: [
        null,
        Validators.required
      ]

    });


    // =========================================
    // LOAD DEPARTMENTS
    // =========================================

    // this.loadDepartments();


    // =========================================
    // CHECK EDIT MODE
    // =========================================

    const idParam =
      this.route.snapshot.paramMap.get('id');

    if (idParam) {

      this.isEditMode = true;

      this.employeeId = Number(idParam);

      this.loadEmployee(this.employeeId);
    }

  }


  // =========================================
  // LOAD DEPARTMENTS
  // =========================================

  // loadDepartments(): void {

  //   this.departmentService.getAll().subscribe({

  //     next: (data) => {

  //       this.departments = data || [];

  //     },

  //     error: (err) => {

  //       console.error(
  //         'Failed to load departments:',
  //         err
  //       );

  //       this.error =
  //         'Failed to load departments. Please refresh the page.';

  //     }

  //   });

  // }


  // =========================================
  // LOAD EMPLOYEE
  // =========================================

  loadEmployee(id: number): void {

    this.loading = true;

    this.employeeService.getById(id).subscribe({

      next: (emp) => {

        this.form.patchValue({

          firstName: emp.firstName,

          lastName: emp.lastName,

          email: emp.email,

          phone: emp.phone,

          salary: emp.salary,

          hireDate: emp.hireDate
            ? emp.hireDate.split('T')[0]
            : '',

          department: emp.department || null

        });

        this.loading = false;

      },

      error: (err) => {

        console.error(
          'Failed to load employee:',
          err
        );

        this.error =
          'Failed to load employee details.';

        this.loading = false;

      }

    });

  }


  // =========================================
  // SUBMIT
  // =========================================

  onSubmit(): void {

    this.error = '';

    // Validate form
    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.submitting = true;


    // =========================================
    // FORM VALUE
    // =========================================

    const formValue = this.form.value;


    // =========================================
    // API PAYLOAD
    // =========================================

    const payload = {

      firstName: formValue.firstName,

      lastName: formValue.lastName,

      email: formValue.email,

      phone: formValue.phone,

      salary: Number(formValue.salary),

      hireDate: formValue.hireDate,

      // Send department NAME
      department: formValue.department

    };


    console.log(
      'Employee payload:',
      payload
    );


    // =========================================
    // UPDATE
    // =========================================

    if (
      this.isEditMode &&
      this.employeeId !== null
    ) {

      this.employeeService
        .update(
          this.employeeId,
          payload
        )
        .subscribe({

          next: () => {

            this.submitting = false;

            this.router.navigate([
              '/employees'
            ]);

          },

          error: (err) => {

            console.error(
              'Update employee failed:',
              err
            );

            this.error =
              err.error?.message ||
              'Failed to update employee. Please try again.';

            this.submitting = false;

          }

        });

      return;
    }


    // =========================================
    // CREATE
    // =========================================

    this.employeeService
      .create(payload)
      .subscribe({

        next: (response) => {

          console.log(
            'Employee created:',
            response
          );

          this.submitting = false;

          this.router.navigate([
            '/employees'
          ]);

        },

        error: (err) => {

          console.error(
            'Create employee failed:',
            err
          );

          this.error =
            err.error?.message ||
            'Failed to create employee. Please try again.';

          this.submitting = false;

        }

      });

  }


  // =========================================
  // CANCEL
  // =========================================

  cancel(): void {

    this.router.navigate([
      '/employees'
    ]);

  }

}