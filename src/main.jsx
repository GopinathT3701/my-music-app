import {  StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import MusicApp from './MusicApp.jsx'




function Facebook() {

const carinfo ={};


const showinfo =carinfo.brand!== undefined && carinfo.color !== undefined

const carlist=[
  {brand:"BMW",color:"Red"},
  {brand:"Audi",color:"Black"},
  {brand:"Mercedes",color:"White"},
  {brand:"Toyota",color:"Blue"}
];


const numberinfo=[
  1,2,3,4,5
]
  return(
    <>
    { showinfo ? 
   <Garage carinfo={carinfo}/> :null }
<ul>
  {carlist.map((carinfo) => <li key={carinfo.brand}> <Garage carinfo={carinfo}/> </li>
  )}
</ul>
<ul>
  {numberinfo.map((e,index) => <p key={index}>{e}</p> )}


</ul>
</>
  )
}

createRoot(document.getElementById('root')).render(
  
   <MusicApp/>
  
)

