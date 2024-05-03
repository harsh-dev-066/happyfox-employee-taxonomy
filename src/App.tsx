import "./App.scss";
import { setupServer } from "./api/mockServer.js";
import { Navbar, EmployeeList, EmployeeTaxonomy } from "./components";

function App() {
  setupServer();

  return (
    <div>
      <Navbar title="Employee Taxonomy - HappyFox" />
      <div className="root">
        {/* Let Panel */}
        <div className="list-wrapper">
          <EmployeeList />
        </div>
        {/* Right Panel */}
        <div className="taxonomy-wrapper">
          <EmployeeTaxonomy />
        </div>
      </div>
    </div>
  );
}

export default App;
