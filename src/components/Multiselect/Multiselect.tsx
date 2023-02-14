import React, { useState } from "react";

function Multiselect() {
  const [items, setItems] = useState<string[]>(["Item 1", "Item 2"]);
  const [newItem, setNewItem] = useState<string>("");
  const [selectItems, setSelectItems] = useState<string[]>([
    "Item 3",
    "Item 4",
  ]);
  const [usedSelectItems, setUsedSelectItems] = useState<string[]>([]);

  const handleItemDelete = (idx: number) => {
    if (usedSelectItems.includes(items[idx])) {
      setSelectItems((prevItems) => prevItems.concat(items[idx]));
      setUsedSelectItems((prevItems) => {
        const newItems = [...prevItems];
        newItems.splice(idx, 1);

        return newItems;
      });
    }

    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(idx, 1);

      return newItems;
    });
  };

  const addNewItem = (newItem: string) => {
    setItems((prevItems) => prevItems.concat(newItem));
  };

  const handleInputConfirmation = (e: React.KeyboardEvent) => {
    if (e.code === "Enter" || e.code === "Tab") {
      addNewItem(newItem);
      setNewItem("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewItem(e.currentTarget.value);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItem = e.currentTarget.value;

    setSelectItems((prevItems) => prevItems.filter((item) => item !== newItem));
    setUsedSelectItems((prevItems) => prevItems.concat(newItem));
    addNewItem(newItem);
  };

  return (
    <div className="w-full bg-white flex flex-wrap relative">
      {items.map((item, idx) => {
        return (
          <div
            key={idx}
            className="h-12 bg-slate-300 text-black p-2 m-2 rounded-md flex flex-wrap justify-center items-center z-10 whitespace-nowrap"
          >
            <span>{item}</span>
            <button
              onClick={() => handleItemDelete(idx)}
              className="ml-2 bg-red-400 hover:bg-red-500 focus:bg-red-300 text-red-800 p-1 rounded-lg leading-none"
            >
              X
            </button>
          </div>
        );
      })}

      <input
        type="text"
        value={newItem}
        onKeyDown={handleInputConfirmation}
        onChange={handleInputChange}
        onBlur={() => setNewItem("")}
        size={1}
        className="h-12 text-black m-2 px-2 grow z-10 focus-visible:outline-none"
      />
      <select
        className="text-white bg-white absolute w-full h-full cursor-pointer"
        onChange={handleSelectChange}
        value=""
      >
        <option value="" disabled></option>
        {selectItems.map((item, idx) => (
          <option key={idx} value={item} className="text-black">
            {item}
          </option>
        ))}
      </select>
      <div className="h-12 bg-slate-500 flex justify-center items-center m-2 px-2 z-10 pointer-events-none">
        Select
      </div>
    </div>
  );
}

export default Multiselect;
