import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, MapPin, Video, Upload, Image as ImageIcon, Loader2, Send, Wand2, MonitorPlay, AlertCircle } from 'lucide-react';

const AITools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'image-edit' | 'video-gen' | 'maps'>('image-edit');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Image Edit State
  const [editPrompt, setEditPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');

  // Video Gen State
  const [videoAspectRatio, setVideoAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [videoPrompt, setVideoPrompt] = useState('');

  // Maps State
  const [mapsQuery, setMapsQuery] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        setImageMimeType(file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const cleanBase64 = (data: string) => {
    return data.split(',')[1];
  };

  // 1. Image Editing (Gemini 2.5 Flash Image)
  const handleGenerateImage = async () => {
    if (!selectedImage || !editPrompt) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: cleanBase64(selectedImage),
                mimeType: imageMimeType,
              },
            },
            {
              text: editPrompt,
            },
          ],
        },
      });

      // Find image part
      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setResult(`data:image/png;base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          }
        }
      }
      if (!foundImage) {
        setError("未能生成图片，请重试。");
      }
    } catch (e: any) {
      setError(e.message || "生成失败");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Video Generation (Veo)
  const handleGenerateVideo = async () => {
    if (!selectedImage) return;
    
    // API Key Selection for Veo
    if (!await window.aistudio.hasSelectedApiKey()) {
      await window.aistudio.openSelectKey();
      if (!await window.aistudio.hasSelectedApiKey()) {
          setError("需要选择 API Key 才能使用视频生成功能。");
          return;
      }
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Re-initialize to ensure we have the selected key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        image: {
          imageBytes: cleanBase64(selectedImage),
          mimeType: imageMimeType,
        },
        prompt: videoPrompt || 'Animate this image cinematically', 
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: videoAspectRatio,
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({operation: operation});
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const videoBlob = await videoResponse.blob();
        setResult(URL.createObjectURL(videoBlob));
      } else {
        setError("生成失败，未返回视频链接。");
      }
    } catch (e: any) {
      setError(e.message || "视频生成过程中出错");
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Maps Grounding
  const handleMapsQuery = async () => {
    if (!mapsQuery) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: mapsQuery,
        config: {
          tools: [{googleMaps: {}}],
        },
      });

      const text = response.text;
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      
      setResult({ text, chunks });
    } catch (e: any) {
      setError(e.message || "查询失败");
    } finally {
      setIsLoading(false);
    }
  };

  const ToolTab = ({ id, icon: Icon, label }: { id: typeof activeTool; icon: any; label: string }) => (
    <button
      onClick={() => {
        setActiveTool(id);
        setResult(null);
        setError(null);
        setSelectedImage(null);
      }}
      className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
        activeTool === id
          ? 'bg-emerald-600 text-white shadow-md'
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Sparkles className="mr-3 text-emerald-600" />
          AI 战略实验室
        </h2>
        <p className="text-gray-500 mt-1">利用 GenAI 技术赋能营销内容创作与地理情报分析。</p>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-2">
        <ToolTab id="image-edit" icon={ImageIcon} label="营销物料生成 (Image Edit)" />
        <ToolTab id="video-gen" icon={Video} label="社交广告动效 (Veo)" />
        <ToolTab id="maps" icon={MapPin} label="地理情报 (Maps)" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 min-h-[500px]">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="mr-2" size={20} />
            {error}
          </div>
        )}

        {/* --- 1. Image Editing Interface --- */}
        {activeTool === 'image-edit' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                {selectedImage ? (
                  <img src={selectedImage} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-sm" />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <Upload size={48} className="mb-3 text-emerald-500" />
                    <p className="font-medium">点击上传产品原图</p>
                    <p className="text-xs mt-1">支持 T16/T18 等产品图</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">编辑指令 (Prompt)</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    placeholder="例如：Add a snowy forest background"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <button
                    onClick={handleGenerateImage}
                    disabled={isLoading || !selectedImage || !editPrompt}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">模型: gemini-2.5-flash-image (Nano Banana)</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 flex items-center justify-center border border-gray-100">
              {isLoading ? (
                <div className="text-center">
                  <Loader2 size={48} className="animate-spin text-emerald-500 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">正在施展魔法...</p>
                </div>
              ) : result ? (
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">生成结果</p>
                  <img src={result} alt="Generated" className="max-h-[400px] rounded-lg shadow-lg border-4 border-white" />
                  <a href={result} download="guptomes-marketing.png" className="inline-block mt-4 text-emerald-600 font-bold hover:underline">
                    下载图片
                  </a>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <ImageIcon size={64} className="mx-auto mb-4 opacity-20" />
                  <p>AI 生成的图片将显示在这里</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- 2. Video Generation Interface --- */}
        {activeTool === 'video-gen' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                {selectedImage ? (
                  <img src={selectedImage} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-sm" />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <Upload size={48} className="mb-3 text-emerald-500" />
                    <p className="font-medium">上传静态海报</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">画幅比例</label>
                    <select 
                      value={videoAspectRatio} 
                      onChange={(e) => setVideoAspectRatio(e.target.value as any)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-3 bg-white focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="16:9">16:9 (横屏广告)</option>
                      <option value="9:16">9:16 (抖音/Shorts)</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">提示词 (可选)</label>
                    <input
                      type="text"
                      value={videoPrompt}
                      onChange={(e) => setVideoPrompt(e.target.value)}
                      placeholder="Cinematic zoom..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-emerald-500"
                    />
                 </div>
              </div>

              <button
                onClick={handleGenerateVideo}
                disabled={isLoading || !selectedImage}
                className="w-full bg-emerald-600 text-white px-6 py-4 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 hover:bg-emerald-700 transition-colors"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <MonitorPlay />}
                <span>生成营销视频 (Veo)</span>
              </button>
              <p className="text-xs text-gray-400 text-center">需使用付费 API Key。模型: veo-3.1-fast-generate-preview</p>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 flex items-center justify-center border border-slate-800 relative overflow-hidden">
               {isLoading && (
                 <div className="absolute inset-0 bg-slate-900/80 z-10 flex flex-col items-center justify-center text-white">
                   <Loader2 size={48} className="animate-spin text-emerald-500 mb-4" />
                   <p className="font-medium animate-pulse">视频渲染中 (约需 1-2 分钟)...</p>
                 </div>
               )}
               {result ? (
                 <video controls autoPlay loop className="max-h-[400px] w-full rounded-lg shadow-2xl">
                   <source src={result} type="video/mp4" />
                   您的浏览器不支持视频标签。
                 </video>
               ) : (
                 <div className="text-center text-slate-600">
                    <Video size={64} className="mx-auto mb-4 opacity-20" />
                    <p>视频预览区域</p>
                 </div>
               )}
            </div>
          </div>
        )}

        {/* --- 3. Maps Intelligence Interface --- */}
        {activeTool === 'maps' && (
          <div className="flex flex-col h-full">
            <div className="flex space-x-2 mb-6">
               <input
                type="text"
                value={mapsQuery}
                onChange={(e) => setMapsQuery(e.target.value)}
                placeholder="例如：Find hunting gear shops near Vancouver"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-sm"
               />
               <button
                onClick={handleMapsQuery}
                disabled={isLoading || !mapsQuery}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
               >
                 {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
               </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 flex-1 border border-gray-100 overflow-y-auto">
               {isLoading ? (
                 <div className="flex items-center text-gray-500">
                   <Loader2 className="animate-spin mr-3 text-emerald-500" />
                   正在查询 Google Maps 实时数据...
                 </div>
               ) : result ? (
                 <div className="space-y-6">
                   <div className="prose prose-sm max-w-none text-gray-800">
                      <p className="whitespace-pre-wrap leading-relaxed">{result.text}</p>
                   </div>
                   
                   {result.chunks && result.chunks.length > 0 && (
                     <div className="mt-6 pt-6 border-t border-gray-200">
                       <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">数据来源 (Grounding Data)</h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {result.chunks.map((chunk: any, idx: number) => {
                           if (chunk.web?.uri) {
                             return (
                               <a key={idx} href={chunk.web.uri} target="_blank" rel="noreferrer" className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 transition-colors shadow-sm">
                                  <div className="bg-emerald-100 p-2 rounded mr-3 text-emerald-600"><Globe size={16}/></div>
                                  <div className="overflow-hidden">
                                    <p className="text-sm font-bold text-gray-900 truncate">{chunk.web.title}</p>
                                    <p className="text-xs text-gray-500 truncate">{chunk.web.uri}</p>
                                  </div>
                               </a>
                             )
                           }
                           return null;
                         })}
                       </div>
                     </div>
                   )}
                 </div>
               ) : (
                 <div className="text-center text-gray-400 mt-12">
                   <MapPin size={48} className="mx-auto mb-4 opacity-20" />
                   <p>输入关于地点、商家或地理信息的查询</p>
                 </div>
               )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Icon helper
const Globe = ({size}: {size: number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
)

export default AITools;