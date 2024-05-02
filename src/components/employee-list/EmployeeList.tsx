import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { RootState } from "../../redux/store";
import { setEmployees } from "../../redux/employeeSlice";
import SearchBox from "../search-box/SearchBox";
import "./style.scss";
import Filter from "../filter/Filter";

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employee.employees);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employees");
        dispatch(setEmployees(response.data.employees));
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, [dispatch]);

  const handleSearch = (value: string) => {
    setSearch(value.toLowerCase());
  };

  const handleFilter = (filter: string) => {
    setSearch(filter);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.designation.toLowerCase().includes(search.toLowerCase()) ||
      employee.team.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="employee-list">
      <div className="actions">
        <div className="search">
          <SearchBox
            placeholder="Search Employee"
            onSearch={handleSearch}
            onChange={handleSearch}
          />
        </div>
        <div className="filter">
          <Filter
            filterOptions={["Accounts", "Business", "Technology"]}
            onSelectFilter={handleFilter}
          />
        </div>
      </div>
      {filteredEmployees.length > 0 ? (
        filteredEmployees.map((employee) => (
          <div key={employee.id} className="employee-card">
            <div className="info">
              <div>{employee.name}</div>
              <div className="designation">{employee.designation}</div>
            </div>
            <div className="team">{employee.team}</div>
          </div>
        ))
      ) : (
        <div className="no-results">No results found.</div>
      )}
    </div>
  );
};

export default EmployeeList;
