import React from "react";
import styles from "../styles/modules/todoItem.module.scss";
import { getClasses } from "../utils/getClasses";
import { MdDelete, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../Slices/todoSlices";

const TodoItem = ({ todo }) => {
  const { id, title, status, time } = todo;
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    toast.success("Delete todo successfully");
  };
  const handleUpdate = () => {
    toast.success("Edit Called successfully");
  };

  return (
    <div className={styles.item}>
      <div className={styles.todoDetails}>
        [ ]
        <div className={styles.texts}>
          <p
            className={getClasses([
              styles.todoText,
              status === "complete" && styles["todoText--completed"],
            ])}
          >
            {title}
          </p>
          <p className={styles.time}>{time}</p>
        </div>
      </div>
      <div className={styles.todoActions}>
        <div
          className={styles.icon}
          onClick={() => handleDelete(id)}
          role="button"
          tabIndex={0}
        >
          <MdDelete />
        </div>
        <div
          className={styles.icon}
          onClick={handleUpdate}
          role="button"
          tabIndex={0}
        >
          <MdEdit />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
    