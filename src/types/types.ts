// TS Types
type Employee = {
  id: string;
  name: string;
  designation: string;
  team: string;
  managerId: string | null;
  image: string;
};
interface EmployeeNode extends Employee {
  children: EmployeeNode[];
}

export type { Employee, EmployeeNode };
