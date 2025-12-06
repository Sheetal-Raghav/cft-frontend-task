import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFileContent } from '../features/filesSlice';

export default function FileViewer() {
    const dispatch = useDispatch();
    const fs = useSelector(s => s.files.fs);
    const selectedId = useSelector(s => s.files.selectedId);
    const error = useSelector(s => s.files.error);


    const findNode = (node, id) => {
        if (!node) return null;
        if (node.id === id) return node;
        if (node.children) {
            for (const c of node.children) {
                const f = findNode(c, id);
                if (f) return f;
            }
        }
        return null;
    };


    const node = selectedId ? findNode(fs, selectedId) : null;
    const [content, setContent] = useState(node?.content ?? '');
    React.useEffect(() => {
        setContent(node?.content ?? '');
    }, [selectedId]);


    if (!node) return <div className="p-4">No file selected</div>;


    if (node.type === 'folder') {
        return (
            <div className="p-4">
                <h3 className="font-semibold">{node.name}</h3>
                <div className="text-sm text-gray-600">Folder — contains {node.children?.length ?? 0} items</div>
            </div>
        );
    }


    const save = () => {
        dispatch(updateFileContent({ id: node.id, content }));
    };

    return (
        <div className="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h3 className="font-semibold">{node.name}</h3>
                    <div className="text-xs text-gray-500">Type: file</div>
                </div>
                <div>
                    <button onClick={save} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
                </div>
            </div>


            <textarea
                className="flex-1 border rounded p-2 text-sm resize-none w-full"
                value={content}
                onChange={e => setContent(e.target.value)}
            />


            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </div>
    )
}
