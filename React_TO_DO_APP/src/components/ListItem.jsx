import { memo, useEffect, useState } from "react";
import useListItemStore from "../stores/ListItemStore";
import Button from "./Button";
import FilterItem from "./FilterItem";

function ListItem({ classname, setEditingItem }) {

  const { listItems, deleteListItem, completedListItem } = useListItemStore();
  const [items, setItems] = useState(listItems);

  useEffect(()=>{
    setItems(listItems)
  }, [listItems])


  function editHandler(item){
    setEditingItem(item)
  }

  function deleteHandler(id){
    deleteListItem(id)
  }
  
  function completedHandler(id){
    completedListItem(id)
  }

  return (
    <>
      <FilterItem filterItems={setItems}/>

      <ul clasName={classname}>
        {items.length > 0 ? (
          items.map((item) => {
            return (
              <li key={item.id} >
                <div className={item.completed ? 'completed' : ""}>{item.value}</div>
                <div className="todoButtons">
                  <Button 
                    className="editBtn" 
                    text="edit" 
                    data-filter="all" 
                    onClickHandler={()=>editHandler(item)} 
                  />
                  <Button
                    className="deleteBtn"
                    text="delete"
                    data-filter="completed"
                    onClickHandler={()=>deleteHandler(item.id)}
                  />
                  <Button
                    className="completeBtn"
                    text="completed"
                    data-filter="pending"
                    onClickHandler={()=>completedHandler(item.id)}
                  />
                </div>
              </li>
            );
          })
        ) : (
          <p>No items in the list!</p>
        )}
      </ul>
    </>
  );
}

export default memo(ListItem);
