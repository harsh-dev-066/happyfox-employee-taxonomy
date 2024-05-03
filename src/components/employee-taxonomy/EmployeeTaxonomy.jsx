import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import EmployeeNode from "./EmployeeNode";
import "./style.scss";

const EmployeeTaxonomy = () => {
  const employeeTaxonomy = useSelector((state) => state.employee.taxonomy);

  return (
    <div className="taxonomy">
      <DndProvider backend={HTML5Backend}>
        <EmployeeNode data={employeeTaxonomy} Updater={null} />
      </DndProvider>
    </div>
  );
};
export default EmployeeTaxonomy;
