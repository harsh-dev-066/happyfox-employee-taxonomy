import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../types/types";

interface EmployeeState {
  employees: Employee[];
}

const initialState: EmployeeState = {
  employees: [],
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
  },
});

export const { setEmployees, updateManager } = employeeSlice.actions;
export default employeeSlice.reducer;
