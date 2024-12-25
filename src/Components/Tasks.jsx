function Tasks(props){
    return(<>
    <div id="tasks" className='absolute bg-black bg-opacity-90 w-80 h-96 text-white left-8 top-32 rounded-3xl font-semibold p-6'>
            <span id="taskMove"  onMouseDown={()=>{props.grab("tasks")}} onMouseUp={()=>{props.put()}} onTouchEnd={()=>props.put()}  onTouchStart={()=>props.grab("tasks")}   className='move w-[32px] select-none absolute top-[0px] right-[-35px] bg-slate-300 bg-opacity-40 p-1 ease-in-out origin-bottom-left duration-150 rounded-full cursor-grab active:cursor-grabbing'><img className='pointer-events-none' src={props.icon} alt="" /></span>
            <div className='max-h-64 overflow-y-auto overflow-x-hidden scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"'>
            <span className='font-bold text-gray-700 text-sm opacity-60 '>To-Do Workflow</span>
                <ul>
                {
                    props.tasks.map(function(x){
                       if(!x.isOverline) {return <li id='x.id' className="relative overflow-hidden h-11 mt-2 text-white"> <span onClick={()=>props.deleteTask(x.id)} className='text-red-600 absolute cursor-pointer right-2 mt-[15px]'>X</span> <span onClick={()=>{props.lineThroughTask(x.id)}} className='font-semibold truncate cursor-pointer w-64 text-sm'>{x.task}</span> <br></br><span className='font-semibold pl-3 text-gray-600'>{x.duration}:00 <button onClick={()=>{props.taskStart(x.duration,x.id)}} className='pl-4 ease-linear duration-150 hover:text-slate-500'>Start</button> </span></li>}
                       else {return <li id={x.id} className="relative overflow-hidden h-11 mt-2 border-white"> <span onClick={()=>props.deleteTask(x.id)} className='text-red-600 absolute cursor-pointer right-2 mt-[15px]'>X</span> <span className='font-semibold line-through text-slate-500 truncate w-64 text-sm'>{x.task}</span> <br></br><span className='font-semibold pl-3 text-gray-600'>{x.duration}:00 <button className='pl-4 ease-linear duration-150 hover:text-slate-500'>Start</button> </span></li>}
                    })
                }
                </ul>
            </div>
            <div className='absolute bottom-6  flex flex-col'>
                <div className='flex'>
                    <input id='taskTitle' type="text" placeholder='Task' className='bg-black w-48 h-7 text-sm outline-none ease-linear duration-150 border-2 text-white font-normal pl-1 focus:border-white  border-slate-900 rounded' />
                    <input id="taskDuration" className='w-10 bg-black outline-none ease-linear duration-150 border-2 text-sm text-white font-normal  border-slate-900 rounded-md pl-1 ml-3  h-7 focus:border-white' placeholder='Min' maxLength="3" type="tel" pattern='\d*'/>
                </div>
                <button onClick={()=>{props.addTask()}} className='w-[calc(100%)] ease-in-out duration-150 mt-4 border-2 border-white rounded-lg hover:bg-white  hover:text-black'>
                    Add
                </button>
            </div>
        </div>
    </>)
}
export default Tasks;