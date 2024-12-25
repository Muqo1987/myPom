function Logo(props){
    return(
        <>
        <div id='logo' className='absolute left-[2%] select-none'>
        <span id="timerMove"  onMouseDown={()=>{props.grab("logo")}} onMouseUp={()=>{props.put()}} onTouchEnd={()=>props.put()}  onTouchStart={()=>props.grab("logo")}  className='w-[32px] move select-none absolute top-[0px] right-[-35px] bg-slate-300 bg-opacity-40 p-1 ease-in-out origin-bottom-left duration-150 rounded-full cursor-grab active:cursor-grabbing'><img className='pointer-events-none' src={props.icon} alt="" /></span>
            <span id="title" className = 'text-white text-[96px] font-thin' >{props.logoText}</span>
        </div>
        </>
    );
}
export default Logo;