import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNode, deleteNode, renameNodeAction, setSearch, clearError } from '../features/filesSlice';
import Modal from './Modal';

export default function Toolbar() {
    const dispatch = useDispatch();
    const selectedId = useSelector(s => s.files.selectedId) || 'root';
    const [showCreate, setShowCreate] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [type, setType] = useState('folder');
    const [name, setName] = useState('');
    const [renameTo, setRenameTo] = useState('');
    const error = useSelector(s => s.files.error);

    const handleCreate = () => {
        if (!name.trim()) {
            alert('Name required');
            return;
        }
        const id = `${type}-${Date.now()}`;
        const node = { id, type, name: name.trim() };
        if (type === 'folder') node.children = [];
        else node.content = '';


        dispatch(createNode({ parentId: selectedId, node }));
        setShowCreate(false);
        setName('');
    };


    const handleDelete = () => {
        if (!selectedId) return alert('Select an item to delete');
        if (selectedId === 'root') return alert('Cannot delete root');
        if (!confirm('Delete selected item?')) return;
        dispatch(deleteNode(selectedId));
    };


    const handleRename = () => {
        if (!renameTo.trim()) return alert('Name required');
        dispatch(renameNodeAction({ id: selectedId, newName: renameTo }));
        setShowRename(false);
    };

    return (
        <div className="flex items-center gap-2 p-2 border-b bg-white">
            <button onClick={() => setShowCreate(true)} className="px-2 py-1 bg-green-500 text-white rounded">New</button>
            <button onClick={() => setShowRename(true)} className="px-2 py-1 bg-yellow-400 text-white rounded">Rename</button>
            <button onClick={handleDelete} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>


            <div className="ml-auto flex items-center gap-2">
                <input placeholder="Search" onChange={e => dispatch(setSearch(e.target.value))} className="border rounded p-1 text-sm" />
                <button onClick={() => dispatch(clearError())} className="text-sm text-gray-500">Clear errors</button>
            </div>

            {showCreate && (
                <Modal title="Create new" onClose={() => setShowCreate(false)}>
                    <div className="mb-2">
                        <label className="block text-sm">Type</label>
                        <select value={type} onChange={e => setType(e.target.value)} className="border rounded p-1 w-full">
                            <option value="folder">Folder</option>
                            <option value="file">File</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm">Name</label>
                        <input className="border rounded p-1 w-full" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setShowCreate(false)} className="px-3 py-1">Cancel</button>
                        <button onClick={handleCreate} className="px-3 py-1 bg-blue-600 text-white rounded">Create</button>
                    </div>
                    {error && <div className="text-red-600 mt-2">{error}</div>}
                </Modal>
            )}
            {showRename && (
                <Modal title="Rename" onClose={() => setShowRename(false)}>
                    <div className="mb-2">
                        <label className="block text-sm">New name</label>
                        <input className="border rounded p-1 w-full" value={renameTo} onChange={e => setRenameTo(e.target.value)} />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setShowRename(false)} className="px-3 py-1">Cancel</button>
                        <button onClick={handleRename} className="px-3 py-1 bg-blue-600 text-white rounded">Rename</button>
                    </div>
                    {error && <div className="text-red-600 mt-2">{error}</div>}
                </Modal>
            )}
        </div>
    )
}
