import settingsIcon from '../assets/Settings/settings.png'
import rightArrowIcon from '../assets/Settings/right-arrow.png'
import santaHat from '../assets/Hats/santa-hat.png'
import witchHat from '../assets/Hats/witch-hat.png'
import fötrHat from '../assets/Hats/hat.png'
import graduateHat from '../assets/Hats/graduate-hat.png'
import Fez from '../assets/Hats/fes.png'
import { useState } from 'react'
import studentBackground from '../assets/Background/student.jpg'
import christmasBackground from '../assets/Background/christmas.jpg'
import halloweenBackground from '../assets/Background/halloween.png'
import nationalistBackground from '../assets/Background/nationalist.jpg'
import nationalistSound from '../assets/Sounds/nationalist.mp3'
import halloweenSound from '../assets/Sounds/halloween.mp3'
import studentSound from '../assets/Sounds/student.mp3'
import christmasSound from '../assets/Sounds/christmas.mp3'
function Settings(props){
  const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          console.log(file.size);
          if(file.size/(1024*1024)>5){
            alert("Yüklemeye çalıştığınız görsel 5MB'dan büyük. Bu görselinizin localStorage ile kaydedilememiş olmasına neden olabilir.")
          }
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result;
            props.setImageSrc(base64String);
            localStorage.setItem('savedImage', base64String);
          };
          reader.readAsDataURL(file);
      }
  };
  function handleThemeChange(e){
    if(e.target.value == "student"){
      props.setHat(graduateHat);
      props.setImageSrc(studentBackground);
      props.setSound(new Audio(studentSound));
    } else if(e.target.value == "christmas"){
      props.setHat(santaHat);
      props.setImageSrc(christmasBackground);
      props.setSound(new Audio(christmasSound));
    } else if(e.target.value == "halloween"){
      props.setHat(witchHat);
      props.setImageSrc(halloweenBackground);
      props.setSound(new Audio(halloweenSound));
    } else if(e.target.value == "nationalist"){
      props.setHat(Fez);
      props.setImageSrc(nationalistBackground);
      props.setSound(new Audio(nationalistSound));
    }
  }
    return(<>
      <div className="absolute right-0 z-40">
        <img width="50" src={settingsIcon} className='bg-black p-1 ease-linear duration-300 rounded-full cursor-pointer m-6 hover:invert' onClick={()=>props.openSettings()} alt="" />
      </div>
    <div id='settings' className='absolute bg-black h-[100vh] w-[256px] ease-in-out duration-700 z-50 right-[-256px] overflow-y-auto overflow-x-hidden'>
            <div  className='text-slate-200 font-semibold w-full flex justify-center items-center h-[44px] border-b-2 border-slate-200'>
                SETTINGS
                <img className='absolute left-2 bg-black hover:invert ease-linear duration-150 rounded-full p-1 cursor-pointer' onClick={()=>{props.openSettings()}} width="28" src={rightArrowIcon} alt="" />
            </div>
            <div className='m-2 flex flex-col text-slate-400 text-sm'>
            <span className='text-gray-600 font-semibold border-b-2 border-gray-600 hover:text-gray-500 hover:border-gray-500 ease-linear duration-150'>Focus </span>
            <div className='m-2 font-semibold'>
                Minute: &nbsp;
                <input className='w-9 bg-black outline-none ease-linear duration-150 border-2 text-white font-normal  border-slate-900 rounded-md pl-1 p-1 h-[30px] focus:border-white' placeholder='Min' id="focus" maxLength="3" type="tel" pattern='\d*' defaultValue={1} onChange={()=>{props.changeMinute()}}/>
            </div>
            </div>
            <div className='m-2 flex flex-col text-slate-400 text-sm'>
            <span className='text-gray-600 font-semibold border-b-2 border-gray-600 hover:text-gray-500 hover:border-gray-500 ease-linear duration-150'>Break </span>
            <div className='m-2 font-semibold'>
                Minute: &nbsp;
                <input className='w-9 bg-black outline-none ease-linear duration-150 border-2 text-white font-normal  border-slate-900 rounded-md pl-1 p-1 h-[30px] focus:border-white' placeholder='Min' id="break" maxLength="3" type="tel" pattern='\d*' defaultValue={1} onChange={()=>{props.changeMinute()}}/>
            </div>
            </div>
            <div className='m-2 flex flex-col text-slate-400 text-sm'>
            <span className='text-gray-600 font-semibold border-b-2 border-gray-600 hover:text-gray-500 hover:border-gray-500 ease-linear duration-150'>General </span>
            <div className='m-2 flex flex-col  font-semibold'>
            <label className=''>
                <div onClick={()=>{!props.nonStop ? props.setNonStop(true) : props.setNonStop(false)}} class="inline-flex items-center">
                    <label class="flex items-center cursor-pointer relative">
                      <input type="checkbox" class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-800 checked:bg-slate-800 checked:border-slate-800" id="check" />
                      <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                      </span>
                    </label>
                </div> 
                    <span className='ml-1 select-none text-slate-600 text-sm font-semibold'>Non Stop Sessions</span>
                </label>

                <label id="moveItems" className=' mt-2'>
                <div onClick={()=>{props.timerMovable()}} class="inline-flex items-center">
                    <label class="flex items-center cursor-pointer relative">
                      <input type="checkbox" class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-800 checked:bg-slate-800 checked:border-slate-800" id="check" />
                      <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                      </span>
                    </label>
                </div> 
                    <span className='ml-1 select-none text-slate-600 text-sm font-semibold'>Move Items</span>
                </label>
                <label id="hideTasks" className=''>
                <div onClick={()=>props.hideComponent(props.hideTask,"tasks")} class="inline-flex items-center mt-2">
                    <label class="flex items-center cursor-pointer relative">
                      <input type="checkbox" class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-800 checked:bg-slate-800 checked:border-slate-800" id="check" />
                      <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                      </span>
                    </label>
                </div> 
                    <span className='ml-1 select-none text-slate-600 text-sm font-semibold'>Hide Tasks</span>
                </label>
                   <label id="hideTitle" className=''>
                <div onClick={()=>props.hideComponent(props.hideTitle,"logo")} class="inline-flex items-center mt-2">
                    <label class="flex items-center cursor-pointer relative">
                      <input type="checkbox" class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-800 checked:bg-slate-800 checked:border-slate-800" id="check" />
                      <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                      </span>
                    </label>
                </div> 
                    <span className='ml-1 select-none text-slate-600 text-sm font-semibold'>Hide Title</span>
                </label>
                <label id="hideHat" className=''>
                <div onClick={()=>props.hideComponent(props.hideHat,"hat")} class="inline-flex items-center mt-2">
                    <label class="flex items-center cursor-pointer relative">
                      <input type="checkbox" class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-800 checked:bg-slate-800 checked:border-slate-800" id="check" />
                      <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                      </span>
                    </label>
                </div> 
                    <span className='ml-1 select-none text-slate-600 text-sm font-semibold'>Hide Hat</span>
                </label>
            </div>
            <div className='m-2'>
                Change Title: <input type="text" defaultValue={"MyPom"} maxLength="16" className='focus:border-white ease-linear duration-150 p-1 outline-none border-2 border-slate-900 rounded-md bg-black ' onChange={(e)=>{props.setLogo(e.target.value);localStorage.setItem("Title",e.target.value)}} name=""  id="" />
                <br />
                Change Title Font Size: <br />
                <select onChange={(e)=>{
                  document.getElementById('title').style.fontSize = e.target.value+'px';
                }} className='focus:border-white ease-linear duration-150 p-1 outline-none border-2 border-slate-900 rounded-md bg-black ' name="" id="">
                  <option value="36">Small</option>
                  <option value="66">Medium</option>
                  <option selected value="96">Large</option>
                </select>
            </div>
          
            <div className='m-2'>
               Select Hat:
                <div className='grid grid-cols-2 gap-3 pt-3'>
                  <div className='flex justify-center items-center'>
                    <img className={`w-20 border-2 rounded-2xl p-2 ease-linear duration-300 cursor-pointer ${props.Hat == santaHat? 'border-slate-200':'border-slate-800'}`} onClick={()=>props.setHat(santaHat)} src={santaHat} alt="" />
                  </div>
                  <div className='flex justify-center items-center'>
                    <img className={`w-20 border-2 rounded-2xl p-2 ease-linear duration-300 cursor-pointer ${props.Hat == witchHat? 'border-slate-200':'border-slate-800'}`} onClick={()=>props.setHat(witchHat)} src={witchHat} alt="" />
                  </div>
                  <div className='flex justify-center items-center'>
                    <img className={`w-20 border-2 rounded-2xl p-2 bg-white ease-linear duration-300 cursor-pointer ${props.Hat == graduateHat? 'border-black':'border-white'}`} onClick={()=>props.setHat(graduateHat)} src={graduateHat} alt="" />
                  </div>
                  <div className='flex justify-center items-center'>
                    <img className={`w-20 border-2 rounded-2xl p-2 bg-white ease-linear duration-300 cursor-pointer ${props.Hat == fötrHat? 'border-black':'border-white'}`} onClick={()=>props.setHat(fötrHat)} src={fötrHat} alt="" />
                  </div>
                  <div className='flex justify-center items-center'>
                    <img className={`w-20 border-2 rounded-2xl p-2 ease-linear duration-300 cursor-pointer ${props.Hat == Fez? 'border-slate-200':'border-slate-800'}`} onClick={()=>props.setHat(Fez)} src={Fez} alt="" />
                  </div>
                </div>
            </div>
            <div>

              <div className='m-2'>
              Choose your background image:
            <input
                        type="file"
                        id="fileInput"
                        name="fileInput"
                        className="my-5 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        onChange={handleImageChange}
                    />
            </div>
            <div className='m-2'>
            Select Theme:
              <select onChange={handleThemeChange} className='focus:border-white ease-linear duration-150 p-1 outline-none border-2 border-slate-900 rounded-md bg-black ' name="" id="">
                <option value="student">Student</option>
                <option value="christmas">Christmas</option>
                <option value="halloween">Halloween</option>
                <option value="nationalist">Turkish Nationalist</option>
              </select>
            </div>
            </div>
            </div>
            
    </div>
    </>)
}
export default Settings;