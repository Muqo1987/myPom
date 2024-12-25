import MyPom from "./Components/MyPom"
import cozyBackground from './assets/Background/cozyBackground.jpg'
function App() {
 return (
    <>
  
    <img className="object-contain absolute w-screen h-screen" src={cozyBackground} alt="" />
    <div className="z-10 relative">
      <MyPom/>
    </div>
    </> 
  )
}

export default App
