import { Employee, EmployeeNode } from "../types/types";

const generateEmployeeTree = (employees: Employee[]): EmployeeNode[] => {
  const employeeMap = new Map<string, EmployeeNode>();

  // Create a node for each employee and map them by ID
  employees.forEach((employee) => {
    employeeMap.set(employee.id, { ...employee, children: [] });
  });

  // Build the tree by assigning children to their respective managers
  return employees.reduce((tree, employee) => {
    const node = employeeMap.get(employee.id);
    if (node && employee.managerId) {
      const managerNode = employeeMap.get(employee.managerId);
      if (managerNode) {
        managerNode.children.push(node);
      }
    } else if (node) {
      tree.push(node); // Root nodes (employees without a manager)
    }
    return tree;
  }, [] as EmployeeNode[]);
};
export { generateEmployeeTree };
