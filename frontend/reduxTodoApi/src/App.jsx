import { useState } from 'react'
import { Todos } from './components/Todos'
import CreateTodo from './components/CreateTodo'


function App() {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <CreateTodo />
      <Todos />
    </div>

  )
}

export default App
