import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, AlertTriangle, ChevronRight } from 'lucide-react';
import { Card } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';
import { AlertBanner } from '../components/AlertBanner';
import { aiModels } from '../utils/mockData';
export function ModelInventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [environmentFilter, setEnvironmentFilter] = useState('all');
  // Filter models based on search and filters
  const filteredModels = aiModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || model.status === statusFilter;
    const matchesEnvironment = environmentFilter === 'all' || model.environment === environmentFilter;
    return matchesSearch && matchesStatus && matchesEnvironment;
  });
  // Get unique environments for filter
  const environments = [...new Set(aiModels.map(model => model.environment))];
  return <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Complete Visibility into Your AI Ecosystem
        </h1>
        <p className="text-gray-400 mt-2">
          From cloud to endpoints, discover every AI model and assess risks
          instantly.
        </p>
      </div>
      <AlertBanner type="warning" title="Shadow AI Detected" message="1 unauthorized AI model was detected in your environment. Review and secure it immediately." />
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input type="text" placeholder="Search models..." className="bg-card-bg border border-card-border rounded-lg py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-1 focus:ring-accent-blue" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        {/* Status Filter */}
        <div className="flex-shrink-0">
          <select className="bg-card-bg border border-card-border rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-accent-blue" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="vulnerable">Vulnerable</option>
            <option value="shadow">Shadow AI</option>
          </select>
        </div>
        {/* Environment Filter */}
        <div className="flex-shrink-0">
          <select className="bg-card-bg border border-card-border rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-accent-blue" value={environmentFilter} onChange={e => setEnvironmentFilter(e.target.value)}>
            <option value="all">All Environments</option>
            {environments.map(env => <option key={env} value={env}>
                {env}
              </option>)}
          </select>
        </div>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left py-3 px-4">Model Name</th>
                <th className="text-left py-3 px-4">Environment</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Risk Level</th>
                <th className="text-left py-3 px-4">Last Scan</th>
                <th className="text-left py-3 px-4">Issues</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredModels.map(model => <tr key={model.id} className="border-b border-card-border hover:bg-card-border/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {model.riskLevel === 'critical' && <AlertTriangle size={16} className="text-critical mr-2" />}
                      {model.name}
                    </div>
                  </td>
                  <td className="py-3 px-4">{model.environment}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={model.status as any} />
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={model.riskLevel as any} />
                  </td>
                  <td className="py-3 px-4">{model.lastScan}</td>
                  <td className="py-3 px-4">
                    {model.issues > 0 ? <span className="text-critical">
                        {model.issues} issues
                      </span> : <span className="text-success">No issues</span>}
                  </td>
                  <td className="py-3 px-4">
                    <Link to={`/risk/${model.id}`} className="text-accent-blue hover:text-accent-purple flex items-center">
                      View <ChevronRight size={16} />
                    </Link>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </Card>
    </div>;
}