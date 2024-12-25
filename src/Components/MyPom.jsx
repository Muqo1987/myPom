import React, {useEffect, useState, useRef} from 'react'
import moveIcon from '../assets/Move/move.png'
import Logo from './Logo.jsx'
import Tasks from './Tasks.jsx'
import Settings from './Settings.jsx'
import santaHat from '../assets/Hats/santa-hat.png'
import witchHat from '../assets/Hats/witch-hat.png'
import fötrHat from '../assets/Hats/hat.png'
import graduateHat from '../assets/Hats/graduate-hat.png'
import Fez from '../assets/Hats/fes.png'
import cozyBackground from '../assets/Background/cozyBackground.jpg'
import standartSound from '../assets/Sounds/standart.mp3'
function MyPom(props) {
    const isMobile = navigator.userAgentData.mobile;
    let pos,inc;
    const [sound,setSound] = useState(new Audio(standartSound))
    const [imageSrc, setImageSrc] = useState(localStorage.getItem("savedImage") || cozyBackground);
    const [nonStop,setNonStop] = useState(false)
    const [move,setMove] = useState(true)
    const [dk,setDk] = useState(0);
    const [work,setWork] = useState("Work");
    const [finishes,setFinishes] = useState([]);
    const [minute,setMinute] = useState(1);
    const [second,setSecond] = useState(0);
    const [tasks,setTasks] = useState(JSON.parse(localStorage.getItem("Tasks")) || [{task:"Add your tasks!", id:0, duration:25, isOverline:true}]);
    const [isPomodoro,setPomodoro] = useState(false);
    const [isSetOpen,setSettings] = useState(false);
    const [isTask,setIsTask] = useState(false)
    const [hideTask,setHideTask] = useState(false)
    const [hideHat,setHideHat] = useState(false)
    const [taskID,settaskID] = useState()
    const [mode,setMode] = useState("Focus")
    const [logo,setLogo] = useState(localStorage.getItem("Title")|| "MyPom")
    const [hideTitle,setTitle] = useState(false)
    const [Hat,setHat] = useState(localStorage.getItem("Hat") || santaHat)
    const [bgCustomColor,setBgCustomColor] = useState(localStorage.getItem("BgColor") || "#000000")
    let intervalID = useRef(null);
    let intervalID2 = useRef(null);
    var x = null;
    var y = null;

    document.addEventListener('mousemove', onMouseUpdate, false);
    document.addEventListener('mouseenter', onMouseUpdate, false);
    document.addEventListener('touchstart', onTouchUpdate, false);
    document.addEventListener('touchmove', onTouchUpdate, false);
   
    useEffect(()=> {
        console.log(localStorage.getItem("tasksX"))
        let components = ["tasks","timer","logo"]
        components.map((x)=>{
            if(localStorage.getItem(x+"X")!=null){
                document.getElementById(x).style.left=localStorage.getItem(x+"X")+"px";
                document.getElementById(x).style.top=localStorage.getItem(x+"Y")+"px";
            }
        })
    },[])


function onMouseUpdate(e) {
        x = e.pageX;
        y =  e.pageY;
}
function onTouchUpdate(e){
        x = e.touches[0].pageX;
        y = e.touches[0].pageY;
}
function Grab(id){
    let element=document.getElementById(id);
    intervalID2.current = setInterval(()=>{
        element.style.left=(x-element.offsetWidth-20)+"px";
        element.style.top=(y-16)+"px";
        console.log(x)
        console.log("Tuttu")
        localStorage.setItem(id+"X",x-element.offsetWidth-20)
        localStorage.setItem(id+"Y",y-16)
    },1)
}
function Put(){
    clearInterval(intervalID2.current);
    console.log("Bıraktı")
}

    useEffect(()=> {
        intervalID.current = setInterval(() => {
            timer()                     
    }, document.hasFocus() ? 1000 : 500);
        return() => {clearInterval(intervalID.current)};

                    },[second, isPomodoro, nonStop ? mode : null, tasks ])
    function changeMinute() {
        if(!isPomodoro){
            if(mode == "Focus"){
                if(document.getElementById("focus").value>0)
                    {
                        setMinute(Math.floor(document.getElementById("focus").value))
                        setSecond(0)
                    }
            }
            if(mode == "Break"){
                if(document.getElementById("break").value>0)
                    {
                        setMinute(Math.floor(document.getElementById("break").value))
                        setSecond(0)
                    }
            }
        }
    }
    function start() {
        if(!isPomodoro){
            if(!(minute<0)){
            setPomodoro(true)
            document.getElementById("startstop").innerHTML="PAUSE"
            }
        }
        else {
            setPomodoro(false)
            document.getElementById("startstop").innerHTML="START"
        }
    }
    function stop() {
        setPomodoro(false)
    }
    function reset() {
        if(mode == "Focus"){
            setMode("Break")
            setMinute(Math.floor(document.getElementById("break").value))
            document.getElementById("mode").innerHTML="BREAK"
            if(isTask){
                lineThroughTask(taskID);
                settaskID(null)
                setIsTask(false)
            }
        }
        else{
            setMode("Focus")
            setMinute(Math.floor(document.getElementById("focus").value))
            document.getElementById("mode").innerHTML="FOCUS"
        }
        if(!nonStop){
            setPomodoro(false)
            document.getElementById("startstop").innerHTML="START"
        }
        setSecond(0)
        sound.play();
    }
    function timeFormat() {
        let dakika = String(minute).padStart(2,"0")
        let saniye = String(second).padStart(2,"0")

        document.title = "MyPom | "+ dakika+":"+saniye;
        return dakika+":"+saniye
    }
    function timer() {
        if(!move){
            setPomodoro(false)
            document.getElementById("startstop").innerHTML="START"
        }
        if(isPomodoro){
            if(!second<=0){
                setSecond(second-1)
            }
            else if(minute!=0)
                {setSecond(59);setMinute(minute-1)}
            else{
                reset();
            }
        }
    }
    function openSettings(){
        if(isSetOpen) {
            setSettings(false);
            document.getElementById("settings").style.right=-256+"px";
        }
        else {
            setSettings(true);
            document.getElementById("settings").style.right=0;
        }
    }
    function timerMovable(){
        let moveButtons = document.querySelectorAll("#timerMove, #taskMove");
        if(move){
             for(let i = 0; i<moveButtons.length;i++)
             {
                moveButtons[i].style.transform="scale(1)"
             }
             setMove(false);
        }
        else {
            for(let i = 0; i<moveButtons.length;i++)
                {
                   moveButtons[i].style.transform="scale(0)"
                }
            setMove(true);
        }
    }
    function deleteTask(id){
        let array = tasks.filter(x => x.id != id);
        console.log(array)
        setTasks(array)
        localStorage.setItem("Tasks",JSON.stringify(array))
    }
    function lineThroughTask(id){
        let array = tasks.map((x)=>{
            if(x.id == id) return {task:x.task, duration:x.duration, id:x.id, isOverline:true}
            else return x
        })
        setTasks(array)
        localStorage.setItem("Tasks",JSON.stringify(array))
    }
    function addTask(){
        let array = tasks
        setTasks([...tasks,{task:document.getElementById("taskTitle").value,id:array.length, duration:document.getElementById("taskDuration").value, isOverline:false}])
        localStorage.setItem("Tasks",JSON.stringify([...tasks,{task:document.getElementById("taskTitle").value,id:array.length, duration:document.getElementById("taskDuration").value, isOverline:false}]))
    }
    function taskStart(duration,id){
        if(mode == "Focus")
        {
            if(!isTask)setMinute(duration);
            setIsTask(true)
            settaskID(id)
            start()
        }
    }
    function hideComponent(control,name){
        console.log(control ,name)
        if(control){
            console.log("aa")
            switch(name){
            case "logo":setTitle(false)
                break;
            case "tasks":setHideTask(false)
                break;
            case "hat":setHideHat(false)
                break;
            }
        }
        else{
            console.log("aaa")
            switch(name){
                case "logo":setTitle(true)
                    break;
                case "tasks":setHideTask(true)
                    break;
                case "hat":setHideHat(true)
                    break;
                }
        }
    }
    function selectHat(){
        if(Hat==santaHat){
            localStorage.setItem("Hat",Hat);
            return <img className='absolute w-20 left-[-10px] top-6' src={Hat} alt="" />
        } else if(Hat == witchHat)
        {
            localStorage.setItem("Hat",Hat);
            return <img className='absolute w-20 left-[-10px] top-4' src={Hat} alt="" />
        } else if(Hat == fötrHat)
            {
                localStorage.setItem("Hat",Hat);
                return <img className='absolute w-[72px] left-[0px] top-4' src={Hat} alt="" />
            }
        else if(Hat == graduateHat)
            {
                localStorage.setItem("Hat",Hat);
                return <img className='absolute w-[80px] left-[-10px] top-4' src={Hat} alt="" />
            }
        else if(Hat == Fez)
            {
                localStorage.setItem("Hat",Hat);
                 return <img className='absolute w-[80px] left-[5px] top-[10px]' src={Hat} alt="" />
            }    
    }
    function clickHat(Hat){

    }
    return(
    <>
    <Settings setSound={setSound} hideHat={hideHat} setImageSrc={setImageSrc} setBgCustomColor={setBgCustomColor} setHideHat={setHideHat} setHat={setHat} Hat={Hat} openSettings={openSettings} changeMinute={changeMinute} nonStop={nonStop} setNonStop={setNonStop} hideComponent={hideComponent} setLogo={setLogo} timerMovable={timerMovable} hideTask={hideTask} hideTitle={hideTitle} />
    <div id="hbir" className="w-screen h-screen bg-cover bg-center bg-black bg-opacity-30" style={{backgroundImage:`url(${imageSrc})`}}>
        <div id="timer" className=' absolute  bg-opacity-40 left-[calc(50%-200px)] top-[calc(50%-100px)] p-5 w-min rounded-xl flex flex-col justify-center text-white items-center'>
            <span id="timerMove"  onMouseDown={()=>Grab("timer")} onMouseUp={()=>Put()} onTouchStart={()=>Grab("timer")} onTouchEnd={()=>Put()} className='w-[32px] move select-none absolute top-[0px] right-[-35px] bg-slate-300 bg-opacity-40 p-1 ease-in-out origin-bottom-left duration-150 rounded-full cursor-grab active:cursor-grabbing'><img className='pointer-events-none' src={moveIcon} alt="" /></span>
            <span id="mode" className='font-semibold mb-[-20px] select-none text-lg'>FOCUS</span>
            <div id="hat">
            {!hideHat && selectHat()}
            </div>
            <h1 className='text-9xl font-bold font-mono text-center select-none'>{timeFormat()}</h1>
            <div className='w-full'>
                <button id='startstop' className='p-2 text-lg font-semibold border-2 border-black w-[75%] rounded-lg ease-linear duration-150 hover:bg-black hover:text-white' onClick={start} >START</button> 
                <button onClick={reset} className='p-2 text-lg font-semibold border-2 border-black w-[20%] ml-[5%] rounded-lg ease-linear duration-150 hover:bg-black hover:text-white'>SKIP</button>
            </div>
        </div>
        {!hideTask && <Tasks icon={moveIcon} grab={Grab} put={Put} taskStart={taskStart} addTask={addTask} deleteTask={deleteTask} lineThroughTask={lineThroughTask} tasks={tasks} />}
        {!hideTitle && <Logo icon={moveIcon} grab={Grab} put={Put} logoText={logo} />}
    </div>
    </>
    );
}
export default MyPom;
