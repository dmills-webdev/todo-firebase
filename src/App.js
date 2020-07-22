import React, { useState, useEffect } from "react"
import TodoList from "./TodoList"
import NewTodoForm from "./NewTodoForm"
import "./app.css"

const App = () => {
/////////////////////////////////////////////////////////////// Initialise todos
  let todosStorage = JSON.parse(window.localStorage.getItem('todosStorage'))

  let initialTodos = [{
    id: 1,
    task: "Write first todo",
    completed: false
  }]
  if (todosStorage) {
    initialTodos = todosStorage
  }

  let [ todos, modifyTodos ] = useState(initialTodos)

  useEffect(() => {
    window.localStorage.setItem("todosStorage", JSON.stringify(todos))
  },[todos])

/////////////////////////////////////////////////////////////////// Add new todo
  const submitNewTodo = (newTask) => {
    let d = new Date()
    let timeBasedID = d.getTime() //Generates a unique ID based on the time the todo is submitted
    let newTodo = {
      id: timeBasedID,
      task: newTask,
      completed: false
    }
    modifyTodos(oldTodos => [...oldTodos, newTodo])
  }

//////////////////////////////////////////////////////////////////// Remove todo
  const removeTodo = (id) => {
    modifyTodos(
      todos.filter(todo => todo.id !== id)
    )
  }

///////////////////////////////////////////////////////////// Toggle todo status
  const toggleCompleted = (id) => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    modifyTodos(
      updatedTodos
    )
  }

///////////////////////////////////////////////////////////////// Presentational
  return(
    <div>
      <header>Your Todo List</header>
      <main>
        <TodoList
          todos={todos}
          toggleCompleted={toggleCompleted}
          removeTodo={removeTodo}/>
        <NewTodoForm
          submitNewTodo={submitNewTodo}/>
      </main>
    </div>
  )
}

export default App
