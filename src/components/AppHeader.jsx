import React, { useState } from "react";
import Button, { SelectButton } from "./Button";
import styles from "../styles/modules/app.module.scss";
import TodoModal from "./TodoModal";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../Slices/todoSlices";

const AppHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  // console.log(filterStatus)
  const dispatch = useDispatch();
  const [status, setStatus] = useState(filterStatus);

  const updateFilter = (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);
    //console.log(selectedStatus); // Log the selected value, not 'status'
    dispatch(updateFilterStatus(selectedStatus));
  };
  
  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Task
      </Button>
      <SelectButton
        id={"status"}
        value={status}
        onChange={(e) => updateFilter(e)}
      >
        <option value="all">All</option>
        <option value="inComplete">Incomplete</option>
        <option value="complete">Complete</option>
      </SelectButton>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default AppHeader;
