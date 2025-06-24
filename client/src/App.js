import React from 'react';
import ExcelUpload from './ExcelUpload';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <h1 className="text-2xl font-bold mb-6">Excel Analytics Dashboard</h1>
      <ExcelUpload />
    </div>
  );
}

export default App;
