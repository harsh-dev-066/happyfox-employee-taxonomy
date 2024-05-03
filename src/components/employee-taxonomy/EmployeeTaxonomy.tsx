import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import EmployeeNode from "./EmployeeNode";
import { setEmployees } from "../../redux/employeeSlice";
import { updateEmployee } from "../../utils/taxonomyUtils";
import axios from "axios";
import { EmployeeNode as EmployeeNodeType } from "../../types/types";
import { RootState } from "../../redux/store";
import "./style.scss";

const EmployeeTaxonomy: React.FC = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employee.employees);
  const employeeTaxonomy = useSelector(
    (state: RootState) => state.employee.taxonomy
  );

  const onUpdateEmployee = async (
    source: EmployeeNodeType,
    target: EmployeeNodeType
  ) => {
    if (source.id === target.id) return;
    try {
      const response = await axios.put(
        `/api/employees/${source.id}/update-manager`,
        {
          managerId: target.id,
          team: target.id === "1" ? source.team : target.team,
        }
      );
      const updatedEmployeeList = updateEmployee(
        response.data.employee,
        response.data.newManager,
        employees
      );
      dispatch(setEmployees(updatedEmployeeList));
    } catch (error) {
      console.error("Failed to update employee", error);
    }
  };

  return (
    <div className="taxonomy">
      <DndProvider backend={HTML5Backend}>
        <EmployeeNode data={employeeTaxonomy} onUpdate={onUpdateEmployee} />
      </DndProvider>
    </div>
  );
};
export default EmployeeTaxonomy;
