import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';

import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Public Routes
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  // Dashboard
  {
    path: 'dashboard',
    redirectTo: 'employees',
    pathMatch: 'full'
  },

  // Employee List
  {
    path: 'employees',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/employees/employee-list/employee-list')
        .then(m => m.EmployeeListComponent)
  },

  // Add Employee
  {
    path: 'employees/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/employees/employee-form/employee-form')
        .then(m => m.EmployeeFormComponent)
  },

  // Edit Employee
  {
    path: 'employees/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/employees/employee-form/employee-form')
        .then(m => m.EmployeeFormComponent)
  },

  // Employee Details
  {
    path: 'employee-details',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/employees/employee-detail/employee-detail')
        .then(m => m.EmployeeDetail)
  },

  // Invalid Route
  // {
  //   path: '**',
  //   redirectTo: 'login'
  // }

];