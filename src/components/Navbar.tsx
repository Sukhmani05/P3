// import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Settings, User } from 'lucide-react';
export function Navbar() {
  return <header className="bg-card-bg border-b border-card-border">
      <div className="flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          
          <span className="font-bold text-xl">osto</span>
          <span className="text-sm px-2 py-0.5 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple">
            AI-SPM
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-card-border transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-card-border transition-colors">
            <Settings size={20} />
          </button>
          <div className="flex items-center gap-2 ml-4">
            <div className="bg-card-border rounded-full w-8 h-8 flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="text-sm font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>;
}