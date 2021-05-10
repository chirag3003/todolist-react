import React,{useState} from "react";

function List(props){
  let [decoration,changeDecoration] = useState("none");
  function handleClick(){
    
    props.remover(props.pos);
  }


  return <li  onClick={handleClick}>
    {props.value}
  </li>;
}

export default List;