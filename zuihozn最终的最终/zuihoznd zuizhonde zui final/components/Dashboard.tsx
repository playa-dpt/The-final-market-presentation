import React from 'react';
import { TrendingUp, AlertTriangle, ShieldCheck, Globe, Info } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, ReferenceLine } from 'recharts';
import { MARKET_SCORES } from '../constants';

const StatCard = ({ icon: Icon, title, value, subtext, color, textColor }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 ${color}`}></div>
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</p>
        <h3 className={`text-2xl font-bold mt-1 ${textColor}`}>{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
        <Icon size={24} className={textColor} />
      </div>
    </div>
    <p className="text-sm text-gray-500 mt-4 font-medium">{subtext}</p>
  </div>
);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white p-4 rounded-lg shadow-xl border border-slate-700">
        <p className="font-bold text-lg mb-1">{data.region}</p>
        <p className="text-emerald-400 font-bold text-xl mb-2">GMI 得分: {data.totalScore}</p>
        <div className="space-y-1 text-xs text-gray-300">
          <p>市场真空度: {data.vacuumScore}/10</p>
          <p>技术/法规壁垒: {data.regulatoryRisk}/10</p>
          <p className="mt-2 text-gray-400 italic max-w-[200px]">{data.details}</p>
        </div>
      </div>
    );
  }
  return null;
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Guptomes 决策看板</h1>
          <p className="text-gray-500 mt-2 font-medium">基于数据与合规性的全球市场机会分析系统</p>
        </div>
        <div className="mt-4 md:mt-0 px-5 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold border border-emerald-200 flex items-center shadow-sm">
          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
          战略状态：进攻期 (Q1 2025)
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={TrendingUp} 
          title="最高 GMI 指数" 
          value="加拿大 (8.8)" 
          subtext="ISED 禁令导致的完美真空"
          color="bg-emerald-500"
          textColor="text-emerald-600"
        />
        <StatCard 
          icon={AlertTriangle} 
          title="最大合规风险" 
          value="澳洲 ACMA" 
          subtext="需集成天文台地理围栏"
          color="bg-amber-500"
          textColor="text-amber-600"
        />
        <StatCard 
          icon={ShieldCheck} 
          title="产品核心调整" 
          value="T-Only 模式" 
          subtext="移除电击以适应欧盟法规"
          color="bg-blue-500"
          textColor="text-blue-600"
        />
        <StatCard 
          icon={Globe} 
          title="新兴增长点" 
          value="T10/T11 4G" 
          subtext="非 VHF 市场的最佳替代"
          color="bg-indigo-500"
          textColor="text-indigo-600"
        />
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart - Added min-w-0 to prevent flexbox overflow on mobile */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-w-0 flex flex-col h-96">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Guptomes 市场机会矩阵</h3>
              <p className="text-sm text-gray-500">X轴: 进入壁垒 (法规/技术) | Y轴: 市场真空度 (机会)</p>
            </div>
            <div className="text-xs bg-slate-100 px-3 py-1 rounded text-gray-500">
              气泡大小 = GMI 综合评分
            </div>
          </div>
          
          <div className="flex-1 w-full min-h-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  type="number" 
                  dataKey="regulatoryRisk" 
                  name="进入壁垒" 
                  domain={[0, 10]} 
                  label={{ value: '进入壁垒 (高风险/高难度)', position: 'bottom', offset: 0, fontSize: 12 }} 
                />
                <YAxis 
                  type="number" 
                  dataKey="vacuumScore" 
                  name="市场真空度" 
                  domain={[0, 10]} 
                  label={{ value: '市场真空度 (缺口大小)', angle: -90, position: 'left', offset: 0, fontSize: 12 }} 
                />
                <ZAxis type="number" dataKey="totalScore" range={[400, 2000]} name="GMI Score" />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                
                {/* Quadrant Lines */}
                <ReferenceLine x={5} stroke="#cbd5e1" strokeDasharray="3 3" />
                <ReferenceLine y={5} stroke="#cbd5e1" strokeDasharray="3 3" />

                <Scatter name="Markets" data={MARKET_SCORES} fill="#059669">
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-gray-500">
            <div className="flex items-start">
              <div className="w-3 h-3 bg-emerald-600 rounded-full mr-2 mt-0.5"></div>
              <span><strong>高价值区 (右上):</strong> 加拿大。壁垒高但利润极高，竞争对手少。</span>
            </div>
            <div className="flex items-start">
              <div className="w-3 h-3 bg-emerald-300 rounded-full mr-2 mt-0.5"></div>
              <span><strong>红海区 (左下):</strong> 美国。壁垒低，满地都是竞争对手。</span>
            </div>
          </div>
        </div>

        {/* Action List */}
        <div className="bg-slate-900 p-6 rounded-2xl shadow-lg text-white flex flex-col min-w-0">
          <h3 className="text-lg font-bold mb-1 flex items-center"><Info className="mr-2 text-emerald-400" size={20}/> 决策建议</h3>
          <p className="text-slate-400 text-sm mb-6">基于 GMI 指数的优先级排序</p>
          
          <div className="space-y-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {/* FIX: Use [...MARKET_SCORES] to create a copy before sorting to avoid mutating read-only constant */}
            {[...MARKET_SCORES].sort((a,b) => b.totalScore - a.totalScore).map((market, idx) => (
              <div key={market.region} className="flex items-start relative">
                <span className={`absolute -left-2 top-0 bottom-0 w-0.5 rounded-full ${idx === 0 ? 'bg-emerald-500' : 'bg-slate-700'}`}></span>
                <div className="ml-3">
                  <div className="flex justify-between w-full items-center mb-1">
                    <h4 className="font-bold text-emerald-50">{idx + 1}. {market.region}</h4>
                    <span className="text-xs font-mono text-emerald-400 border border-emerald-900 bg-emerald-900/50 px-1.5 py-0.5 rounded">GMI: {market.totalScore}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{market.details}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-sm transition-colors shadow-lg shadow-emerald-900/50">
              下载完整分析报告 (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;