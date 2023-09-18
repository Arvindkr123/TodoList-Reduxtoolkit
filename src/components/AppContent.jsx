import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import styles from "../styles/modules/app.module.scss";

const AppContent = () => {
  const todoList = useSelector((state) => state.todo.todolist);
  //console.log(todoList);
  const sortedTodoList = [...todoList].sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const filterStatusList = sortedTodoList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    return item.status === filterStatus;
  });
  // console.log("filterStatus:", filterStatus);
  // console.log("todoList:", todoList);
  // console.log("Filtered List:", filterStatusList);
  return (
    <div className={styles.content__wrapper}>
      {filterStatusList && filterStatusList.length > 0 ? (
        filterStatusList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <p>No todo found !!</p>
      )}
    </div>
  );
};

export default AppContent;
