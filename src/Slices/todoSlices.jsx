import { createSlice } from "@reduxjs/toolkit";

const getLocalTodolist = () => {
  // getting todo list from localstorage
  const localTodoList = localStorage.getItem("todoList");
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  localStorage.setItem("todoList", []);
  return [];
};

const initialState = {
  todolist: getLocalTodolist(),
};

const todoSlices = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todolist.push(action.payload);
      const todoList = localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        // then add to array of todoListArr
        todoListArr.push({ ...action.payload });
        // then add to the localStorage
        localStorage.setItem("todoList", JSON.stringify(todoListArr));
      } else {
        // if this is first todo then do this
        window.localStorage.setItem(
          "todoList",
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
    deleteTodo: (state, action) => {
      const todoList = localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        // store in the local storage
        localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todolist = todoListArr;
      }
    },
  },
});

export const { addTodo, deleteTodo } = todoSlices.actions;
export default todoSlices.reducer;
