import  { useState } from "react";

function Incre(){
    const [list,setlist] =useState([]);
    const [count,setcount] = useState(1);

function addItem() {
    const Itemname = 'item ' + count;
    setlist((prevstate) => { return [...prevstate, Itemname]})
    setcount((prevstate) => { return prevstate + 1})
}


    return(
<>
<h1>List</h1>
<button onClick={addItem}>Add Item</button>

<ul>
{list.map((item, index) => (
    <li key={index}>{item}</li>
))} 
</ul>


</>



    )

}


export default Incre;