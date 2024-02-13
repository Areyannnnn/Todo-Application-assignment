import { useDispatch, useSelector } from "react-redux"
import { completeTodo, deleteTodo, fetchTodos } from "../redux/slice/todo";
import { useEffect } from "react";

export function Todos() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state)




    useEffect(() => {
        dispatch(fetchTodos())
    }, [])


    async function handleTodoCompleted(todoId) {
        setTimeout(() => {
            dispatch(fetchTodos())
        }, 200)
        dispatch(completeTodo({ todoId }));


    }

    function handleTodoDelete(todoId) {
        setTimeout(() => {
            dispatch(fetchTodos())
        }, 200)
        dispatch(deleteTodo({ todoId }));

    }



    if (state.todo.isLoading) {
        <div>
            Loading....
        </div>
    } else {

        return (
            <div className="max-w-md mx-auto mt-8">

                {state.todo.data ? (
                    state.todo.data.map((todo) => {
                        return (
                            <div key={todo._id} className="border p-4 mb-4 w-96 rounded shadow">
                                <h1 className="text-lg font-bold">{todo.title}</h1>
                                <p className="text-gray-700">{todo.description}</p>
                                <div className="mt-4 flex justify-between">
                                    <button onClick={() => handleTodoCompleted(todo._id)} className={`mr-2 bg-green-500  text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
                                        {todo.completed ? "DONE" : "MARK AS COMPLETE"}
                                        {console.log(todo.completed)}
                                    </button>
                                    <button onClick={() => handleTodoDelete(todo._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">DELETE</button>
                                </div>
                            </div>
                        );
                    })
                ) : null}
            </div>
        );
    }
}
