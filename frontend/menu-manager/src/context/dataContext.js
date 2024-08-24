// src/contexts/DataProvider.js
import React, {createContext, useContext, useEffect, useState} from 'react';
import {createMenuNodes, getMenuNodes} from '../api/routes';

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r=(crypto.getRandomValues(new Uint8Array(1))[0]%16)|0;
        const v=c==='x'? r:(r&0x3)|0x8;
        return v.toString(16);
    });
}
// Create the context
const DataContext=createContext();

// Create a provider component
export default function DataProvider({children}) {
    const [data, setData]=useState([]);
    const [selectedItem, setSelectedItem]=useState(null);
    const [collapseAll, setCollapseAll]=useState(false);
    const [expandAll, setExpandAll]=useState(false);
    const [currentNode, setCurrentNode]=useState('');

    // Function to save data to localStorage
    const saveDataToLocalStorage=(data) => {
        try {
            localStorage.setItem('menuData', JSON.stringify(data));
        } catch(error) {
            console.error('Failed to save data to localStorage', error);
        }
    };

    // Function to load data from localStorage
    const loadDataFromLocalStorage=() => {
        try {
            const savedData=localStorage.getItem('menuData');
            return savedData? JSON.parse(savedData):[];
        } catch(error) {
            console.error('Failed to load data from localStorage', error);
            return [];
        }
    };

    // Function to save the current node to localStorage
    const saveCurrentNodeToLocalStorage=(node) => {
        try {
            localStorage.setItem('currentSelectedNode', JSON.stringify(node));
        } catch(error) {
            console.error('Failed to save current node to localStorage', error);
        }
    };

    // Function to load the current node from localStorage
    const loadCurrentNodeFromLocalStorage=() => {
        try {
            const savedNode=localStorage.getItem('currentSelectedNode');
            return savedNode? JSON.parse(savedNode):null;
        } catch(error) {
            console.error('Failed to load current node from localStorage', error);
            return null;
        }
    };

    const addNewRootNode=async () => {
        const newRootNode={
            id: generateUUID(),
            name: 'New Root Node',
            depth: 0,  // Root node has depth 0
            parent: null,  // Root nodes have no parent
            children: []
        };
        console.log('newRoot', newRootNode)

        try {
            // const createdNode=await createMenuNodes([newRootNode]);
            setData(prevData => [...prevData, createdNode]);
        } catch(error) {
            console.error('Error adding new root node:', error);
        }
    };

    const addNewNodeToRootIfSelectedIsNumber=async () => {
        if(!selectedItem) return;

        const newNode={
            id: generateUUID(),
            name: 'Click to edit',
            depth: selectedItem.depth+1,
            parent: selectedItem.id,
            children: []
        };

        if(!selectedItem.id) {
            return;
        }


        const updatedData=[...data, newNode];
        try {
            const createdNodes=await createMenuNodes(updatedData);
            setData(createdNodes);
        } catch(error) {
            console.error('Error adding new node to root:', error);
        }
    };

    const addNewChildToSelectedNode=async () => {
        if(!selectedItem) return;

        console.log('proud', selectedItem)
        const newChildNode={
            id: generateUUID(),
            name: 'DoubleClick to edit',
            depth: selectedItem.depth+1,
            parent: selectedItem.id,
            children: []
        };

        const addChild=(items) => {
            return items.map(item => {
                if(item.id===selectedItem.id) {
                    return {
                        ...item,
                        children: [...item.children, newChildNode]
                    };
                }
                return {
                    ...item,
                    children: addChild(item.children)
                };
            });
        };

        const updatedData=addChild(data);
        try {
            const createdNodes=await createMenuNodes(updatedData);
            setData(createdNodes);
        } catch(error) {
            console.error('Error adding new child node:', error);
        }
    };

    const deleteNode=async () => {
        if(!selectedItem) return;

        const removeNode=(items) => {
            return items.reduce((acc, item) => {
                if(item.id===selectedItem.id) {
                    return acc;
                } else {
                    return [...acc, {
                        ...item,
                        children: removeNode(item.children)
                    }];
                }
            }, []);
        };

        const updatedData=removeNode(data);
        try {
            await createMenuNodes(updatedData); // Update backend
            setData(updatedData);
            setSelectedItem(null);
            localStorage.removeItem('currentSelectedNode');
        } catch(error) {
            console.error('Error deleting node:', error);
        }
    };

    // Function to initialize data and current node
    const initializeDataAndNode=async () => {
        const initialData=loadDataFromLocalStorage();
        if(initialData.length>0) {
            setData(initialData);
            const currentNode=loadCurrentNodeFromLocalStorage();
            if(currentNode) {
                setSelectedItem(currentNode);
                setCurrentNode(currentNode);
            } else {
                // Select the first root node if no current node is saved
                const firstRootNode=initialData.find(node => node.depth===0);
                if(firstRootNode) {
                    setSelectedItem(firstRootNode);
                    setCurrentNode(firstRootNode);
                    saveCurrentNodeToLocalStorage(firstRootNode);
                }
            }
        } else {
            // Fetch initial data from the API
            try {
                const fetchedData=await getMenuNodes();
                setData(fetchedData);
                saveDataToLocalStorage(fetchedData);

                // Set the first root node as the selected item
                const firstRootNode=fetchedData.find(node => node.depth===0);
                if(firstRootNode) {
                    setSelectedItem(firstRootNode);
                    saveCurrentNodeToLocalStorage(firstRootNode);
                }
            } catch(error) {
                console.error('Error fetching initial data:', error);
            }
        }
    };

    useEffect(() => {
        initializeDataAndNode();
    }, []);

    useEffect(async () => {
        if(data) {

            createMenuNodes(data)
            const res=await getMenuNodes()
            setData(res)
            saveDataToLocalStorage(res);
        }
    }, [data]);

    return (
        <DataContext.Provider value={{
            data,
            setData,
            expandAll,
            collapseAll,
            addNewRootNode,
            currentNode,
            setCurrentNode,
            setCollapseAll,
            setExpandAll,
            deleteNode,
            addNewNodeToRootIfSelectedIsNumber,
            addNewChildToSelectedNode,
            selectedItem,
            setSelectedItem,
            saveCurrentNodeToLocalStorage,
            loadCurrentNodeFromLocalStorage
        }}>
            {children}
        </DataContext.Provider>
    );
}

// Custom hook to use the data context
export const useData=() => {
    return useContext(DataContext);
};
