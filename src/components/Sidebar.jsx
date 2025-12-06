import React from 'react';
import { useSelector } from 'react-redux';
import FileNode from './FileNode';


export default function Sidebar() {
    const fs = useSelector(s => s.files.fs);


    return (
        <aside className="w-64 bg-white border-r overflow-auto">
            <div className="p-3 font-semibold">Files</div>
            <div className="p-2">
                <FileNode node={fs} />
            </div>
        </aside>
    );
}