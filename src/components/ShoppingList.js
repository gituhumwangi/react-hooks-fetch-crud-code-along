import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
// import { set } from "msw/lib/types/context";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //Update state by passing the array of items to setState

  useEffect(()=>{
    fetch("http://localhost:4000/items")
     .then(r=>r.json())
     .then(items=>setItems(items))
  },[]
  )
 

  function handleAddItem (newItem) {
    setItems([...items, newItem])
  }


  function handleCategoryChange(category) {
    console.log(category)
    setSelectedCategory(category);
  }

  function handleDeleteItem (deletedItem) {
    // console.log("In ShoppingCart:", deletedItem)
    const updatedItems = items.filter((item)=> deletedItem.id=item.id)
    setItems(updatedItems)
    }
  

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map(item=>{
      if(item.id===updatedItem.id){
        return updatedItem
      }else{
        return item
      }
    }) 
    setItems(updatedItems)
  }

  return (
    <div className="ShoppingList">
      <ItemForm  onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item 
          key={item.id} 
          item={item} 
          onUpdateItem={handleUpdateItem} 
          onDeleteItem={handleDeleteItem} />
        ))}
      </ul>
    </div>
  );
        }

export default ShoppingList;
