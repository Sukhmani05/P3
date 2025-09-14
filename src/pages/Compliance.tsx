// import React from 'react';
import { Download, Send, FileCheck, TrendingDown } from 'lucide-react';
import { Card } from '../components/Card';
import { CircularProgress } from '../components/CircularProgress';
import { GradientButton } from '../components/GradientButton';
import { AlertBanner } from '../components/AlertBanner';
import { StatusBadge } from '../components/StatusBadge';
import { complianceData } from '../utils/mockData';
export function Compliance() {
  return <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Stay Ahead of Compliance</h1>
        <p className="text-gray-400 mt-2">
          Generate SOC2, GDPR, or HIPAA reports in one click. Detect posture
          drift before it creates gaps.
        </p>
      </div>
      {/* Compliance Meters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex flex-col items-center">
            <CircularProgress value={complianceData.soc2} size={120} label="SOC2" />
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                {complianceData.soc2 >= 80 ? 'Compliant' : 'Needs Attention'}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col items-center">
            <CircularProgress value={complianceData.gdpr} size={120} label="GDPR" />
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                {complianceData.gdpr >= 80 ? 'Compliant' : 'Needs Attention'}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col items-center">
            <CircularProgress value={complianceData.hipaa} size={120} label="HIPAA" />
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                {complianceData.hipaa >= 80 ? 'Compliant' : 'Needs Attention'}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col items-center">
            <CircularProgress value={complianceData.pci} size={120} label="PCI-DSS" />
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                {complianceData.pci >= 80 ? 'Compliant' : 'Needs Attention'}
              </p>
            </div>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Auto-generated Reports */}
        <Card className="col-span-1 lg:col-span-2" title="Auto-generated Reports">
          <div className="space-y-4">
            {complianceData.reports.map(report => <div key={report.id} className="p-4 rounded-lg bg-card-border hover:bg-gradient-to-r hover:from-card-border hover:to-card-bg transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <FileCheck size={20} className="text-accent-blue" />
                    <h4 className="font-medium">{report.name}</h4>
                  </div>
                  <StatusBadge status="success" text={report.status} />
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Generated on {report.date} • {report.type} format
                </p>
                <div className="mt-3 flex gap-2 justify-end">
                  <button className="flex items-center gap-1 text-sm bg-card-bg py-1 px-3 rounded-md hover:bg-card-border transition-colors">
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm bg-card-bg py-1 px-3 rounded-md hover:bg-card-border transition-colors">
                    <Send size={14} />
                    <span>Share</span>
                  </button>
                </div>
              </div>)}
          </div>
          <div className="mt-6 flex gap-4">
            <GradientButton className="flex-1 justify-center">
              <Download size={16} />
              <span>Generate New Report</span>
            </GradientButton>
            <GradientButton variant="secondary" className="flex-1 justify-center">
              <Send size={16} />
              <span>Send to Audit Team</span>
            </GradientButton>
          </div>
        </Card>
        {/* Drift Detection Alerts */}
        <Card title="Drift Detection Alerts" className="col-span-1">
          <div className="space-y-4">
            {complianceData.driftAlerts.map(alert => <div key={alert.id} className="p-4 rounded-lg bg-card-border">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown size={16} className="text-warning" />
                  <h4 className="font-medium">{alert.title}</h4>
                </div>
                <p className="text-sm text-gray-400">{alert.description}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-gray-400">
                    Detected {alert.detectedAt}
                  </span>
                  <StatusBadge status={alert.severity as any} />
                </div>
              </div>)}
          </div>
          {complianceData.driftAlerts.length === 0 && <p className="text-gray-400 text-sm">
              No drift detected. Your compliance posture is stable.
            </p>}
        </Card>
      </div>
      <AlertBanner type="info" title="Compliance Automation Enabled" message="Continuous monitoring is active. You'll be notified of any compliance drift or policy violations." />
    </div>;
}