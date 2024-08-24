import React, {useEffect, useRef} from 'react';
import {useData} from '../context/dataContext'; // Adjust the path according to your setup

export default function Editor() {
    const {setData, data, selectedItem, setSelectedItem}=useData();

    // Refs to access input values
    const newDataRef=useRef(null);
    const newParentNameRef=useRef(null);

    useEffect(() => {
        if(selectedItem) {
            newDataRef.current.value=selectedItem.name;
            console.log(selectedItem.parent)
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
                    if(item.id===selectedItem) {
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

    // Handle saving updates for selected item and parent
    const handleSave=() => {
        const newData=newDataRef.current?.value.trim();
        const newParentName=newParentNameRef.current?.value.trim();

        if(selectedItem) {
            let updatedData=data;

            // Update selected item's name if newData is provided
            if(newData) {
                updatedData=updateNameById(updatedData, selectedItem.id, newData, 'name');
            }

            // Update parent's name if parent ID exists and newParentName is provided
            if(selectedItem.parent&&newParentName) {
                updatedData=updateNameById(updatedData, selectedItem.parent, newParentName, 'parent');
            }

            setData(updatedData); // Update data with both changes

            // // Reset input values

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
                    <input
                        type="text"
                        className="w-1/2 p-3 border-none outline-none bg-[#F9FAFB] rounded-[16px]"
                        ref={newDataRef}
                        defaulValue={selectedItem?.name||''}
                        placeholder={selectedItem? selectedItem.name:'None selected'}
                    />
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
