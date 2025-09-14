// import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Download, Play, ChevronRight } from 'lucide-react';
import { Card } from '../components/Card';
import { GradientButton } from '../components/GradientButton';
import { StatusBadge } from '../components/StatusBadge';
import { AlertBanner } from '../components/AlertBanner';
import { riskDetails } from '../utils/mockData';
export function RiskDetail() {
  const {
    id
  } = useParams();
  const risk = riskDetails;
  return <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/models" className="text-gray-400 hover:text-white flex items-center gap-1">
          <ArrowLeft size={16} />
          <span>Back to Models</span>
        </Link>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={24} className="text-critical" />
          <h1 className="text-3xl font-bold">Critical Finding: {risk.title}</h1>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <span>Detected {risk.detectedAt}</span>
          <span>•</span>
          <span>Model: {risk.model}</span>
          <span>•</span>
          <StatusBadge status={risk.severity as any} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <Card title="Risk Description">
            <p>{risk.description}</p>
          </Card>
          <Card title="Why It Matters">
            <p>{risk.whyItMatters}</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-card-border rounded-lg p-4">
                <h4 className="text-sm font-medium mb-1">Impact</h4>
                <StatusBadge status="critical" text={risk.impact} />
              </div>
              <div className="bg-card-border rounded-lg p-4">
                <h4 className="text-sm font-medium mb-1">Likelihood</h4>
                <StatusBadge status="warning" text={risk.likelihood} />
              </div>
            </div>
          </Card>
          <Card title="AI Explanation Panel">
            <AlertBanner type="error" title="Vulnerable Prompt Example" message={risk.examplePrompt} />
            <div className="mt-4 bg-card-border p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Model Response</h4>
              <p className="text-sm text-gray-400 italic">
                "I'm sorry, but I'm not allowed to... [truncated for security]"
              </p>
              <p className="text-sm mt-2 text-critical">
                This response indicates the model started to comply with the
                malicious instruction before security controls intervened.
              </p>
            </div>
          </Card>
        </div>
        <div className="col-span-1 space-y-6">
          <Card title="Suggested Fix">
            <p className="mb-4">{risk.suggestedFix}</p>
            <GradientButton to="/remediation" className="w-full justify-center">
              <Play size={16} />
              <span>Run Playbook → Secure Model</span>
            </GradientButton>
            <button className="mt-3 flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg border border-card-border hover:border-accent-blue transition-colors">
              <Download size={16} />
              <span>Download Report</span>
            </button>
          </Card>
          <Card title="Affected Systems">
            <ul className="space-y-2">
              {risk.affectedSystems.map((system, index) => <li key={index} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-critical"></span>
                  <span>{system}</span>
                </li>)}
            </ul>
          </Card>
          <Card title="Compliance Impact">
            <div className="space-y-3">
              {risk.complianceImpact.map((compliance, index) => <div key={index} className="flex justify-between items-center">
                  <span>{compliance}</span>
                  <Link to="/compliance" className="text-accent-blue text-sm flex items-center">
                    View <ChevronRight size={14} />
                  </Link>
                </div>)}
            </div>
          </Card>
        </div>
      </div>
    </div>;
}