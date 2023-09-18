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
  filterStatus: "all",
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
    updateTodo: (state, action) => {
      const todoList = localStorage.getItem("todoList");
      if (todoList) {
        let todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
            todo.status = action.payload.status;
          }
        });
        localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todolist = todoListArr;
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
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } =
  todoSlices.actions;
export default todoSlices.reducer;
