import React, { useEffect, useState } from "react";
import styles from "../styles/modules/todoItem.module.scss";
import { getClasses } from "../utils/getClasses";
import { MdDelete, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../Slices/todoSlices";
import TodoModal from "./TodoModal";
import CheckButton from "./CheckButton";

const TodoItem = ({ todo }) => {
  const { id, title, status, time } = todo;
  const dispatch = useDispatch();
  const [updateModelOpen, setUpdateModelOpen] = useState(false);
  const [checkBoxOpen, setCheckBoxOpen] = useState(false);

  useEffect(() => {
    if (status === "complete") {
      setCheckBoxOpen(true);
    } else {
      setCheckBoxOpen(false);
    }
  }, [status]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    toast.success("Delete todo successfully");
  };
  const handleUpdate = () => {
    setUpdateModelOpen(!updateModelOpen);
  };

  const handleCheck = () => {
    setCheckBoxOpen(!checkBoxOpen);
    dispatch(
      updateTodo({
        ...todo,
        status: checkBoxOpen ? "inComplete" : "complete",
      })
    );
  };

  return (
    <>
      <div className={styles.item}>
        <div className={styles.todoDetails}>
          <CheckButton
            checkBoxOpen={checkBoxOpen}
            setCheckBoxOpen={setCheckBoxOpen}
            handleCheck={handleCheck}
          />

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
      {updateModelOpen && (
        <TodoModal
          type={"update"}
          modalOpen={updateModelOpen}
          setModalOpen={setUpdateModelOpen}
          todo={todo}
        />
      )}
    </>
  );
};

export default TodoItem;
