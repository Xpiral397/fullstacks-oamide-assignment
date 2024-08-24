

import React, {useState, useEffect} from 'react';
import {useData} from '../context/dataContext';




const Editor=({text, onUpdate, item}) => {
    const [isEditing, setIsEditing]=useState(false);
    const [value, setValue]=useState(text);

    const handleDoubleClick=() => {
        setIsEditing(true);

    };

    const handleBlur=() => {
        setIsEditing(false);
        onUpdate(
            {
                id: item.id,
                name: value,
                depth: item.depth,
                parent: item.parent,
                children: item.chidren
            }

        )
    };

    const handleChange=(e) => {
        setValue(e.target.value);
    };

    const handleKeyDown=(e) => {
        if(e.key==="Enter") {
            handleBlur();
        }
    };

    return (
        <div>
            {isEditing? (
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="bg-red-200 z-30 text-white  rounded-sm p-1 focus:outline-none"
                />
            ):(
                <span onDoubleClick={handleDoubleClick} className="cursor-pointer">
                    {value}
                </span>
            )}
        </div>
    );
};


const calculateDepthAndLength=(item, depth=0) => {
    if(!item.children||item.children.length===0) {
        return {depth, lineLength: 20}; // Base line length for items with no children
    }

    let maxDepth=depth;
    let totalChildren=item.children.length;

    item.children.forEach(child => {
        const childResult=calculateDepthAndLength(child, depth+1);
        maxDepth=Math.max(maxDepth, childResult.depth);
        totalChildren+=childResult.totalChildren; // Accumulate children count
    });

    // Determine line length based on depth and number of children
    const baseLength=20;
    const lineLength=baseLength+maxDepth*10+totalChildren*5;

    return {depth: maxDepth, lineLength, totalChildren};
};




const ListItem=({item, onUpdate}) => {
    const {setSelectedItem, setData, data, collapseAll, expandAll, setCollapseAll, setExpandAll}=useData()

    const [timeoutId, setTimeoutId]=useState(null);
    const [open, setOpen]=useState({})
    const [show, setshow]=useState('')

    useEffect(() => {
        try {
            const data=JSON.parse(localStorage.getItem('data')??"{}")
            setOpen(data)
        }
        catch(e) {
            console.log(expandAll)
        }
    }, [expandAll, show, collapseAll, data]);



    // Dynamically set CSS variable for depth-based styling

    // Calculate depth and line length
    const {depth, lineLength}=calculateDepthAndLength(item);
    console.log(depth)

    // Set CSS variable dynamically
    const depthLineLeft=`var(--depth-${depth}-line)`;
    const lineLengthStyle={width: `${lineLength}px`};
    const handleMouseEnter=(id) => {
        clearTimeout(timeoutId);
        setshow(id);
    };
    const setOpenUpdate=(id) => {
        const detailsElement=document.getElementById(id);

        if(detailsElement) {
            const isOpen=detailsElement.open;  // Get the current open state of the element

            // Update the state to reflect the open status of the details element
            setOpen((prevOpen) => {
                const newOpenState={...prevOpen, [id]: isOpen};
                localStorage.setItem('data', JSON.stringify(newOpenState));  // Save the correct state (true or false)
                return newOpenState;

            });

            console.log('done', {...open, [id]: isOpen}, id, detailsElement.open, open);
        }
    };


    const handleMouseLeave=(e) => {
        // Check if mouse is leaving the parent, not just moving to a child
        const parentElement=e.currentTarget;
        const relatedTarget=e.relatedTarget;


    };



    return (
        <li className={`lst depth-${item.depth}`} style={{'--depth-line-left': depthLineLeft}}>
            <details className='lst' id={item.id} open={expandAll? true:collapseAll? false:(open?.[item.id]??false)} onToggle={() => setOpenUpdate(item.id)}
            >
                <summary className='z-10 relative flex space-x-5  w-[2rem] items-center' onClick={() => {setSelectedItem(item)}}>

                    <div className='items-center flex space-x-3 relative'>
                        <svg className={`${item.children.length? 'block':'hidden'} ${open?.[item.id]? 'rotate-0':'rotate-90'} transition-transform duration-300`} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="26" height="26" rx="13" fill="white" />
                            <path d="M9.5 11.25L13 14.75L16.5 11.25" stroke="#101828" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {
                            !item?.children?.length? <Editor text={item.name} onUpdate={onUpdate} item={item} />:<div className='w-full h-full' onMouseEnter={() => handleMouseEnter(item.id)} onClick={() => {setSelectedItem(item)}}>{item.name}</div>
                        }


                    </div>
                </summary>
                {item?.children?.length? <div className={'opacity-0 hover:opacity-100 absolute -mt-[1.8rem] mx-7 w-[8em]  flex justify-end z-30'} >
                    <div onClick={() => {
                        const addNewChildToItem=(selectedItem) => {
                            if(selectedItem) {
                                const newChild={
                                    id: `child-${Date.now()}`, // Generate a unique ID
                                    name: 'New Child',
                                    depth: (selectedItem.depth||0)+1,
                                    parent: selectedItem.id,
                                    children: []
                                };

                                // Recursive function to add the new child to the correct item
                                const addChildToItem=(items) => {
                                    return items.map(item => {
                                        if(item.id===selectedItem.id) {
                                            return {
                                                ...item,
                                                children: [...item.children, newChild]
                                            };
                                        }
                                        // Recursively update children
                                        return {
                                            ...item,
                                            children: addChildToItem(item.children)
                                        };
                                    });
                                };

                                // Update the data with the new child added
                                const updatedData=addChildToItem(data);

                                // Set the updated data
                                setData(updatedData);
                                console.log(updatedData, 'Updated Data');
                            }
                        };

                        // Usage example
                        addNewChildToItem(item);
                    }}>
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="26" height="26" rx="13" fill="#253BFF" />
                            <path d="M13 8.91667V17.0833M8.91666 13H17.0833" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>:''
                }
                {/* {!isCollapsed&&item.children&&item.children.length>0&&( */}
                <ul className='lst tree'>
                    {item.children.map(child => (
                        <ListItem key={child.id} item={child} onUpdate={onUpdate} />
                    ))}
                </ul>
                {/* )} */}
            </details>
        </li>
    );
};

const MenuList=({data, expandAll, onUpdate}) => {
    // const maxDepth=getMaxDepth({children: data});
    console.log(data, 'Lop')
    return (
        <div className='relative lst'>
            <ul className='lst'>
                {data?.map(item => (
                    <ListItem expandAll={expandAll} key={item.id} item={item} onUpdate={onUpdate} />
                ))}
            </ul>
        </div>
    );
};


// import React, {useEffect} from 'react';
// import {useData} from '../context/dataContext'; // Adjust the path according to your setup

const App=({expandAll, collapseAll, setCollapseAll, setExpandAll}) => {
    console.log(expandAll, 'kop')
    const {data, setData}=useData();



    const updateMenu=({id, name, depth, parent}) => {
        setData(prevMenus => {
            const updateMenuRecursive=(menus) => {
                return menus
                    .map(menu => {
                        if(menu.id===id) {
                            if(!name) {
                                // If name is empty, remove the current node
                                return null;
                            }
                            // Update the menu item with new values
                            return {
                                ...menu,
                                name: name||menu.name,
                                depth: depth||menu.depth,
                                parent: parent||menu.parent
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

    return (
        <div className="App">
            <MenuList data={data} onUpdate={updateMenu} />
        </div>
    );
};

// export default App;
;

export default App;
