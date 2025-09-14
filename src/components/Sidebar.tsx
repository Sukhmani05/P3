// import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Database, PlayCircle, FileCheck, Shield, Settings, HelpCircle } from 'lucide-react';
export function Sidebar() {
  const navItems = [{
    path: '/',
    name: 'Dashboard',
    icon: <LayoutDashboard size={20} />
  }, {
    path: '/models',
    name: 'AI Model Inventory',
    icon: <Database size={20} />
  }, {
    path: '/remediation',
    name: 'Remediation',
    icon: <PlayCircle size={20} />
  }, {
    path: '/compliance',
    name: 'Compliance',
    icon: <FileCheck size={20} />
  }, {
    path: '/red-team',
    name: 'Red Team',
    icon: <Shield size={20} />
  }];
  return <aside className="w-64 bg-card-bg border-r border-card-border hidden md:block">
      <div className="py-6 px-4">
        <nav className="space-y-1">
          {navItems.map(item => <NavLink key={item.path} to={item.path} className={({
          isActive
        }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white' : 'text-gray-300 hover:bg-card-border'}`}>
              <span className="mr-3">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </NavLink>)}
        </nav>
        <div className="mt-8 pt-8 border-t border-card-border">
          <nav className="space-y-1">
            <button className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-card-border w-full transition-colors">
              <span className="mr-3">
                <Settings size={20} />
              </span>
              <span className="font-medium">Settings</span>
            </button>
            <button className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-card-border w-full transition-colors">
              <span className="mr-3">
                <HelpCircle size={20} />
              </span>
              <span className="font-medium">Help & Support</span>
            </button>
          </nav>
        </div>
      </div>
    </aside>;
}