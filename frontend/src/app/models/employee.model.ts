export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  salary: number;
  hireDate: string;
  // departmentId: number;
  department: string;
}

export interface CreateEmployee {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  salary: number;
  hireDate: string;
  department: string;
}

export interface UpdateEmployee extends CreateEmployee {}