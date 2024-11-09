import { PMStudentList } from "@/PMs/Students/StudentsListPM";
import { useEffect } from "react";

import "@/Views/Students/StudentsListStyle.css";
import Sidebar from "@/Views/Components/Sidebar";
import StudentList from "./Components/Studentlist";

interface propsType {
  pm: PMStudentList;
}

export default function StudentsListView({ pm }: propsType) {
  useEffect(() => {
    pm.currentSelection = Array(pm.studentsList.length).fill(false);
  }, [pm.studentsList]);

  return (
    <div className="container">
      <Sidebar pm={pm.pmSidebar} />
      <div className="main-content">
        <header>
          <h2 className="title">Students List</h2>
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            // value={pm.Search}
            // onChange={(e) => {
            //   pm.Search = e.target.value;
            //   pm.onSearchChange();
            // }}
          />
        </header>

        <div className="top-bar">
          <label className="select-label">
            Number of Records &nbsp;
            <select
              className="select-page"
              //   value={pm.records}
              //   onChange={pm.onRecordsChange}
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </label>
          <div className="pagination">
            <button>&lt;</button>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <button>&gt;</button>
          </div>
        </div>
        <StudentList pm={pm} />
      </div>
    </div>
  );
}
