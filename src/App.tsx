import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { ModelInventory } from './pages/ModelInventory';
import { RiskDetail } from './pages/RiskDetail';
import { Remediation } from './pages/Remediation';
import { Compliance } from './pages/Compliance';
import { RedTeam } from './pages/RedTeam';
import { Layout } from './components/Layout';
export function App() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="models" element={<ModelInventory />} />
          <Route path="risk/:id" element={<RiskDetail />} />
          <Route path="remediation" element={<Remediation />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="red-team" element={<RedTeam />} />
        </Route>
      </Routes>
    </BrowserRouter>;
}