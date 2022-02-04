import React from "react";

function List(props){
  function handleClick(){
    
    props.remover(props.pos,props.id);
  }


  return <li  onClick={handleClick}>
    {props.value.title}
  </li>;
}

export default List;