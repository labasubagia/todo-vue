import { nanoid } from 'nanoid';

let list = [];

const getAllTodo = () => {
  // Sort by isDone == false
  return list.sort((a, b) => a.isDone - b.isDone);
};

const getTodoById = (id) => {
  return list.find((t) => t.id == id);
};

const addTodo = ({ activity, isDone = false }) => {
  list.push({ id: nanoid(), activity, isDone });
};

const updateTodo = (id, { activity, isDone }) => {
  const index = list.findIndex((t) => t.id == id);
  list[index] = { ...list[index], activity, isDone };
};

const toggleIsDone = (id) => {
  const index = list.findIndex((t) => t.id == id);
  list[index].isDone = !list[index].isDone;
};

const removeTodo = (id) => {
  list = list.filter((t) => t.id != id);
};

export {
  getTodoById,
  getAllTodo,
  addTodo,
  updateTodo,
  removeTodo,
  toggleIsDone,
};
