
import './App.css';
import Todotasks from './Components/Todotask';
import Todonetasks from './Components/Todonetask';
import {  useCallback, useRef, useState } from 'react';

const App = () => {

    // state = {
    //   todotasks : [],
    //   todonetasks : [{task:'cringe',id:'11'},{task:'koba',id:'22'}],
    //   inputtask : '',
    // }
    
    const [todotasks,settodotasks] = useState([])
    const [todonetasks,settodonetasks] = useState([])
    const [inputtask,setinputtask] = useState('')
    // const [users,setusers] = useState([])
    // const [todoid,settodoid] = useState(1)

    // useEffect(() => {
    //   fetch(`https://jsonplaceholder.typicode.com/todos/${todoid}`)
    //   .then(data => data.json())
    //   .then(res => {
    //     setusers([res])
    //   })
    //   .catch(err => console.log(err))
    // },[todoid])

    // const changeuser = () => {
    //   settodoid((prevtodoid) => prevtodoid + 1)
    // }

    const inputref = useRef(null)
    

   const onchange = (event) => {
      const value = event.target.value
      setinputtask(value)  
    }

    const addtask = (event) => {

      event.preventDefault()

      if(inputtask === ''){
        alert('type task')
        return
        
      }
       
     const newtask = {
      task:inputtask,
      id:todotasks.length + 1
     }

     settodotasks((prevtodotasks) => ([...prevtodotasks,newtask]))
     setinputtask('')
    }


  //  const alreadydone = (id) => {
  //   const donetask = todotasks.find((e) => e.id === id)
  //   const donetaskuser = {
  //     task:donetask.task,
  //     id:todonetasks.length + 1
  //   }

  //   settodotasks((prevtodotasks) => prevtodotasks.filter((e) => e.id !== id))
  //   settodonetasks([...todonetasks,donetaskuser])
  //  }

  const alreadydone = useCallback((id) => {
    const donetask = todotasks.find((e) => e.id === id)
    const donetaskuser = {
      task:donetask.task,
      id:todonetasks.length + 1
    }

    settodotasks((prevtodotasks) => prevtodotasks.filter((e) => e.id !== id))
    settodonetasks([...todonetasks,donetaskuser])
  }, [todotasks])

 
    const  backtodo = useCallback((id) => {
      const tobacktask = todonetasks.find((e) => e.id === id)
      const tobacktask2 = {
        task:tobacktask.task,
        id:todotasks.length + 1
      }

      settodonetasks(todonetasks.filter((e) => e.id !== id))
      settodotasks([...todotasks,tobacktask2]) 
    },[todonetasks])

    
    const removetask = useCallback((id) => {
      settodonetasks(todonetasks.filter((e) => e.id !== id))
    }, [])


    const focus = () => {
      inputref.current.focus()
    }

    return (
      <div className="App">
        <div className='main'>

          {/* {users.map((k) => 
            <div key={k.id}>
              {k.title}
            </div>
          )} */}

          <button onClick={focus} >focus on input</button>
          

          <div className='forinput'>
            <h1>TYPE NEW TASK</h1>
            <input ref={inputref} type="text" placeholder='new task' onChange={onchange} value={inputtask}/>
            <button className='btn' onClick={addtask} >click</button>
          </div>
            {/* <button onClick={changeuser}>change user</button> */}
          <div className='boxes'>

           
            <div className='todobox box'>
            <h1>TO DO LIST</h1>
            {todotasks.map(e => 
              <Todotasks key={e.id} task={e.task} id={e.id} action={alreadydone}/>
            )}
          </div> 
           

            <div className='donebox box'>
              <h1>DONE LIST</h1>
              {todonetasks.map(e => 
                <Todonetasks key={e.id} task={e.task} id={e.id} action={backtodo} action2={removetask}/>
              )}
            </div>


          </div>


        </div>
      </div>
    );

  
}

export default App;
