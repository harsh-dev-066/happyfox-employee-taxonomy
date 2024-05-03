import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { AppDispatch, RootState } from "../../redux/store";
import { setEmployees, setTaxonomy } from "../../redux/employeeSlice";
import { SearchBox, Filter } from "../../components";
import { generateEmployeeTree } from "../../utils/taxonomyUtils";
import "./style.scss";

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector((state: RootState) => state.employee.employees);
  const [search, setSearch] = useState<string>("");
  const [appliedFilter, setAppliedFilter] = useState<string>("");

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await axios.get("/api/employees");
      dispatch(setEmployees(response.data.employees));
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  }, [dispatch]);

  const updateTaxonomy = useCallback(() => {
    let currentEmployees = [...employees];
    if (appliedFilter) {
      currentEmployees = employees?.filter(
        (emp) => emp.team?.includes(appliedFilter) || emp.id === "1"
      );
    }
    const employeeTaxonomy = generateEmployeeTree(currentEmployees);

    dispatch(setTaxonomy(employeeTaxonomy));
  }, [dispatch, employees, appliedFilter]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    updateTaxonomy();
  }, [employees, updateTaxonomy]);

  const handleSearch = (value: string) => {
    setSearch(value.toLowerCase());
  };

  const handleFilter = (filter: string) => {
    setAppliedFilter(filter);
    updateTaxonomy();
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.designation.toLowerCase().includes(search.toLowerCase()) ||
      employee.team.toLowerCase().includes(search.toLowerCase()) ||
      employee.team.toLowerCase().includes(appliedFilter.toLowerCase())
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
      <div className="employees">
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
    </div>
  );
};

export default EmployeeList;
