import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-10">
      <h1 className="text-4xl font-bold text-slate-800">ReleasePilot</h1>
      <p className="text-slate-500 mt-2 font-medium">Your all-in-one release checklist tool</p>
    </header>
  );
};

export default Header;
