// import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, FileCheck, Play, Database, Shield, ChevronRight } from 'lucide-react';
import { Card } from '../components/Card';
import { CircularProgress } from '../components/CircularProgress';
import { GradientButton } from '../components/GradientButton';
import { StatusBadge } from '../components/StatusBadge';
import { postureTrendData, criticalRisks } from '../utils/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
export function Dashboard() {
  // Current AI posture score
  const currentScore = 78;
  return <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Your AI Security Posture at a Glance
        </h1>
        <p className="text-gray-400 mt-2">
          Monitor risks across models, pipelines, and data flows — all in
          real-time, powered by AI.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Posture Score Card */}
        <Card className="col-span-1">
          <div className="flex flex-col items-center">
            <CircularProgress value={currentScore} label="Posture Score" />
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                {currentScore < 50 ? 'Critical issues require immediate attention' : currentScore < 80 ? 'Your posture needs improvement' : 'Good security posture'}
              </p>
            </div>
          </div>
        </Card>
        {/* Critical Risks Card */}
        <Card className="col-span-1 lg:col-span-2" title="Critical Risks" subtitle="Top issues requiring attention">
          <div className="space-y-4">
            {criticalRisks.map(risk => <Link key={risk.id} to={`/risk/${risk.id}`} className="block p-4 rounded-lg bg-card-border hover:bg-gradient-to-r hover:from-card-border hover:to-card-bg transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={16} className="text-critical" />
                      <h4 className="font-medium">{risk.title}</h4>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {risk.model} • Detected {risk.detectedAt}
                    </p>
                  </div>
                  <StatusBadge status={risk.severity as any} />
                </div>
                <p className="text-sm mt-2">{risk.description}</p>
                <div className="mt-3 flex justify-end">
                  <span className="text-xs text-accent-blue flex items-center gap-1">
                    View Details <ChevronRight size={14} />
                  </span>
                </div>
              </Link>)}
          </div>
        </Card>
      </div>
      {/* Posture Trend Chart */}
      <Card title="Posture Trend" subtitle="Security posture score over time">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={postureTrendData} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3A" />
              <XAxis dataKey="date" stroke="#6B7280" tick={{
              fill: '#9CA3AF'
            }} tickFormatter={value => {
              const date = new Date(value);
              return date.toLocaleDateString('en-US', {
                month: 'short'
              });
            }} />
              <YAxis stroke="#6B7280" tick={{
              fill: '#9CA3AF'
            }} domain={[0, 100]} tickFormatter={value => `${value}`} />
              <Tooltip contentStyle={{
              backgroundColor: '#14141F',
              border: '1px solid #2A2A3A',
              borderRadius: '8px'
            }} labelStyle={{
              color: '#fff'
            }} itemStyle={{
              color: '#29A8FF'
            }} formatter={value => [`${value}`, 'Score']} labelFormatter={label => {
              const date = new Date(label);
              return date.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              });
            }} />
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#29A8FF" />
                  <stop offset="100%" stopColor="#6C63FF" />
                </linearGradient>
              </defs>
              <Line type="monotone" dataKey="score" stroke="url(#scoreGradient)" strokeWidth={3} dot={{
              fill: '#29A8FF',
              strokeWidth: 2,
              r: 4
            }} activeDot={{
              fill: '#6C63FF',
              strokeWidth: 2,
              r: 6
            }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GradientButton to="/remediation" className="justify-center">
            <Play size={18} />
            <span>Remediate Now</span>
          </GradientButton>
          <GradientButton to="/compliance" variant="secondary" className="justify-center">
            <FileCheck size={18} />
            <span>View Compliance Report</span>
          </GradientButton>
          <GradientButton to="/red-team" variant="secondary" className="justify-center">
            <Shield size={18} />
            <span>Simulate Attack</span>
          </GradientButton>
          <GradientButton to="/models" variant="secondary" className="justify-center">
            <Database size={18} />
            <span>View All Models</span>
          </GradientButton>
        </div>
      </div>
    </div>;
}