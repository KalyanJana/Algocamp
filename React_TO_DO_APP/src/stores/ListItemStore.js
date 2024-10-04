
import {create} from 'zustand'

//state value of the store
const useListItemStore = create((set)=>({
    listItems : [],

    setListItem: (list) => {
        set((state) => {
            return {
                ...state,
                listItems:  [...state.listItems, list], 
            }
        });
    },

    deleteListItem: (id)=>{
        set(state =>{
            return {
                ...state,
                listItems: state.listItems.filter(item => item.id != id)
            }
        })
    },
    completedListItem: (id)=>{
        set(state =>{
            return {
                ...state,
                listItems: state.listItems.map(item => {
                    if(item.id == id){
                        const updatedItem = {...item, completed : !item.completed }
                        console.log(updatedItem)
                        return updatedItem;
                    }
                    return item;
                })
            }
        })
    },
    editListItem: (id, editValue)=>{
        set(state =>{
            return {
                ...state,
                listItems: state.listItems.map(item => {
                    if(item.id == id){
                        const updatedItem = {...item, value : editValue }
                        return updatedItem;
                    }
                    return item;
                })
            }
        })
    }
    
}));

export default useListItemStore;