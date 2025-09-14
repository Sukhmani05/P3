import { useState } from 'react';
import { Play, CheckCircle, Clock, Search, ArrowRight } from 'lucide-react';
import { Card } from '../components/Card';
import { GradientButton } from '../components/GradientButton';
import { StatusBadge } from '../components/StatusBadge';
import { remediationPlaybooks } from '../utils/mockData';
export function Remediation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePlaybook, setActivePlaybook] = useState<number | null>(null);
  const [executionStatus, setExecutionStatus] = useState<'idle' | 'running' | 'complete'>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const filteredPlaybooks = remediationPlaybooks.filter(playbook => playbook.name.toLowerCase().includes(searchTerm.toLowerCase()) || playbook.description.toLowerCase().includes(searchTerm.toLowerCase()) || playbook.targetRisk.toLowerCase().includes(searchTerm.toLowerCase()));
  const selectedPlaybook = remediationPlaybooks.find(p => p.id === activePlaybook);
  const handleRunPlaybook = () => {
    if (!activePlaybook) return;
    setExecutionStatus('running');
    setCurrentStep(1);
    // Simulate playbook execution
    const totalSteps = selectedPlaybook?.steps || 5;
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= totalSteps) {
          clearInterval(interval);
          setExecutionStatus('complete');
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };
  const handleReset = () => {
    setActivePlaybook(null);
    setExecutionStatus('idle');
    setCurrentStep(0);
  };
  return <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Automated Remediation, Guided by AI
        </h1>
        <p className="text-gray-400 mt-2">
          Apply fixes instantly or review detailed steps before execution.
        </p>
      </div>
      {!activePlaybook ? <>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input type="text" placeholder="Search playbooks..." className="bg-card-bg border border-card-border rounded-lg py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-1 focus:ring-accent-blue" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaybooks.map(playbook => <Card key={playbook.id} className="hover:border-accent-blue transition-colors cursor-pointer" onClick={() => setActivePlaybook(playbook.id)}>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{playbook.name}</h3>
                  <StatusBadge status="info" text={playbook.status} />
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  {playbook.description}
                </p>
                <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {playbook.duration}
                  </span>
                  <span>{playbook.steps} steps</span>
                </div>
                <div className="mt-4 pt-4 border-t border-card-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Target Risk:</span>
                    <span className="text-accent-blue">
                      {playbook.targetRisk}
                    </span>
                  </div>
                </div>
                <GradientButton className="mt-4 w-full justify-center" onClick={() => setActivePlaybook(playbook.id)}>
                  <Play size={16} />
                  <span>Run Playbook</span>
                </GradientButton>
              </Card>)}
          </div>
        </> : <div className="space-y-6">
          <Card>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">
                  {selectedPlaybook?.name}
                </h2>
                <p className="text-gray-400 mt-1">
                  {selectedPlaybook?.description}
                </p>
              </div>
              <button onClick={handleReset} className="text-gray-400 hover:text-white">
                Back to Playbooks
              </button>
            </div>
          </Card>
          <Card title="Execution Flow">
            <div className="mb-6">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-card-border">
                      Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block">
                      {Math.round(currentStep / (selectedPlaybook?.steps || 1) * 100)}
                      %
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-card-border">
                  <div style={{
                width: `${currentStep / (selectedPlaybook?.steps || 1) * 100}%`
              }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-accent-blue to-accent-purple"></div>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${executionStatus !== 'idle' ? 'bg-success' : 'bg-card-border'}`}>
                    {executionStatus !== 'idle' ? <CheckCircle size={16} className="text-white" /> : <span>1</span>}
                  </div>
                  <span>Started</span>
                </div>
                <ArrowRight size={16} className="text-gray-400" />
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${executionStatus === 'running' ? 'bg-accent-blue' : 'bg-card-border'}`}>
                    {executionStatus === 'complete' ? <CheckCircle size={16} className="text-white" /> : <span>2</span>}
                  </div>
                  <span>In Progress</span>
                </div>
                <ArrowRight size={16} className="text-gray-400" />
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${executionStatus === 'complete' ? 'bg-success' : 'bg-card-border'}`}>
                    {executionStatus === 'complete' ? <CheckCircle size={16} className="text-white" /> : <span>3</span>}
                  </div>
                  <span>Resolved</span>
                </div>
              </div>
            </div>
            {executionStatus === 'idle' && <GradientButton className="w-full justify-center" onClick={handleRunPlaybook}>
                <Play size={16} />
                <span>Start Execution</span>
              </GradientButton>}
            {executionStatus === 'running' && <div className="bg-card-border rounded-lg p-4">
                <h4 className="font-medium mb-2">
                  Executing Step {currentStep} of {selectedPlaybook?.steps}
                </h4>
                <p className="text-gray-400 text-sm">
                  {currentStep === 1 && 'Analyzing model configuration...'}
                  {currentStep === 2 && 'Identifying vulnerable endpoints...'}
                  {currentStep === 3 && 'Applying input validation filters...'}
                  {currentStep === 4 && 'Updating security policies...'}
                  {currentStep === 5 && 'Verifying changes and testing...'}
                </p>
              </div>}
            {executionStatus === 'complete' && <div className="bg-success/10 border-l-4 border-success rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={20} className="text-success" />
                  <h4 className="font-medium">Remediation Complete</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  All {selectedPlaybook?.steps} steps have been successfully
                  executed. The model is now secure against{' '}
                  {selectedPlaybook?.targetRisk}.
                </p>
                <GradientButton className="mt-4" onClick={handleReset} variant="secondary">
                  Run Another Playbook
                </GradientButton>
              </div>}
          </Card>
          <Card title="Audit Log">
            <div className="space-y-3">
              {[...Array(Math.min(currentStep, 5))].map((_, i) => <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-card-border">
                  <CheckCircle size={16} className="text-success" />
                  <div>
                    <p className="text-sm font-medium">
                      {i === 0 && 'Started remediation process'}
                      {i === 1 && 'Analyzed model configuration'}
                      {i === 2 && 'Identified vulnerable endpoints'}
                      {i === 3 && 'Applied input validation filters'}
                      {i === 4 && 'Updated security policies'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </div>)}
              {currentStep === 0 && <p className="text-gray-400 text-sm">
                  No audit logs yet. Start execution to see logs.
                </p>}
            </div>
          </Card>
        </div>}
    </div>;
}