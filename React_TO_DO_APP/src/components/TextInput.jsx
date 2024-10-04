import { useEffect, useState } from "react";
import Button from "./Button";
import useListItemStore from "../stores/ListItemStore";

function TextInput({ type, className, placeholder, setEditingItem, editingItem}) {

  const [input, setInput] = useState("");
  const {setListItem, editListItem} = useListItemStore()

  useEffect(()=>{
    if(editingItem) setInput(editingItem.value)
  },[editingItem])

  const chagneHandler = (e) => {
    setInput(e.target.value);
  };

  function updateHandler(){
    if(editingItem) {
      editListItem(editingItem.id, input)
      setEditingItem(null)
    }else{
      const id = Math.floor(Math.random()*1000)
      const item = {
          id: id,
          value: input,
          completed: false,
      }
      setListItem(item)
    }
    setInput("") //clear the user input
  }

  return (
    <>
      <input
        type={type}
        className={className}
        placeholder={placeholder}
        value={input}
        onChange={chagneHandler}
      />
      <Button className="addTodo" text="Add Todo" onClickHandler={updateHandler} />
    </>
  );
}

export default TextInput;
