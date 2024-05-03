import { Employee, EmployeeNode } from "../types/types";

const generateEmployeeTree = (employees: Employee[]): EmployeeNode[] => {
  const employeeMap = new Map<string, EmployeeNode>();

  employees.forEach((employee) => {
    employeeMap.set(employee.id, { ...employee, children: [] });
  });

  return employees.reduce((tree, employee) => {
    const node = employeeMap.get(employee.id);
    if (node && employee.managerId) {
      const managerNode = employeeMap.get(employee.managerId);
      if (managerNode) {
        managerNode.children.push(node);
      }
    } else if (node) {
      tree.push(node);
    }
    return tree;
  }, [] as EmployeeNode[]);
};

const updateEmployee = (
  source: EmployeeNode,
  target: EmployeeNode,
  employeeList: Employee[]
): Employee[] => {
  return employeeList.map((employee) => {
    if (employee.id === source.id) {
      return source;
    } else if (employee.id === target.id) {
      return target;
    }
    return employee;
  });
};

export { generateEmployeeTree, updateEmployee };
