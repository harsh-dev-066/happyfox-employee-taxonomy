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

      this.put("/employees/:id/update-manager", (schema, request) => {
        const id = request.params.id;
        const newManagerId = JSON.parse(request.requestBody).managerId;
        const newTeam = JSON.parse(request.requestBody).team;
        const employee = schema.employees.find(id);
        const newManager = schema.employees.find(newManagerId);
        if (id === newManager?.managerId) {
          newManager.update({ managerId: employee.managerId });
        }
        employee.update({ managerId: newManagerId, team: newTeam });
        return { employee, newManager };
      });
    },
  });
}
