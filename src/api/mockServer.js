import { createServer, Model } from "miragejs";
import { EMPLOYEES } from "./mockData";

// Keeping file in js for avoiding issues of miragejs with typescript compatibility.

// Mock BE api miragejs function
export function setupServer() {
  createServer({
    models: {
      employee: Model,
    },

    seeds(server) {
      EMPLOYEES?.map((employee) => {
        server.create("employee", employee);
      });
    },

    routes() {
      this.namespace = "api";

      // get all employees api
      this.get("/employees", (schema) => {
        return schema.employees.all();
      });

      // update employee manager api
      this.put("/employees/:id/update-manager", (schema, request) => {
        const id = request.params.id;
        const newManagerId = JSON.parse(request.requestBody).managerId;
        const employee = schema.employees.find(id);
        const newManager = schema.employees.find(newManagerId);
        // Handling circular reporting scenario
        // The original manager of the dragged employee becomes the manager of the dropped employee
        if (id === newManager?.managerId) {
          newManager.update({ managerId: employee.managerId });
        }
        //
        employee.update({ managerId: newManagerId });
        return { employee, newManager };
      });
    },
  });
}
