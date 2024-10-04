import useListItemStore from "../stores/ListItemStore";
import Button from "./Button";

function FilterItem({filterItems}){

    const {listItems} = useListItemStore()

    function filterAllHandler(){
        filterItems(listItems)
    }
    function filterCompletedHandler(){
        const completedItems = listItems.filter(item => item.completed)
        filterItems(completedItems)
    }
    function filterPendingHandler(){
        const pendingItems = listItems.filter(item => !item.completed)
        filterItems(pendingItems)
    }

    return (
        <div>
            <Button className="filterBtn" text="All" data-filter="all" onClickHandler={filterAllHandler} />
            <Button className="filterBtn" text="Completed" data-filter="completed" onClickHandler={filterCompletedHandler} />
            <Button className="filterBtn" text="pending" data-filter="pending" onClickHandler={filterPendingHandler} />
      </div>
    )
}

export default FilterItem;