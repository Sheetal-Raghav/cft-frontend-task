import { createSlice } from '@reduxjs/toolkit';
import mockFs from '../data/mockFs.json';
import { findNodeById, addNode, removeNode, renameNode } from '../utils/fileUtils';


const initialState = {
    fs: mockFs,
    selectedId: 'file-4',
    expanded: { 'root': true },
    searchQuery: '',
    error: null
};


const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        setSelected(state, action) {
            state.selectedId = action.payload;
            state.error = null;
        },
        toggleExpand(state, action) {
            const id = action.payload;
            state.expanded[id] = !state.expanded[id];
        },
        createNode(state, action) {
            const { parentId, node } = action.payload;
            const success = addNode(state.fs, parentId, node);
            if (!success) state.error = 'Failed to create node (parent not found).';
        },
        deleteNode(state, action) {
            const id = action.payload;
            if (id === 'root') {
                state.error = 'Cannot delete root folder.';
                return;
            }
            const success = removeNode(state.fs, id);
            if (!success) state.error = 'Failed to delete node (not found).';
            else if (state.selectedId === id) state.selectedId = null;
        },

        renameNode(state, action) {
            const { id, newName } = action.payload;
            if (!newName || !newName.trim()) {
                state.error = 'Name cannot be empty.';
                return;
            }
            const success = renameNode(state.fs, id, newName.trim());
            if (!success) state.error = 'Failed to rename (not found).';
        },
        updateFileContent(state, action) {
            const { id, content } = action.payload;
            const node = findNodeById(state.fs, id);
            if (node && node.type === 'file') node.content = content;
            else state.error = 'File not found or not a file.';
        },
        setSearch(state, action) {
            state.searchQuery = action.payload;
        },
        clearError(state) {
            state.error = null;
        }
    }
});

export const { setSelected, toggleExpand, createNode, deleteNode, renameNode: renameNodeAction, updateFileContent, setSearch, clearError } = filesSlice.actions;
export default filesSlice.reducer;