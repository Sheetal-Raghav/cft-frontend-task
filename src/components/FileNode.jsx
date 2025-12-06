import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleExpand, setSelected } from '../features/filesSlice';
import clsx from 'clsx';


function Icon({ node }) {
    if (node.type === 'folder') return <span className="mr-2">📁</span>;
    return <span className="mr-2">📄</span>;
}


export default function FileNode({ node, level = 0 }) {
    const dispatch = useDispatch();
    const expanded = useSelector(s => s.files.expanded);
    const selected = useSelector(s => s.files.selectedId);


    const isExpanded = expanded[node.id];


    const handleToggle = (e) => {
        e.stopPropagation();
        if (node.type === 'folder') dispatch(toggleExpand(node.id));
        else dispatch(setSelected(node.id));
    };

    return (
        <div>
            <div
                className={clsx('flex items-center cursor-pointer select-none p-1 rounded', {
                    'bg-blue-100': selected === node.id,
                    'hover:bg-gray-100': selected !== node.id
                })}
                style={{ paddingLeft: `${8 + level * 12}px` }}
                onClick={handleToggle}
            >
                <Icon node={node} />
                <div className="flex-1 text-sm truncate">{node.name}</div>
                {node.type === 'folder' && (
                    <button onClick={(e) => { e.stopPropagation(); dispatch(toggleExpand(node.id)); }} className="text-xs ml-2">{isExpanded ? '▾' : '▸'}</button>
                )}
            </div>


            {node.children && isExpanded && (
                <div>
                    {node.children.map(child => (
                        <FileNode key={child.id} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}