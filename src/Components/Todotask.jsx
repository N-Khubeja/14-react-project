import React from "react"

const Todotasks = ({key,id,task,action}) => {

    console.log('todo',id)
    return(
        <div>
            <div className='do-one-task' key={key}> 
                  <h2>TASK:{task}</h2>
                  <h2>ID:{id}</h2>
                  <button onClick={() => action(id)}>DONE</button>
            </div>
        </div>
    )
}

export default React.memo(Todotasks)