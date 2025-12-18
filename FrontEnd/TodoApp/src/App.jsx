import axios from 'axios'
import React, { useEffect, useState } from 'react'

function App() {
  const [data, setIt] = useState([])
  const [inputText, setInputText] = useState('')
  const [editMode, setMode] = useState(null)

  const upEditTask = (task)=> {
      setInputText(task.text)
      setMode(task._id)
    }
  
  const fetchTodos = () => {
    axios.get('/all')
      .then((res) => {
        setIt(res.data.todoID)
      }).catch((err) => console.log(err))
    }

  useEffect(() => {
      fetchTodos()
    }, [])

    const handleSubmit = async(a)=>{
      a.preventDefault()
      if(editMode !==null){
        hadnleUpdate();
      } else {
        handleAddTodo();
      }
    }

    const handleAddTodo = async () => {
    // e.preventDefault() 
    if (!inputText) return 

    try {
      const res = await axios.post('http://localhost:3400/create', {
        text: inputText
      })
      setIt([...data, res.data.newTodo])
      setInputText('')
    } catch (error) {
      console.log("Error adding todo:", error)
    }
  }

  const hadnleUpdate = async()=>{
    if(!inputText || !editMode) return
    try {
      await axios.put(`http://localhost:3400/update/${editMode}`,{
        text: inputText
      })
      setIt(Prev => Prev.map((item)=> item._id === editMode ? {...item, text:inputText} : item))
      setMode(null)
      setInputText('')
    } catch (error) {
      console.log(error);
      
    }
  }

console.log(data);
 
async function delTask(id) {
      await axios.delete(`http://localhost:3400/delete/${id}`,)
      const newData = data.filter((dId)=> dId._id != id)
      setIt(newData)
    }
    
async function upTask(id, currState) {
      let newState = !currState
      try {
        const upDated = data.map((item)=>{
          if(item._id === id){
            return {...item, todoStatus: newState}
          }
          return item
        })
        
        setIt(upDated)
        await axios.put(`http://localhost:3400/update/${id}`,{
          todoStatus: newState
        })
        // await axios.put('http://localhost:3400/update')
      } catch (error) {
        console.log(("Updation err: ", error));
        
      }
      }
    

  return (
    <div className="min-h-screen bg-gray-800 flex justify-center items-center p-5 bg-blue">
      <div className="w-full max-w-md bg-white/20 rounded-lg shadow-xl p-6">
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          My MERN Todo App
        </h1>

        {/* Create Todo Form */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
          <input
            type="text"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What needs to be done?"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            {editMode !==null ? 'Update' : 'Add'}
          </button>
        </form>

        {/* Todo List */}
        <div className="space-y-3">
          <h2 className="text-gray-500 text-sm font-medium mb-2">
            Tasks ({data.length})
          </h2>
          
          {data.length === 0 ? (
             <p className="text-center text-gray-400 mt-4">No tasks yet. Add one above!</p>
          ) : (
            data.map((it) => (
              <div 
                key={it._id} 
                className="flex justify-between items-center p-4 bg-gray-500 rounded-lg border border-gray-200 hover:shadow-sm transition"
              >
                <div className='w-full grid grid-cols-1'>
                  <div className='flex justify-around'>
                    <h2 onClick={()=> upTask(it._id, it.todoStatus)}
                    className={`text-lg w-full ${it.todoStatus ? 'line-through text-gray-300': 'text-gray-50'}`} >{it.text}</h2>
                    <span className={`text-sm ${it.todoStatus ? 'text-green-400 ' : 'text-yellow-400'}`}>{it.todoStatus ? 'Done' : 'Pending'}</span>
                  </div>

                  <div className='flex justify-end gap-4'>
                    <span className='cursor-pointer bg-red-400 transition-colors duration-200 rounded-md px-1 text-[12px] hover:bg-red-600' onClick={()=>delTask(it._id)}>Del</span>
                    <span className={`${it.todoStatus ? 'hidden': 'block'} cursor-pointer bg-blue-400 transition-colors duration-200 rounded-md px-1 text-[12px] text-center hover:bg-blue-600`} onClick={()=>hadnleUpdate(it)}>Edit</span>
                  </div>
                </div>


              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default App