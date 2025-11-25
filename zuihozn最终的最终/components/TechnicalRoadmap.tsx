import React from 'react';
import { RD_TASKS } from '../constants';
import { Cpu, Lock, Anchor, Radio, Clock, ShieldAlert } from 'lucide-react';

const priorityMap: Record<string, string> = {
  'Critical': '紧急',
  'High': '高',
  'Medium': '中'
};

const typeMap: Record<string, string> = {
  'Hardware': '硬件',
  'Firmware': '固件',
  'Compliance': '合规'
};

const TechnicalRoadmap: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">研发与合规路线图</h2>
        <p className="text-gray-500 mt-1">技术服务于合规：确保产品能在目标市场合法销售是研发的首要任务。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RD_TASKS.map((task, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col h-full hover:border-emerald-400 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-gray-50 p-3 rounded-lg group-hover:bg-emerald-50 transition-colors">
                {task.type === 'Hardware' ? <Anchor className="text-blue-600" /> : 
                 task.type === 'Firmware' ? <Cpu className="text-purple-600" /> : 
                 <ShieldAlert className="text-amber-600" />}
              </div>
              <div className="flex space-x-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase border border-gray-200">
                  {typeMap[task.type]}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                  task.impact === 'Critical' ? 'bg-red-50 text-red-700 border-red-100' :
                  task.impact === 'High' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                  'bg-emerald-50 text-emerald-700 border-emerald-100'
                }`}>
                  {priorityMap[task.impact]}
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">{task.title}</h3>
            <p className="text-gray-600 text-sm mb-6 flex-1 leading-relaxed">
              {task.description}
            </p>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
               <div className="flex items-center text-xs text-gray-500 font-medium">
                 <Clock size={14} className="mr-1.5" />
                 截止: {task.deadline}
               </div>
               <div className="flex items-center space-x-2">
                 {task.title.includes('Pure') && (
                    <span title="软件锁">
                      <Lock size={16} className="text-gray-400" />
                    </span>
                 )}
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Engineering Note */}
      <div className="bg-slate-900 text-gray-300 rounded-xl p-8 mt-8 shadow-xl">
        <h3 className="text-white font-bold text-lg mb-3 flex items-center">
          <span className="text-2xl mr-2">💡</span> CTO 特别指令: "设计即合规"
        </h3>
        <p className="text-sm leading-relaxed text-gray-400">
          市场调研明确指出，我们最大的障碍不是通信技术本身，而是<span className="text-emerald-400 font-bold">各国复杂的无线电与动物福利法律</span>。
          <br/><br/>
          1. <strong>模块化</strong>: 硬件设计必须支持快速更换射频模块 (LoRa/VHF)，以适应 ISED 和 CEPT 的不同频率。
          <br/>
          2. <strong>软件定义</strong>: 对于地理围栏（如澳洲天文台），必须做到“出厂即锁”，不要把合规责任推给用户。
          <br/>
          3. <strong>物理去功能</strong>: 针对欧洲市场，单纯的软件关闭电击是不够的，必须在模具上移除电极柱孔位。
        </p>
      </div>
    </div>
  );
};

export default TechnicalRoadmap;