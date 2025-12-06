export const findNodeById = (node, id) => {
    if (!node) return null;
    if (node.id === id) return node;
    if (node.children) {
        for (let child of node.children) {
            const found = findNodeById(child, id);
            if (found) return found;
        }
    }
    return null;
};


export const addNode = (root, parentId, newNode) => {
    if (root.id === parentId) {
        root.children = root.children || [];
        root.children.push(newNode);
        return true;
    }
    if (root.children) {
        for (let child of root.children) {
            const added = addNode(child, parentId, newNode);
            if (added) return true;
        }
    }
    return false;
};

export const removeNode = (root, id) => {
    if (!root.children) return false;
    const idx = root.children.findIndex(c => c.id === id);
    if (idx >= 0) {
        root.children.splice(idx, 1);
        return true;
    }
    for (let child of root.children) {
        const removed = removeNode(child, id);
        if (removed) return true;
    }
    return false;
};


export const renameNode = (root, id, newName) => {
    const node = findNodeById(root, id);
    if (!node) return false;
    node.name = newName;
    return true;
};