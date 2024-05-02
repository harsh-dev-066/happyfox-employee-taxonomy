import { createServer, Model } from "miragejs";
import { EMPLOYEES } from "./mockData";

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

      this.get("/employees", (schema) => {
        return schema.employees.all();
      });

      this.post("/employees/:id/update-manager", (schema, request) => {
        const id = request.params.id;
        const newManagerId = JSON.parse(request.requestBody).managerId;
        const employee = schema.employees.find(id);
        employee.update({ managerId: newManagerId });
        return employee;
      });
    },
  });
}
