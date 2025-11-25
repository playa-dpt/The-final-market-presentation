import React from 'react';
import { PRODUCTS } from '../constants';
import { Check, XCircle, Zap, Shield, Signal, Smartphone } from 'lucide-react';

const categoryMap: Record<string, string> = {
  'High-End': '高端旗舰',
  'Mid-Range': '中端进阶',
  'Entry': '入门基础'
};

const ProductStrategy: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">产品矩阵 (SKU) 策略</h2>
        <p className="text-gray-500 mt-1">基于 Guptomes 市场指数的产品定位与技术取舍。</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg group">
            <div className={`p-4 text-white ${
              product.category === 'High-End' ? 'bg-slate-900' : 
              product.category === 'Mid-Range' ? 'bg-emerald-600' : 'bg-teal-500'
            }`}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <span className="text-[10px] px-2 py-1 bg-white/20 rounded text-white uppercase font-bold tracking-wider">{categoryMap[product.category]}</span>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">核心卖点</p>
              <p className="text-gray-800 font-medium italic mb-6 leading-relaxed">"{product.keySellingPoint}"</p>
              
              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">主攻战场</h4>
                <div className="flex flex-wrap gap-2">
                  {product.targetMarkets.map((m) => (
                    <span key={m} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium border border-gray-200">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">SWOT 简析</h4>
                <ul className="space-y-2 text-sm">
                  {product.category === 'High-End' && (
                    <>
                      <li className="flex items-start text-emerald-700">
                        <Signal size={16} className="mr-2 mt-0.5" /> <span><strong>强项:</strong> 离网通信能力，硬核猎人刚需</span>
                      </li>
                      <li className="flex items-start text-red-600">
                        <XCircle size={16} className="mr-2 mt-0.5" /> <span><strong>风险:</strong> 频率合规极难 (MURS vs ISED)</span>
                      </li>
                    </>
                  )}
                  {product.category === 'Mid-Range' && (
                    <>
                      <li className="flex items-start text-emerald-700">
                        <Smartphone size={16} className="mr-2 mt-0.5" /> <span><strong>强项:</strong> 用户体验好，合规风险低 (4G)</span>
                      </li>
                      <li className="flex items-start text-red-600">
                        <Signal size={16} className="mr-2 mt-0.5" /> <span><strong>风险:</strong> 极偏远地区无基站覆盖</span>
                      </li>
                    </>
                  )}
                  {product.category === 'Entry' && (
                    <>
                      <li className="flex items-start text-emerald-700">
                        <Check size={16} className="mr-2 mt-0.5" /> <span><strong>强项:</strong> 成本极低，适合走量</span>
                      </li>
                      <li className="flex items-start text-red-600">
                        <Zap size={16} className="mr-2 mt-0.5" /> <span><strong>风险:</strong> 2G 退网潮，产品生命周期短</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">下一步动作</h4>
               {product.category === 'High-End' ? (
                 <p className="text-sm text-gray-700 flex items-start">
                   <Shield size={16} className="text-slate-700 mr-2 mt-0.5" />
                   研发：物理强度升级 (澳洲防撕裂) + 纯追踪固件。
                 </p>
               ) : product.category === 'Mid-Range' ? (
                 <p className="text-sm text-gray-700 flex items-start">
                   <Shield size={16} className="text-emerald-600 mr-2 mt-0.5" />
                   销售：全速进攻加拿大市场，替代 Garmin 份额。
                 </p>
               ) : (
                 <p className="text-sm text-gray-700 flex items-start">
                   <Shield size={16} className="text-teal-600 mr-2 mt-0.5" />
                   销售：拓展南美农业 B2B 渠道。
                 </p>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductStrategy;