import  { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Card } from '../components/Card';
import { GradientButton } from '../components/GradientButton';
import { StatusBadge } from '../components/StatusBadge';
import { redTeamResults } from '../utils/mockData';
export function RedTeam() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(true);
  const [results, setResults] = useState(redTeamResults);
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationComplete(false);
    // Simulate attack process
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationComplete(true);
    }, 3000);
  };
  return <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">AI-Powered Red Teaming</h1>
        <p className="text-gray-400 mt-2">
          Simulate adversarial attacks on your AI models to discover weaknesses
          before attackers do.
        </p>
      </div>
      <Card>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">
              Automated Attack Simulation
            </h2>
            <p className="text-gray-400">
              Our AI-powered red team will attempt to exploit vulnerabilities in
              your models using the latest attack techniques.
            </p>
          </div>
          <GradientButton onClick={handleRunSimulation} className="flex-shrink-0" disabled={isSimulating}>
            {isSimulating ? <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Simulating...</span>
              </> : <>
                <Shield size={16} />
                <span>Re-run Simulation</span>
              </>}
          </GradientButton>
        </div>
        {isSimulating && <div className="mt-6 bg-card-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <RefreshCw size={20} className="animate-spin text-accent-blue" />
              <div>
                <h4 className="font-medium">Simulation in Progress</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Testing attack vectors against your AI models...
                </p>
              </div>
            </div>
          </div>}
      </Card>
      {simulationComplete && <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-critical">3</div>
                <p className="text-gray-400 mt-2">Critical Findings</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-warning">2</div>
                <p className="text-gray-400 mt-2">Warning Findings</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-success">1</div>
                <p className="text-gray-400 mt-2">Successful Defenses</p>
              </div>
            </Card>
          </div>
          <Card title="Simulation Results">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left py-3 px-4">Attack Type</th>
                    <th className="text-left py-3 px-4">Target Model</th>
                    <th className="text-left py-3 px-4">Severity</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map(result => <tr key={result.id} className="border-b border-card-border hover:bg-card-border/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {result.status === 'success' && result.severity === 'critical' && <AlertTriangle size={16} className="text-critical" />}
                          {result.attackType}
                        </div>
                      </td>
                      <td className="py-3 px-4">{result.target}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={result.severity as any} />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {result.status === 'success' ? <XCircle size={16} className="text-critical" /> : <CheckCircle size={16} className="text-success" />}
                          <span>
                            {result.status === 'success' ? 'Attack Succeeded' : 'Attack Failed'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-accent-blue hover:text-accent-purple">
                          View Details
                        </button>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </Card>
          <Card title="Recommendations">
            <div className="space-y-4">
              {results.filter(r => r.status === 'success').map(result => <div key={result.id} className="p-4 rounded-lg bg-card-border">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle size={16} className={result.severity === 'critical' ? 'text-critical' : 'text-warning'} />
                      <h4 className="font-medium">
                        {result.attackType} on {result.target}
                      </h4>
                    </div>
                    <p className="text-sm mb-2">
                      <span className="text-gray-400">Finding: </span>
                      {result.description}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-400">Recommendation: </span>
                      {result.recommendation}
                    </p>
                  </div>)}
            </div>
          </Card>
        </>}
    </div>;
}