import { LayoutDashboard, Receipt, BarChart3, User, LogOut } from 'lucide-react';

export default function Sidebar({ isOpen, onClose, currentPage, onNavigate, onLogout, userName }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'account', label: 'My Account', icon: User },
  ];

  const handleNavigate = (pageId) => {
    onNavigate(pageId);
    onClose(); // Close sidebar when navigating
  };

  return (
    <>
      {/* Overlay - shows when sidebar is open, covers entire screen */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar - slides in from left, overlays content */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t border-gray-200">
            {userName && (
              <div className="mb-3 px-4 py-2 text-sm text-gray-600">
                <p className="font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">Signed in</p>
              </div>
            )}
            <button
              onClick={() => {
                onLogout();
                onClose(); // Close sidebar on logout
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

