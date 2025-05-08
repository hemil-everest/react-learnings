import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// returns only parent one root element
function App() {
  // return fragment is placeholder for a parent root element
  // if 2 divs in parallel as example with fragment we can return them
  return (
    <>
      <Text display="hello world"/>
      <Text display="ssup"/>
    </>
  )
}
// prop is used to add a property to a component
function Text({display}){
  return  <div>
  <p> {display}</p>
</div>
}
export default App
