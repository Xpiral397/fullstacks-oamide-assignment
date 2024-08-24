import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {FileIcon, FourDot} from './logo'
import Editor from "./editor"
import List from './List'
import {useData} from '../context/dataContext';






const ListItem=({expandAll, collapseAll, setCollapseAll, setExpandAll}) => {
  return <List expandAll={expandAll} collapseAll={collapseAll} setCollapseAll={setCollapseAll} setExpandAll={setExpandAll} />
};



const MenuManager=() => {
  const {data, addNewRootNode, addNewNodeToRootIfSelectedIsNumber, selectedItem, currentNode, setCurrentNode, addNewChildToSelectedNode, deleteNode}=useData();

  const [selectedNode, setSelectedNode]=useState(null);
  const [lastBeforeSelection, setLastSelection]=useState(null)
  const [rootNodes, setRootNodes]=useState(null)

  useEffect(() => {
    if(data) {
      // Extract root nodes from the data
      const roots=data.filter(node => node.depth===0);
      setRootNodes(roots);
    }
  }, [data]);

  const handleSelectChange=(event) => {
    const keys=['delete-node', 'add-new-child', 'add-new-node-number', 'add-new-root', 'delete-node', 'delete-item']
    const nodeId=event.target.value;
    if(keys.includes(nodeId)) {
      console.log('here')
      handleActionChange(nodeId)
    }
    else {
      const selected=rootNodes?.find(node => node.id===nodeId);

      if(selected&&nodeId) {
        // Save selected node to localStorage
        try {
          localStorage.setItem('currentSelectedNode', JSON.stringify(selected));
          setCurrentNode(selected);
        } catch(error) {
          console.error('Failed to save selected node to localStorage', error);
        }
      }
    };
  }

  const handleActionChange=(action) => {
    switch(action) {
      case 'add-new-root':
        addNewRootNode();
        break;
      case 'add-new-node-number':
        addNewNodeToRootIfSelectedIsNumber();
        break;
      case 'add-new-child':
        addNewChildToSelectedNode();
        break;
      case 'delete-node':
        if(selectedNode) {
          deleteNode(selectedNode.id);
        }
      case 'delete-item':
        if(selectedItem) {
          deleteNode(selectedItem.id);
        }
        break;
      default:
        console.log('No action selected');
    }
    setCurrentNode(null);
  };

  return (
    <div className="w-[20rem]">
      <select
        className="w-full p-3 border-none focus:outline-none bg-slate-50"
        onChange={handleSelectChange}
        value={currentNode?.id??''}
      >
        {/* <option value="">Select Root Node</option> */}
        {rootNodes?.map(node => (
          <option key={node.id} value={node.id}>
            {node.name}
          </option>
        ))}

        <option value="">-------Action-----</option>
        <option value="add-new-root">New Menu</option>
        <option value="add-new-node-number">Swap To Menu </option>
        <option value="add-new-child">Add Child</option>
        <option value="delete-node">Delete Node</option>
        <option value="delete-item">Delete Item</option>
      </select>



    </div>
  );
};

// export default MenuManager;






const MenuPage=() => {


  const {data, setExpandAll, setCollapseAll, expandAll, collapseAll, addNewRootNode, addNewNodeToRootIfSelectedIsNumber, addNewChildToSelectedNode, deleteNode}=useData();

  return (
    <div className="flex flex-col h-full w-full  ">
      <div className="w-full md:w-[18rem] space-y-12 p-4">
        <h2 className="text-[32px] font-semibold mb-4"><FileIcon /></h2>
        <div className='mt-5 flex space-x-3 items-center'>
          <FourDot />
          <h1 className="text-[30px]  font-[800] font-jakarten">Menus</h1>
        </div>
      </div>

      <div className='flex md:flex-row flex-col  h-full w-full'>
        <div className='space-y-5 md:w-1/4'>
          <h1>Menus</h1>
          <MenuManager />
          <div className='flex justify-center  mt-3 space-x-2 w-full '>
            <button onClick={() => {
              setExpandAll(true)
              setCollapseAll(false)
            }} className={`${expandAll? "bg-[#1D2939] text-white":"bg-white text-slate-900 border"}  px-5  py-[4px] rounded-[23px] border-slate-300 w-full `}> Expand All </button>
            <button onClick={() => {localStorage.removeItem('data'); setCollapseAll(true); setExpandAll(false)}} className={`${!expandAll? "bg-[#1D2939] text-white":"bg-white text-slate-900 border"}  px-5  py-1 rounded-[23px] border-slate-300 w-full`}> Collapse All </button>
          </div>
          <div className='z-10 overflow-x-hidden oveflow-y-scroll hide h-full md:max-w-[100vh] w-full md:w-[100vh] md:max-h-[50vh] md:h-[50vh]'>
            <ListItem expandAll={expandAll} collapseAll={collapseAll} setCollapseAll={setCollapseAll} setExpandAll={setExpandAll} />
          </div>
        </div>
        <div className='flex justify-center w-full '>
          <Editor />
        </div>
      </div>


    </div>
  );
};

export default MenuPage;
