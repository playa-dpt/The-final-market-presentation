import { Product, SalesPlan, RdTask, MarketScore } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'T16_T18',
    name: 'T16 / T18 (高端手持机版)',
    category: 'High-End',
    specs: ['VHF 无线电 + 4G 全网通', '电子罗盘', '独立手持机', 'IPX7 高强度三防'],
    targetMarkets: ['澳大利亚 (内陆)', '北欧 (芬兰/瑞典)', '俄罗斯 (西伯利亚)'],
    keySellingPoint: '硬核离网首选：直接对标 Garmin Alpha 系列。核心在于“有信号用4G，没信号切VHF”，永不失联。',
  },
  {
    id: 'T10_T11',
    name: 'T10 / T11 (中端进阶版)',
    category: 'Mid-Range',
    specs: ['4G + 2G 网络', '拍照/视频 (T10)', '双向语音对讲', '听音辨位'],
    targetMarkets: ['加拿大 (全境)', '西欧 (法国/西班牙)', '美国 (非狩猎区)'],
    keySellingPoint: '填补真空神器：在禁用 VHF 的地区（如加拿大），这是目前最强的合法替代方案，强调“看得见、听得着”。',
  },
  {
    id: 'T8',
    name: 'T8 (入门基础版)',
    category: 'Entry',
    specs: ['2G 网络', '基础定位', '极简设计', '超长续航'],
    targetMarkets: ['南美洲 (阿根廷/巴西)', '东南亚', '东欧'],
    keySellingPoint: '极致性价比：针对价格敏感型市场，作为“入门第一台”定位器，主打耐用和便宜。',
  },
];

export const MARKET_SCORES: MarketScore[] = [
  {
    region: '加拿大',
    vacuumScore: 9.5, // Garmin Astro 900 停产，市场真空巨大
    regulatoryRisk: 8.0, // ISED 监管极严，但只要不用 MURS 就在红线内
    technicalBarrier: 7.0, // 需要 4G 覆盖好的区域或 LoRa 改频
    totalScore: 8.8, // 极高推荐
    details: 'Garmin 留下的巨大真空，必须用蜂窝版(T10/11)或合规LoRa切入。'
  },
  {
    region: '澳大利亚',
    vacuumScore: 8.0, // 需求刚性，野猪泛滥
    regulatoryRisk: 6.0, // ACMA LIPD 2025 新规，避开天文台即可
    technicalBarrier: 9.0, // 物理环境极其恶劣，需要防撕裂
    totalScore: 7.9, // 高推荐，但需硬件改型
    details: '需特别加强硬件抗咬合能力，并注意天文台区域的无线电静默要求。'
  },
  {
    region: '北欧 (瑞典/芬兰)',
    vacuumScore: 7.5, // 狩猎文化深厚
    regulatoryRisk: 9.0, // 动物福利法极严，电击功能是红线
    technicalBarrier: 8.0, // 低温电池挑战
    totalScore: 7.2, // 中高推荐，需“纯追踪”固件
    details: '必须彻底移除电击功能以符合动物福利法，且需优化低温电池性能。'
  },
  {
    region: '美国',
    vacuumScore: 4.0, // Garmin 主场，高度饱和
    regulatoryRisk: 2.0, // MURS 频段开放，法规门槛低
    technicalBarrier: 5.0,
    totalScore: 5.5, // 低推荐，竞争太激烈
    details: '市场饱和度高，Garmin 统治力强，仅作为次要市场考虑。'
  },
  {
    region: '俄罗斯',
    vacuumScore: 7.0,
    regulatoryRisk: 8.5, // 数据主权、GLONASS 强制
    technicalBarrier: 6.0,
    totalScore: 6.5, // 潜力大但地缘政治风险高
    details: '存在数据主权和GLONASS强制要求，且地缘政治风险较高。'
  }
];

export const SALES_PLANS: SalesPlan[] = [
  {
    region: '加拿大 (The Vacuum)',
    gmiScore: 8.8,
    rationale: 'Garmin Astro 900 停产导致市场上缺乏合法的长距离离网设备。T10/T11 (4G版) 是完美的合法替代品。',
    complianceCheck: [
      '严禁销售美版 VHF (MURS频段)，ISED 罚款极重',
      '必须确认魁北克省关于电子项圈的最新禁令',
      '所有设备需印有 IC ID (Industry Canada ID)'
    ],
    channels: [
      { type: '专业经销商', focus: '主攻曾销售 Garmin Astro 的枪店 (Gun Shops) 和户外店' },
      { type: '社群', focus: 'Facebook "Hunting Dogs Canada" 群组' }
    ],
    scripts: [
      {
        title: '法规恐惧打击',
        painPoint: '客户担心买到水货被 ISED 罚款 ($25,000/天)',
        script: '“老板，我知道以前大家都偷偷用美版，但最近 ISED 查得严。一旦被没收还要罚几万刀，生意就白做了。我们的 T10 是加拿大合规频段，有 IC ID，您可以放心摆在柜台卖，完全合法。”',
        psychology: '恐惧营销 (Fear Appeal)：利用对法律制裁的恐惧，将合规性转化为核心卖点。'
      },
      {
        title: '信号焦虑化解',
        painPoint: '担心 4G 在深山没信号',
        script: '“没错，深山里确实没信号。但您可以看看 T16 的 LoRa 版，它不用手机网，也不用 SIM 卡，直接点对点 15 公里传输，而且频段是 915MHz，完全符合加拿大规定。”',
        psychology: '提供替代方案 (Alternative)：承认痛点，并给出具体的解决方案。'
      }
    ],
    chartData: [
      { name: 'Q1', sales: 200, competitor: 800 },
      { name: 'Q2', sales: 500, competitor: 750 },
      { name: 'Q3', sales: 1200, competitor: 600 },
      { name: 'Q4', sales: 2500, competitor: 400 },
    ],
    phases: [
      {
        phaseName: '第一阶段：合规渗透 (Q1-Q2)',
        timeframe: '1-3 个月',
        actions: [
          '向经销商发送“合规白皮书”',
          '提供 50 台 T10 样机给 KOL 试用'
        ],
        subActions: [
          '制作对比表格：美版 MURS 设备 vs Guptomes 合规设备罚款风险对比',
          '在魁北克法语区寻找 3 名有影响力的猎人博主',
          '确保所有样机包装盒上贴有显眼的 "IC ID Certified" 标签'
        ],
        managerNote: '注意：魁北克省对英语物料很敏感，必须提供纯法语说明书。',
        kpi: '开发 10 家核心经销商，铺货 200 台'
      },
      {
        phaseName: '第二阶段：LoRa 突围 (Q3-Q4)',
        timeframe: '6-12 个月',
        actions: [
          '引入 T16 (915MHz LoRa 改版)',
          '主打“无月费、长距离”'
        ],
        subActions: [
          '在落基山脉地区组织实地拉距测试直播',
          '针对 Garmin 订阅费涨价，推出“以旧换新”活动'
        ],
        managerNote: 'T16 的 LoRa 固件必须锁死在 902-928MHz 之间，严禁溢出。',
        kpi: '占据加拿大非Garmin市场 30% 份额'
      }
    ]
  },
  {
    region: '澳大利亚 (The Outback)',
    gmiScore: 7.9,
    rationale: '极端的野猪狩猎环境需要极端的硬件。竞品通常不够结实。',
    complianceCheck: [
      'ACMA LIPD 2025 合规确认',
      'MRO 天文台 70km 禁区软件锁',
      '各州电击禁令 (NSW/QLD 差异)'
    ],
    channels: [
      { type: 'B2B 定制', focus: '与当地防撕裂背心/项圈制造商 (如 Pig Dog Supplies) 合作' },
      { type: '直销', focus: '野猪狩猎协会 (APHA) 赞助' }
    ],
    scripts: [
      {
        title: '耐用性证明',
        painPoint: '狗被野猪咬，设备一咬就碎',
        script: '“Mate (伙计)，这不仅是个定位器，这是块砖头。我们的外壳用的是坦克级工程塑料，加上这层防撕裂护套，就算野猪牙穿透了背心，这机器也能发信号。”',
        psychology: '夸张与隐喻 (Metaphor)：用“砖头”构建坚固的心理预期，迎合澳洲硬汉文化。'
      },
      {
        title: '天文台合规',
        painPoint: '在西澳打猎怕干扰天文台被抓',
        script: '“放心，我们的芯片里写了 Murchison 天文台的死区代码。只要你靠近那个区域，无线电自动关，GPS 照样记录。你只管打猎，不用担心 ACMA 找麻烦。”',
        psychology: '免责担保 (Reassurance)：消除用户对复杂技术法规的焦虑。'
      }
    ],
    chartData: [
      { name: 'Q1', sales: 100, competitor: 500 },
      { name: 'Q2', sales: 300, competitor: 480 },
      { name: 'Q3', sales: 800, competitor: 450 },
      { name: 'Q4', sales: 1500, competitor: 400 },
    ],
    phases: [
      {
        phaseName: '第一阶段：破坏性测试 (Q2)',
        timeframe: '2 个月',
        actions: [
          '寄送 T16/T18 给博主进行暴力测试',
          '开发适配 "Fire Hose Collar" 的支架'
        ],
        subActions: [
          '拍摄一段用卡车碾压 T18 的视频上传 YouTube',
          '寄送 3D 打印的支架样品给 "Pig Dog Supplies" 确认尺寸',
          '在西澳进行 MRO 边界信号切断实测'
        ],
        managerNote: '必须强调 IPX7 防水，澳洲猎人经常需要过河。',
        kpi: '获得 3 个头部博主推荐视频，完成硬件适配'
      },
      {
        phaseName: '第二阶段：渠道铺设 (Q3)',
        timeframe: '持续进行',
        actions: [
          '在乡村用品店 (Rural Stores) 铺货',
          '承诺“坏了直接换新”'
        ],
        subActions: [
          '设计专门的 "Aussie Edition" 包装盒，印上袋鼠和野猪图标',
          '给经销商提供“摔不烂”展示台'
        ],
        managerNote: '售后速度是关键，必须在悉尼或布里斯班建立备件仓。',
        kpi: '月销量突破 500 台'
      }
    ]
  },
  {
    region: '西欧 (The Ethical Market)',
    gmiScore: 7.2,
    rationale: '动物福利法导致传统电击项圈被禁。必须转型为“纯追踪”工具。',
    complianceCheck: [
      'CE RED 指令 (无线电)',
      'GDPR 数据隐私',
      '彻底移除电击功能的物理组件'
    ],
    channels: [
      { type: '大型连锁', focus: 'Decathlon (迪卡侬) 狩猎部门洽谈' },
      { type: '在线', focus: 'Amazon 欧洲站 (需品牌备案)' }
    ],
    scripts: [
      {
        title: '道德狩猎 (Ethical Hunting)',
        painPoint: '电击被视为残忍，甚至违法',
        script: '“先生，我们都知道电击项圈在现在的法律环境下风险很大。T11 不仅完全合规（物理无电击），而且它的双向语音功能比电击更有效——您可以直接喊狗回来，这才是符合现代狩猎伦理的指挥方式。”',
        psychology: '价值观共鸣 (Value Alignment)：将产品功能上升到道德高度，消除用户的负罪感。'
      },
      {
        title: '驱赶狩猎 (Driven Hunt)',
        painPoint: '多只狗协同困难，不知道狗在哪里',
        script: '“在驱赶式狩猎中，您需要知道所有狗的位置。我们的 App 专为 Driven Hunt 设计，一个屏幕看 20 只狗，而且可以用 T11 的麦克风听周围环境，判断狗是在叫还是在跑。”',
        psychology: '场景化销售 (Scenario Selling)：直接描述用户熟悉的场景，展示产品效用。'
      }
    ],
    chartData: [
      { name: 'Q1', sales: 150, competitor: 600 },
      { name: 'Q2', sales: 400, competitor: 550 },
      { name: 'Q3', sales: 900, competitor: 500 },
      { name: 'Q4', sales: 2000, competitor: 400 },
    ],
    phases: [
      {
        phaseName: '单一阶段：纯净版上市',
        timeframe: '立即执行',
        actions: [
          '推出 T16 "Pure Track" 版本',
          '重点营销 T11 的语音功能',
          '推广 App 的多狗同屏功能'
        ],
        subActions: [
          '制作法语、德语、西班牙语的 App 操作视频',
          '与当地狩猎协会合作举办“无电击训练”讲座',
          '在产品外观上使用绿色/橙色高可视度涂装，符合安全狩猎要求'
        ],
        managerNote: '务必确认服务器数据存储在法兰克福，以符合 GDPR。',
        kpi: '在法国和西班牙成为 Top 3 的非电击追踪品牌'
      }
    ]
  }
];

export const RD_TASKS: RdTask[] = [
  {
    title: '硬件：澳洲版“坦克甲”外壳',
    type: 'Hardware',
    impact: 'Critical',
    description: '针对澳大利亚野猪狩猎开发。需通过 200kg 咬合力测试，并适配 50mm 宽度的消防水带项圈。这是进入澳洲的前提。',
    deadline: '2026 Q3',
  },
  {
    title: '固件：MRO 天文台地理围栏',
    type: 'Firmware',
    impact: 'High',
    description: '写入 ACMA 要求的默奇森天文台坐标 (Murchison Radio-astronomy Observatory)。一旦 GPS 定位进入 70km 半径，强制切断 VHF 发射。',
    deadline: '2026 9月',
  },
  {
    title: '认证：ISED 加拿大认证',
    type: 'Compliance',
    impact: 'Critical',
    description: '获取 T10/T11 的 IC ID。如果这步不做，经销商不敢大规模进货。需准备全套射频测试报告。',
    deadline: '2026 Q2',
  },
  {
    title: '软件：Pure Track 锁定模式',
    type: 'Firmware',
    impact: 'High',
    description: '开发一种不可逆的软件锁，供出口欧洲使用。界面上完全隐藏 Stimulation (电击) 选项，确保符合动物福利法。',
    deadline: '技术已完成',
  },
];
