import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee, EmployeeNode } from "../types/types";

interface EmployeeState {
  employees: Employee[];
  taxonomy: EmployeeNode[];
}

const initialState: EmployeeState = {
  employees: [],
  taxonomy: [],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload;
    },
    updateManager: (
      state,
      action: PayloadAction<{ id: string; managerId: string }>
    ) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index].managerId = action.payload.managerId;
      }
    },
    setTaxonomy: (state, action: PayloadAction<EmployeeNode[]>) => {
      state.taxonomy = action.payload;
    },
  },
});

export const { setEmployees, updateManager, setTaxonomy } =
  employeeSlice.actions;

export default employeeSlice.reducer;
