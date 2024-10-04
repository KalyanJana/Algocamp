import { useCallback, useState } from "react";
import ListItem from "./components/ListItem";
import TextInput from "./components/TextInput";

function App() {
  const [editingItem, setEditingItem] = useState(null)


  return (
    <div className="container">
      <h1>Todo application</h1>
      <TextInput 
        type="text"
        className="todoInput"
        placeholder="Write your next todo here ..."
        setEditingItem={setEditingItem}
        editingItem={editingItem}
      />
      
      <ListItem 
        classname="todoList" 
        setEditingItem={setEditingItem}
      />
    </div>
  );
}

export default App;
