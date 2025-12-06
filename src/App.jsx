import React from 'react';
import Sidebar from './components/Sidebar';
import FileViewer from './components/FileViewer';
import Toolbar from './components/Toolbar';


export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="bg-gray-800 text-white p-3 font-semibold">React File Explorer</div>
      <Toolbar />
      <div className="flex flex-1 h-[calc(100vh-120px)] overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <FileViewer />
        </main>
      </div>
    </div>
  );
}