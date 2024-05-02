type Employee = {
  id: string;
  name: string;
  designation: string;
  team: string;
  managerId: string | null;
};

type EmployeeNode = {
  id: string;
  name: string;
  designation: string;
  team: string;
  managerId: string | null;
  children: EmployeeNode[];
};

export type { Employee, EmployeeNode };
