import { useEffect, useState } from 'react'
import './App.css'
import { trcp } from './trpc';

interface todo {
  id: number,
  text: string
}
function App() {
  const [todos, setTodos] = useState<todo[]>();  
  const [todo, setTodo] = useState<string>(''); 

  const getTodos = () => {
    trcp.getTodos
      .query()
      .then((todos)=>{
        setTodos(todos);
      })
  }
  useEffect(()=>{getTodos()}, []);

 const submit = async () => {
  setTodo('');
  await trcp.addTodo.mutate({text: todo});
  getTodos();
 }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-5xl text-center font-bold">Caveman Todo</h1>
      <input type="text" placeholder="Add a task..." className="input input-bordered w-full"  onKeyUp={e => {if(e.key === 'Enter') {submit();}} } onChange={e => setTodo(e.target.value)} value={todo} />
      <div>
        <table className="table w-full">
          <tbody>
          {todos?.map((todo)=>(
            <tr key={todo.id}>
              <th>{todo.id}</th>
              <td>{todo.text}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
