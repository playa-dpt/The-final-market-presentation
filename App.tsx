import React, { useState, Component, ErrorInfo, ReactNode } from 'react';
import { LayoutDashboard, Radio, Target, Wrench, Menu, X, RefreshCw } from 'lucide-react';
import { TabView } from './types';
import Dashboard from './components/Dashboard';
import ProductStrategy from './components/ProductStrategy';
import SalesTactics from './components/SalesTactics';
import TechnicalRoadmap from './components/TechnicalRoadmap';

// Error Boundary Component
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-red-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-red-100">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <X size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">系统遇到了一些问题</h2>
            <p className="text-gray-500 text-sm mb-6">
              可能是由于图表渲染或数据加载错误引起的。请尝试刷新页面。
            </p>
            <div className="bg-gray-100 p-3 rounded text-xs text-left font-mono text-gray-600 mb-6 overflow-auto max-h-32 border border-gray-200">
              {this.state.error?.toString()}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-bold shadow-lg shadow-emerald-900/20"
            >
              <RefreshCw size={18} className="mr-2" />
              刷新页面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabView>(TabView.DASHBOARD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case TabView.DASHBOARD:
        return <Dashboard />;
      case TabView.PRODUCTS:
        return <ProductStrategy />;
      case TabView.SALES:
        return <SalesTactics />;
      case TabView.RD:
        return <TechnicalRoadmap />;
      default:
        return <Dashboard />;
    }
  };

  const NavItem = ({ tab, icon: Icon, label }: { tab: TabView; icon: any; label: string }) => (
    <button
      onClick={() => {
        setActiveTab(tab);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 w-full font-medium ${
        activeTab === tab
          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="flex h-dvh bg-emerald-50/50 overflow-hidden font-sans text-gray-800">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white border-r border-slate-800 flex-shrink-0">
        <div className="p-6 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
               <span className="text-2xl">🐂</span>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight block leading-none">Guptomes</span>
              <span className="text-[10px] text-emerald-400 font-semibold tracking-wider">STRATEGIC OS</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem tab={TabView.DASHBOARD} icon={LayoutDashboard} label="战略总览 (GMI)" />
          <NavItem tab={TabView.PRODUCTS} icon={Radio} label="产品矩阵" />
          <NavItem tab={TabView.SALES} icon={Target} label="销售实操计划" />
          <NavItem tab={TabView.RD} icon={Wrench} label="研发合规路线" />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <p className="text-xs text-gray-400 font-medium mb-2">系统状态</p>
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-emerald-400 font-mono">LIVE: MARKET_DATA</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center shadow-md z-30 flex-shrink-0">
            <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-md flex items-center justify-center">🐂</div>
            <span className="text-lg font-bold">Guptomes</span>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute inset-0 z-20 bg-slate-900/95 backdrop-blur-sm pt-20 px-4 space-y-4">
             <NavItem tab={TabView.DASHBOARD} icon={LayoutDashboard} label="战略总览" />
             <NavItem tab={TabView.PRODUCTS} icon={Radio} label="产品矩阵" />
             <NavItem tab={TabView.SALES} icon={Target} label="销售计划" />
             <NavItem tab={TabView.RD} icon={Wrench} label="研发路线" />
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 scroll-smooth">
          <div className="max-w-7xl mx-auto min-h-full p-4 md:p-8">
            <ErrorBoundary>
              {renderContent()}
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;