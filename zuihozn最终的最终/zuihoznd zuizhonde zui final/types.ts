export interface Product {
  id: string;
  name: string;
  category: 'High-End' | 'Mid-Range' | 'Entry';
  specs: string[];
  targetMarkets: string[];
  keySellingPoint: string;
}

export interface SalesScript {
  title: string;
  painPoint: string; // 客户痛点
  script: string; // 金牌话术
  psychology: string; // 心理学原理
}

export interface SalesChartData {
  name: string; // e.g. "Q1", "Q2"
  sales: number;
  competitor: number;
}

export interface SalesPhase {
  phaseName: string;
  timeframe: string;
  actions: string[];
  subActions?: string[]; // 更细致的执行动作
  managerNote?: string; // 经理批注/注意事项
  kpi: string;
}

export interface SalesPlan {
  region: string;
  gmiScore: number; // Guptomes Market Index Score
  rationale: string; // Why this score?
  complianceCheck: string[]; // Legal hurdles
  channels: {
    type: string;
    focus: string;
  }[];
  phases: SalesPhase[];
  scripts: SalesScript[]; // 针对该区域的销售话术
  chartData: SalesChartData[]; // 该区域的销售预测数据
}

export interface RdTask {
  title: string;
  type: 'Hardware' | 'Firmware' | 'Compliance';
  impact: 'Critical' | 'High' | 'Medium';
  description: string;
  deadline: string;
}

export interface MarketScore {
  region: string;
  vacuumScore: number; // 市场真空度 (1-10)
  regulatoryRisk: number; // 合规风险 (1-10, lower is better, handled as inverse in calculations)
  technicalBarrier: number; // 技术壁垒 (1-10)
  totalScore: number; // Calculated GMI
  details: string;
}

export enum TabView {
  DASHBOARD = 'DASHBOARD',
  PRODUCTS = 'PRODUCTS',
  SALES = 'SALES',
  RD = 'RD'
}
