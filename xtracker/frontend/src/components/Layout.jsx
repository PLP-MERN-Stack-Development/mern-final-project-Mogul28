import { useState } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

export default function Layout({ children, currentPage, onNavigate, onLogout, onAddExpense, user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar with overlay */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        currentPage={currentPage}
        onNavigate={onNavigate}
        onLogout={onLogout}
        userName={user?.name}
      />

      {/* Main Content - always full width, sidebar overlays */}
      <div className="flex flex-col w-full">
        <Header
          onAddExpense={onAddExpense}
          onMenuClick={toggleSidebar}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

