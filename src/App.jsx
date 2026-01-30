import yellowBlob from './assets/yellow.svg'
import blueBlob from './assets/blue.svg'


export default function App(){

  function handleStart(){
    
  }
  return (
    <main>
      <img className="blob yellow-blob" src={yellowBlob} aria-hidden="true"></img>
      <img className="blob blue-blob" src={blueBlob} aria-hidden="true"></img>
      <h1>Quizzical</h1>
      <button onClick={handleStart}>Start quiz</button>
    </main>
    

  )
}