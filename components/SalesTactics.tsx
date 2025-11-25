import React, { useState } from 'react';
import { SALES_PLANS } from '../constants';
import { 
  Phone, CheckCircle, AlertOctagon, Calendar, 
  BarChart2, Store, MessageSquare, ChevronDown, ChevronUp, Target, TrendingUp, AlertTriangle 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend 
} from 'recharts';

const SalesTactics: React.FC = () => {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const togglePhase = (id: string) => {
    if (expandedPhase === id) {
      setExpandedPhase(null);
    } else {
      setExpandedPhase(id);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">全球销售实操计划 (Execution)</h2>
        <p className="text-gray-500 mt-1">分区域、分阶段的落地执行方案，强调合规前提下的转化。</p>
      </div>

      <div className="space-y-12">
        {SALES_PLANS.map((plan, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-50 p-6 border-b border-gray-200 flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div className="mb-4 lg:mb-0">
                <div className="flex items-center space-x-3 mb-1">
                   <h3 className="text-2xl font-bold text-slate-800">{plan.region}</h3>
                   <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-full border border-emerald-200">
                     GMI 指数: {plan.gmiScore}
                   </span>
                </div>
                <p className="text-gray-600 text-sm max-w-3xl">{plan.rationale}</p>
              </div>
              {/* Compliance Box */}
              <div className="bg-red-50 border border-red-100 rounded-lg p-3 max-w-md w-full lg:w-auto">
                 <div className="flex items-center text-red-700 font-bold text-xs uppercase mb-2">
                   <AlertOctagon size={14} className="mr-1.5" /> 合规红线 (Pre-flight Check)
                 </div>
                 <ul className="space-y-1">
                   {plan.complianceCheck.map((item, i) => (
                     <li key={i} className="text-xs text-red-600 flex items-start">
                       <span className="mr-1.5">•</span> {item}
                     </li>
                   ))}
                 </ul>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* COLUMN 1: Battle Cards (Scripts) */}
              <div className="xl:col-span-1 space-y-6">
                 <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 h-full">
                   <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-4 flex items-center">
                     <MessageSquare size={14} className="mr-1.5" /> 痛点打击军火库 (Battle Cards)
                   </h4>
                   <div className="space-y-4">
                     {plan.scripts.map((script, sIdx) => (
                       <div key={sIdx} className="bg-white p-4 rounded-lg shadow-sm border border-indigo-50">
                         <div className="flex items-center text-xs font-bold text-red-500 mb-2">
                           <Target size={12} className="mr-1" /> 客户痛点: {script.painPoint}
                         </div>
                         <p className="text-sm text-slate-700 font-medium italic mb-3">
                           "{script.script}"
                         </p>
                         <div className="text-xs text-gray-400 bg-gray-50 p-2 rounded border border-gray-100">
                           <span className="font-bold">🧠 心理学原理:</span> {script.psychology}
                         </div>
                       </div>
                     ))}
                   </div>
                   
                   <div className="mt-6">
                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                       <Store size={14} className="mr-1.5" /> 渠道主攻方向
                     </h4>
                     <div className="flex flex-wrap gap-2">
                       {plan.channels.map((channel, cIdx) => (
                         <span key={cIdx} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600 font-medium">
                           {channel.type}: {channel.focus}
                         </span>
                       ))}
                     </div>
                   </div>
                 </div>
              </div>

              {/* COLUMN 2: Interactive Timeline & Stats */}
              <div className="xl:col-span-2 flex flex-col space-y-8">
                
                {/* Timeline */}
                <div>
                   <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                     <Calendar size={14} className="mr-1.5" /> 分阶段执行路径 (点击展开)
                   </h4>
                   
                   <div className="space-y-4 relative pl-4">
                     <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100"></div>

                     {plan.phases.map((phase, pIdx) => {
                       const phaseId = `${plan.region}-${pIdx}`;
                       const isExpanded = expandedPhase === phaseId;
                       
                       return (
                         <div 
                            key={pIdx} 
                            className={`relative pl-8 transition-all duration-300 ${isExpanded ? 'mb-6' : 'mb-2'}`}
                         >
                           <div 
                             onClick={() => togglePhase(phaseId)}
                             className={`absolute left-[11px] top-0 w-4 h-4 rounded-full border-2 cursor-pointer z-10 transition-colors ${isExpanded ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-gray-300 hover:border-emerald-400'}`}
                           ></div>
                           
                           <div 
                             onClick={() => togglePhase(phaseId)}
                             className={`bg-white border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${isExpanded ? 'border-emerald-200 shadow-md ring-1 ring-emerald-100' : 'border-gray-200'}`}
                           >
                             <div className="flex justify-between items-center">
                               <div>
                                 <h5 className="font-bold text-gray-900">{phase.phaseName}</h5>
                                 <span className="text-xs text-gray-500 font-mono">{phase.timeframe}</span>
                               </div>
                               {isExpanded ? <ChevronUp size={18} className="text-gray-400"/> : <ChevronDown size={18} className="text-gray-400"/>}
                             </div>
                             
                             {/* KPIs always visible */}
                             <div className="mt-3 flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block">
                               <BarChart2 size={12} className="mr-1.5" />
                               KPI: {phase.kpi}
                             </div>

                             {/* Expanded Details */}
                             {isExpanded && (
                               <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                                 <div className="space-y-4">
                                   <div>
                                     <span className="text-xs font-bold text-gray-400 uppercase block mb-2">主要动作</span>
                                     <ul className="space-y-2">
                                       {phase.actions.map((action, aIdx) => (
                                         <li key={aIdx} className="text-sm text-gray-700 flex items-start">
                                           <CheckCircle size={14} className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                                           {action}
                                         </li>
                                       ))}
                                     </ul>
                                   </div>

                                   {phase.subActions && (
                                     <div>
                                       <span className="text-xs font-bold text-gray-400 uppercase block mb-2">微观执行 (Sub-actions)</span>
                                       <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                         {phase.subActions.map((sub, sIdx) => (
                                            <li key={sIdx} className="text-xs text-gray-600 bg-gray-50 px-2 py-1.5 rounded border border-gray-100 flex items-center">
                                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                                              {sub}
                                            </li>
                                         ))}
                                       </ul>
                                     </div>
                                   )}

                                   {phase.managerNote && (
                                     <div className="bg-amber-50 p-3 rounded border border-amber-100 flex items-start">
                                        <AlertTriangle size={16} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                                        <div>
                                          <span className="text-xs font-bold text-amber-800 block">经理批注</span>
                                          <p className="text-xs text-amber-700">{phase.managerNote}</p>
                                        </div>
                                     </div>
                                   )}
                                 </div>
                               </div>
                             )}
                           </div>
                         </div>
                       );
                     })}
                   </div>
                </div>

                {/* Chart Area */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 h-64">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                    <TrendingUp size={14} className="mr-1.5" /> 销量增长预测 (vs 竞品)
                  </h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={plan.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id={`colorSales-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id={`colorComp-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="sales" name="Guptomes 销量" stroke="#10b981" fillOpacity={1} fill={`url(#colorSales-${index})`} strokeWidth={2} />
                      <Area type="monotone" dataKey="competitor" name="竞品销量" stroke="#94a3b8" fillOpacity={1} fill={`url(#colorComp-${index})`} strokeWidth={2} />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}/>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesTactics;
