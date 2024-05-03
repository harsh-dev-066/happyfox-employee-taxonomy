type Employee = {
  id: string;
  name: string;
  designation: string;
  team: string;
  managerId: string | null;
  image: string;
};

type EmployeeNode = {
  id: string;
  name: string;
  designation: string;
  team: string;
  managerId: string | null;
  image: string;
  children: EmployeeNode[];
};

export type { Employee, EmployeeNode };
