import React, { useState } from 'react';
import { SALES_PLANS } from '../constants';
import { 
  CheckCircle, AlertOctagon, Calendar, 
  BarChart2, Store, MessageSquare, ChevronDown, ChevronUp, Target, TrendingUp, AlertTriangle, ArrowRight 
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
    <div className="space-y-8">
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
              <div className="xl:col-span-1 space-y-6 min-w-0">
                 <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 h-full">
                   <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-4 flex items-center">
                     <MessageSquare size={14} className="mr-1.5" /> 痛点打击军火库 (Battle Cards)
                   </h4>
                   <div className="space-y-4">
                     {plan.scripts.map((script, sIdx) => (
                       <div key={sIdx} className="bg-white p-4 rounded-lg shadow-sm border border-indigo-50 transition-transform hover:-translate-y-1 duration-200">
                         <div className="flex items-center text-xs font-bold text-red-500 mb-2">
                           <Target size={12} className="mr-1" /> 客户痛点: {script.painPoint}
                         </div>
                         <p className="text-sm text-slate-700 font-medium italic mb-3 relative pl-3 border-l-2 border-indigo-200">
                           "{script.script}"
                         </p>
                         <div className="text-[10px] text-gray-500 bg-gray-50 p-2 rounded border border-gray-100 flex items-start">
                           <span className="font-bold mr-1">🧠 心理学:</span> {script.psychology}
                         </div>
                       </div>
                     ))}
                   </div>
                   
                   <div className="mt-6 pt-4 border-t border-indigo-100">
                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                       <Store size={14} className="mr-1.5" /> 渠道主攻方向
                     </h4>
                     <div className="flex flex-wrap gap-2">
                       {plan.channels.map((channel, cIdx) => (
                         <span key={cIdx} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600 font-medium shadow-sm">
                           {channel.type}: {channel.focus}
                         </span>
                       ))}
                     </div>
                   </div>
                 </div>
              </div>

              {/* COLUMN 2: Interactive Timeline & Stats */}
              <div className="xl:col-span-2 flex flex-col space-y-8 min-w-0">
                
                {/* Timeline */}
                <div>
                   <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                     <Calendar size={14} className="mr-1.5" /> 分阶段执行路径 (点击展开详情)
                   </h4>
                   
                   <div className="space-y-0 relative pl-4">
                     {/* Vertical Line */}
                     <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100"></div>

                     {plan.phases.map((phase, pIdx) => {
                       const phaseId = `${plan.region}-${pIdx}`;
                       const isExpanded = expandedPhase === phaseId;
                       
                       return (
                         <div 
                            key={pIdx} 
                            className="relative pl-8 mb-4"
                         >
                           {/* Timeline Dot */}
                           <div 
                             onClick={() => togglePhase(phaseId)}
                             className={`absolute left-[11px] top-5 w-4 h-4 rounded-full border-2 cursor-pointer z-10 transition-all duration-300 ${isExpanded ? 'bg-emerald-500 border-emerald-500 scale-110' : 'bg-white border-gray-300 hover:border-emerald-400'}`}
                           ></div>
                           
                           <div 
                             className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-emerald-300 shadow-md ring-1 ring-emerald-100' : 'border-gray-200 hover:border-gray-300'}`}
                           >
                             {/* Phase Header */}
                             <div 
                               onClick={() => togglePhase(phaseId)}
                               className="p-4 cursor-pointer flex justify-between items-center bg-white"
                             >
                               <div>
                                 <h5 className="font-bold text-gray-900 text-base">{phase.phaseName}</h5>
                                 <div className="flex items-center text-xs text-gray-500 mt-1 font-mono">
                                   <Calendar size={12} className="mr-1"/> {phase.timeframe}
                                 </div>
                               </div>
                               <div className="flex items-center space-x-3">
                                 {/* KPIs always visible */}
                                 <div className="hidden sm:flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                                   <BarChart2 size={12} className="mr-1.5" />
                                   KPI: {phase.kpi}
                                 </div>
                                 <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                   <ChevronDown size={20} className="text-gray-400"/>
                                 </div>
                               </div>
                             </div>

                             {/* Expanded Details - Using grid transition for smooth height animation */}
                             <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                               <div className="overflow-hidden bg-slate-50/50">
                                 <div className="p-5 border-t border-gray-100 space-y-5">
                                   
                                   {/* Mobile KPI (visible only when expanded on mobile) */}
                                   <div className="sm:hidden flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 mb-4">
                                     <BarChart2 size={14} className="mr-2" />
                                     目标 KPI: {phase.kpi}
                                   </div>

                                   <div>
                                     <span className="text-xs font-bold text-gray-400 uppercase block mb-2 flex items-center">
                                       <CheckCircle size={12} className="mr-1"/> 核心动作
                                     </span>
                                     <ul className="space-y-2">
                                       {phase.actions.map((action, aIdx) => (
                                         <li key={aIdx} className="text-sm text-gray-800 flex items-start bg-white p-2 rounded border border-gray-100 shadow-sm">
                                           <span className="text-emerald-500 font-bold mr-2">Step {aIdx + 1}.</span>
                                           {action}
                                         </li>
                                       ))}
                                     </ul>
                                   </div>

                                   {phase.subActions && (
                                     <div>
                                       <span className="text-xs font-bold text-gray-400 uppercase block mb-2 flex items-center">
                                         <ArrowRight size={12} className="mr-1"/> 微观执行 (Execution Details)
                                       </span>
                                       <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                         {phase.subActions.map((sub, sIdx) => (
                                            <li key={sIdx} className="text-xs text-gray-600 bg-white px-3 py-2 rounded border border-gray-200 flex items-center hover:border-emerald-300 transition-colors">
                                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></span>
                                              {sub}
                                            </li>
                                         ))}
                                       </ul>
                                     </div>
                                   )}

                                   {phase.managerNote && (
                                     <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 flex items-start">
                                        <div className="bg-amber-100 p-1.5 rounded-full mr-3 flex-shrink-0">
                                          <AlertTriangle size={14} className="text-amber-600" />
                                        </div>
                                        <div>
                                          <span className="text-xs font-bold text-amber-800 block mb-1">经理批注 (Manager Note)</span>
                                          <p className="text-xs text-amber-800 leading-relaxed">{phase.managerNote}</p>
                                        </div>
                                     </div>
                                   )}
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>
                       );
                     })}
                   </div>
                </div>

                {/* Chart Area - Enhanced for mobile stability */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm min-w-0">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                    <TrendingUp size={14} className="mr-1.5" /> 销量增长预测 (vs 竞品)
                  </h4>
                  {/* Fixed height container using tailwind and min-w-0 for flex children */}
                  <div className="h-[300px] w-full relative min-w-0">
                    <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={100}>
                      <AreaChart data={plan.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                          contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesTactics;