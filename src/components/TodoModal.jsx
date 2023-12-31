import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import styles from "../styles/modules/modal.module.scss";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../Slices/todoSlices";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

const TodoModal = ({ modalOpen, setModalOpen, type, todo }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("inComplete");
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("inComplete");
    }
  }, [todo, type, modalOpen]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("please enter a title");
      return;
    }

    if (title && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title: title,
            status: status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("todo added successfully!!");
        setTitle("");
      }
      if (type === "update") {
        if (todo.title !== title || todo.status !== status) {
          dispatch(
            updateTodo({
              ...todo,
              title: title,
              status: status,
            })
          );
        } else {
          toast.error("No changes were made");
        }
      }
      setTimeout(() => {
        setModalOpen(false);
      }, [100]);
    }
  };
  return (
    <>
      {modalOpen && (
        <>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div
                onClick={() => setModalOpen(false)}
                onKeyDown={() => setModalOpen(false)}
                tabIndex={0}
                role="button"
                className={styles.closeButton}
              >
                <MdOutlineClose />
              </div>
              <form className={styles.form} onSubmit={submitHandler}>
                <h1 className={styles.formTitle}>
                  {type === "update" ? "Update" : "Add"} Task
                </h1>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>
                <label htmlFor="status">
                  Status
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                  </select>
                </label>
                <div className={styles.buttonContainer}>
                  <Button type={"submit"} variant="primary">
                    {type === "update" ? "Update" : "Add"} Task
                  </Button>
                  <Button
                    type={"button"}
                    variant="secondary"
                    onClick={() => setModalOpen(false)}
                    onKeyDown={() => setModalOpen(false)}
                    tabIndex={0}
                    role="button"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TodoModal;
