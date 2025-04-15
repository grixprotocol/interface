import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';

import { MainLayout } from './components/layout/MainLayout';
import { ApiKeysPage } from './pages/ApiKeys/ApiKeysPage';
import { CalculatorPage } from './pages/Calculator';
import { SocialAgents } from './pages/CalypsoHub/components/agentsSection/socialAgents';
import { TradeAgentsV2 } from './pages/CalypsoHub/components/agentsSection/tradeAgentsV2';
import { GuideSection } from './pages/CalypsoHub/components/GuideSection';
import { DeBridgePage } from './pages/deBridgePage/deBridge';
import { IntegrationsPage } from './pages/integrations/IntegrationsPage';
import { OptionsMatrixPage } from './pages/OptionsMatrixPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { StakingPage } from './pages/stakingPage';
import { StatsPage } from './pages/StatsPage';
import { StatusPage } from './pages/StatusPage';
import { TokenPage } from './pages/TokenPage';
import { TradePage } from './pages/TradePage';
import { UnderDevelopment } from './pages/underDeploymentSection/UnderDevelopment';
import { CowswapWidget } from './widgets/cowswap';
export const App = () => (
  <MainLayout>
    <Routes>
      <Route path="*" element={<Navigate replace to="/trade" />} />
      <Route path="/trade" element={<TradePage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/integrations" element={<IntegrationsPage />} />
      <Route path="/calculator" element={<CalculatorPage />} />
      <Route path="/status" element={<StatusPage />} />
      <Route path="/optionsMatrix" element={<OptionsMatrixPage />} />
      <Route path="/bridge" element={<DeBridgePage />} />
      <Route path="/swap" element={<CowswapWidget />} />
      <Route path="/token" element={<TokenPage />} />
      <Route path="/api" element={<ApiKeysPage />} />
      <Route path="/calypso/lobby" element={<GuideSection />} />
      <Route path="/calypso/trade-agents" element={<TradeAgentsV2 />} />
      <Route path="/calypso/social-agents" element={<SocialAgents />} />
      <Route path="/staking" element={<StakingPage />} />
      <Route path="/under-development" element={<UnderDevelopment />} />
    </Routes>
  </MainLayout>
);
