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
    <div>
      <h1>Caveman Todo</h1>
      <input type="text" placeholder="Add a task..."   onKeyUp={e => {if(e.key === 'Enter') {submit();}} } onChange={e => setTodo(e.target.value)} value={todo} />
      <div>
        <table>
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
