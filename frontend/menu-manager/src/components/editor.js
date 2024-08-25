import React, {useState, useEffect, useRef} from 'react';
import {useData} from '../context/dataContext'; // Adjust the path according to your setup

export default function Editor() {
    const {setData, data, selectedItem, setSelectedItem}=useData();

    // Refs to access input values
    const [showTooltip, setShowTooltip]=useState(false);

    // Ref for the input element (if needed for future manipulation)
    const newDataRef=useRef();

    // 2. Function to handle input click and show tooltip
    const handleClick=() => {
        setShowTooltip(true); // Show the tooltip

        // 3. Optionally hide the tooltip after a delay (e.g., 3 seconds)
        setTimeout(() => {
            setShowTooltip(false); // Hide the tooltip after a delay
        }, 3000);
    };
    const newParentNameRef=useRef(null);

    useEffect(() => {
        if(selectedItem) {
            newDataRef.current.value=selectedItem.name;
            newParentNameRef.current.value=findNameById(data, selectedItem.parent);
        }
    }, [selectedItem, data])

    // Function to find item by ID and return its name
    const findNameById=(data, id) => {
        const searchItems=(items) => {
            for(const item of items??[]) {
                if(item.id===id) {
                    return item.name;
                }
                if(item.children&&item.children.length>0) {
                    const foundName=searchItems(item.children);
                    if(foundName) {
                        return foundName;
                    }
                }
            }
            return null;
        };
        return searchItems(data);
    };

    // Function to update item by ID with new name
    const updateNameById=(data, id, newName, type) => {
        const updateItems=(items) => {
            return items.map((item) => {
                if(item.id===id) {
                    if(item.id===selectedItem?.id) {
                        if(type=='parent') {
                            setSelectedItem({...selectedItem, parent: newName})
                        }
                        else {
                            setSelectedItem({...selectedItem, name: newName})
                        }
                    }
                    return {
                        ...item,
                        name: newName,
                    };
                }
                if(item.children&&item.children.length>0) {
                    return {
                        ...item,
                        children: updateItems(item.children),
                    };
                }
                return item;
            });
        };
        return updateItems(data);
    };





    const updateMenu=(id, name) => {
        setData(prevMenus => {
            const updateMenuRecursive=(menus) => {
                return menus
                    .map(menu => {
                        if(menu.id!==id) {

                            if(!name) {
                                // If name is empty, remove the current node
                                return null;
                            }
                            // Update the menu item with new values

                            return {
                                ...menu,
                                name: name,

                            };
                        }

                        if(menu.children&&menu.children.length>0) {
                            // Recursively update the children if any
                            const updatedChildren=updateMenuRecursive(menu.children);
                            // Remove empty children arrays
                            if(updatedChildren.length===0) {
                                return null;
                            }
                            // Return the menu with updated children
                            return {...menu, children: updatedChildren};
                        }

                        return menu;
                    })
                    .filter(menu => menu!==null); // Remove any null values
            };

            const updatedMenus=updateMenuRecursive(prevMenus);
            return updatedMenus;
        });
    };




    // Handle saving updates for selected item and parent
    const handleSave=() => {
        const newData=newDataRef.current?.value.trim();
        const newParentName=newParentNameRef.current?.value.trim();
        if(selectedItem) {
            let updatedData=data;

            // Update selected item's name if newData is provided
            if(newData) {
                updateMenu(selectedItem.id, newData);

            }
            // Update parent's name if parent ID exists and newParentName is provided
            if(selectedItem.parent&&newParentName) {
                setData(updateNameById(data, selectedItem.parent, newParentName, 'parent'))
            }
        }
    };

    return (
        <div className="z-30 w-full flex">
            <div className="max-w-xl mx-auto w-full mt-0 space-x-1 p-1 md:p-5 rounded">
                <div className="mb-4">
                    <label className="block text-sm font-[400] text-gray-500">Menu ID</label>
                    <input
                        type="text"
                        className="w-full p-3 rounded-[16px] border-none outline-none bg-[#F9FAFB]"
                        value={selectedItem?.id||'Not Selected'}
                        disabled={!selectedItem}
                        readOnly
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-[400] text-gray-500">Depth</label>
                    <input
                        type="number"
                        className="w-1/2 p-3 border-none outline-none bg-[#EAECF0] rounded-[16px]"
                        defaultValue={selectedItem?.depth}
                        disabled={!selectedItem}
                        onChange={(e) => setSelectedItem({...selectedItem, depth: e.target.value})}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-[400] text-gray-500">Parent Data</label>
                    <input
                        type="text"
                        className="w-1/2 p-3 border-none outline-none bg-[#F9FAFB] rounded-[16px]"
                        ref={newParentNameRef}
                        defaultValue={findNameById(data, selectedItem?.parent)||''}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-[400] text-gray-500">Selected Item</label>
                    <div className="relative">
                        {/* 4. Input field with onClick handler */}
                        <input
                            type="text"
                            className="w-1/2 p-3 border-none outline-none bg-[#F9FAFB] rounded-[16px]"
                            ref={newDataRef}
                            defaultValue={selectedItem?.item}
                            placeholder={selectedItem? selectedItem.name:'None selected'}
                            readOnly={true} // Disable editing
                            onClick={handleClick} // Show tooltip on click
                        />

                        {/* 5. Tooltip displayed conditionally */}
                        {showTooltip&&(
                            <div className="absolute top-full mt-2 left-0 bg-gray-700 text-white p-2 rounded-lg shadow-lg">
                                You can't edit this. Can only edit parent child here .Please double-click on the sidebar to edit .
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex w-1/2 justify-center">
                    <button
                        onClick={handleSave}
                        className="w-full rounded-[24px] px-7 py-3 text-white bg-[#253BFF] disabled:bg-gray-300"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
