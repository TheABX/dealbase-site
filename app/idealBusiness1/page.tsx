"use client";
import React, { useState } from "react";
import { FaCloud, FaShoppingCart, FaEnvelope, FaGlobe, FaUsers, FaRegFileAlt, FaRobot, FaShopify, FaMobileAlt, FaStore, FaBitcoin, FaQuestionCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const startupTypes = [
  { label: "SaaS", icon: <FaCloud size={32} /> },
  { label: "Ecommerce", icon: <FaShoppingCart size={32} /> },
  { label: "Newsletter", icon: <FaEnvelope size={32} /> },
  { label: "Digital", icon: <FaGlobe size={32} /> },
  { label: "Agency", icon: <FaUsers size={32} /> },
  { label: "Content", icon: <FaRegFileAlt size={32} /> },
  { label: "AI", icon: <FaRobot size={32} /> },
  { label: "Shopify app", icon: <FaShopify size={32} /> },
  { label: "Mobile app", icon: <FaMobileAlt size={32} /> },
  { label: "Marketplace", icon: <FaStore size={32} /> },
  { label: "Crypto", icon: <FaBitcoin size={32} /> },
  { label: "Other", icon: <FaQuestionCircle size={32} /> },
];

const industryTags = [
  "Technology", "Healthcare", "Finance", "Education", "Retail", "Manufacturing", 
  "Real Estate", "Entertainment", "Food & Beverage", "Travel", "Fitness", "Beauty",
  "Automotive", "Legal", "Marketing", "Consulting", "Construction", "Agriculture"
];

const businessModelTags = [
  "SaaS", "Marketplace", "E-commerce", "Subscription", "Freemium", "Advertising",
  "Commission", "Licensing", "Franchise", "Direct Sales", "B2B", "B2C", "D2C"
];

const techStackTags = [
  "React", "Node.js", "Python", "JavaScript", "TypeScript", "PHP", "Ruby", "Java",
  "AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "MongoDB", "PostgreSQL",
  "MySQL", "Redis", "GraphQL", "REST API", "Mobile (iOS)", "Mobile (Android)"
];

const recommendationStyles = ["Flexible", "Strict"];

export default function IdealStartupPage1() {
  console.log('IdealBusiness1 component loaded');
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [minMultiple, setMinMultiple] = useState(0);
  const [maxMultiple, setMaxMultiple] = useState(20);
  const [minProfitMultiple, setMinProfitMultiple] = useState(0);
  const [maxProfitMultiple, setMaxProfitMultiple] = useState(20);
  const [minTTM, setMinTTM] = useState(0);
  const [maxTTM, setMaxTTM] = useState(1000000);
  const [minTTMProfit, setMinTTMProfit] = useState(0);
  const [maxTTMProfit, setMaxTTMProfit] = useState(200000);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedBusinessModels, setSelectedBusinessModels] = useState<string[]>([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>([]);
  const [customIndustry, setCustomIndustry] = useState('');
  const [customBusinessModel, setCustomBusinessModel] = useState('');
  const [customTechStack, setCustomTechStack] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [areaInput, setAreaInput] = useState('');
  const [recommendationStyle, setRecommendationStyle] = useState('');
  
  const australianAreas = [
    '2000 - Sydney NSW',
    '3000 - Melbourne VIC',
    '4000 - Brisbane QLD',
    '5000 - Adelaide SA',
    '6000 - Perth WA',
    '7000 - Hobart TAS',
    '0800 - Darwin NT',
    '2600 - Canberra ACT',
    // ...add more as needed
  ];

  const filteredAreas = areaInput
    ? australianAreas.filter(a => a.toLowerCase().includes(areaInput.toLowerCase()))
    : australianAreas;

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry) ? prev.filter((i) => i !== industry) : [...prev, industry]
    );
  };

  const toggleBusinessModel = (model: string) => {
    setSelectedBusinessModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  const toggleTechStack = (tech: string) => {
    setSelectedTechStacks((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const addCustomIndustry = () => {
    if (customIndustry.trim() && !selectedIndustries.includes(customIndustry.trim())) {
      setSelectedIndustries([...selectedIndustries, customIndustry.trim()]);
      setCustomIndustry('');
    }
  };

  const addCustomBusinessModel = () => {
    if (customBusinessModel.trim() && !selectedBusinessModels.includes(customBusinessModel.trim())) {
      setSelectedBusinessModels([...selectedBusinessModels, customBusinessModel.trim()]);
      setCustomBusinessModel('');
    }
  };

  const addCustomTechStack = () => {
    if (customTechStack.trim() && !selectedTechStacks.includes(customTechStack.trim())) {
      setSelectedTechStacks([...selectedTechStacks, customTechStack.trim()]);
      setCustomTechStack('');
    }
  };

  // Format price for display
  const formatPrice = (val: number) =>
    val >= 2000000 ? "$2,000,000+" : val.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  let content;
  try {
    content = (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 pb-24">
        <div style={{color: 'green', fontWeight: 'bold', marginBottom: 24}}>Component loaded</div>
        {step === 1 && (
          <>
            <h1 className="text-3xl font-extrabold text-[#23235B] mb-10 text-center">Which startup types interest you?</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {startupTypes.map(({ label, icon }) => (
                <button
                  key={label}
                  type="button"
                  className={`flex flex-col items-center justify-center border-2 rounded-xl px-8 py-8 gap-3 font-semibold text-lg transition-all shadow-sm
                    ${selectedTypes.includes(label)
                      ? 'border-[#4F5DFF] bg-[#F7F8FC] text-[#4F5DFF]'
                      : 'border-dashed border-[#B3B8E0] bg-white text-[#23235B] hover:border-[#4F5DFF]/60'}
                  `}
                  onClick={() => toggleType(label)}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-end w-full max-w-3xl">
              <button
                type="button"
                className={`flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg transition-colors
                  ${selectedTypes.length > 0
                    ? 'bg-[#4F5DFF] text-white hover:bg-[#3B4BCC]'
                    : 'bg-[#E6ECFA] text-[#7B849B] cursor-not-allowed'}
                `}
                disabled={selectedTypes.length === 0}
                onClick={() => setStep(2)}
              >
                Next <span aria-hidden>→</span>
              </button>
            </div>
            <div className="fixed left-0 bottom-0 w-full h-2 bg-[#E6ECFA]">
              <div className="h-2 bg-[#4F5DFF] transition-all" style={{ width: '25%' }} />
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h1 className="text-3xl font-extrabold text-[#23235B] mb-10 text-center">What is your ideal asking price range?</h1>
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center mb-8">
              <div className="w-full h-32 flex items-end gap-1 mb-6">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#4F5DFF] rounded-t"
                    style={{
                      width: 6,
                      height: Math.random() * 80 + 10,
                      opacity: i === 0 || i === 39 ? 1 : 0.5,
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-4 w-full max-w-md justify-center">
                <div className="flex flex-col items-start w-1/2">
                  <label className="text-[#7B849B] mb-1">Min</label>
                  <input
                    type="number"
                    min={0}
                    max={maxPrice}
                    value={minPrice}
                    onChange={e => setMinPrice(Number(e.target.value))}
                    className="border-2 border-[#E6ECFA] rounded-xl px-6 py-4 w-full text-lg focus:outline-none focus:border-[#4F5DFF]"
                    placeholder="$0"
                  />
                </div>
                <div className="flex flex-col items-start w-1/2">
                  <label className="text-[#7B849B] mb-1">Max</label>
                  <input
                    type="number"
                    min={minPrice}
                    max={2000000}
                    value={maxPrice}
                    onChange={e => setMaxPrice(Number(e.target.value))}
                    className="border-2 border-[#E6ECFA] rounded-xl px-6 py-4 w-full text-lg focus:outline-none focus:border-[#4F5DFF]"
                    placeholder="$2,000,000+"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-2 w-full max-w-md justify-center">
                <span className="text-[#7B849B] text-base">{formatPrice(minPrice)}</span>
                <span className="text-[#7B849B] text-base">–</span>
                <span className="text-[#7B849B] text-base">{formatPrice(maxPrice)}</span>
              </div>
            </div>
            <div className="flex justify-between w-full max-w-3xl mt-8">
              <button
                type="button"
                className="font-semibold text-[#23235B] bg-transparent px-8 py-4 rounded-xl text-lg hover:underline"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg transition-colors
                  ${(minPrice < maxPrice)
                    ? 'bg-[#23235B] text-white hover:bg-[#18194A]'
                    : 'bg-[#E6ECFA] text-[#7B849B] cursor-not-allowed'}
                `}
                disabled={minPrice >= maxPrice}
                onClick={() => setStep(3)}
              >
                Next <span aria-hidden>→</span>
              </button>
            </div>
            <div className="fixed left-0 bottom-0 w-full h-2 bg-[#E6ECFA]">
              <div className="h-2 bg-[#4F5DFF] transition-all" style={{ width: '50%' }} />
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h1 className="text-3xl font-extrabold text-[#23235B] mb-10 text-center">What is your ideal revenue multiple range?</h1>
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center mb-8">
              <div className="w-full h-32 flex items-end gap-1 mb-6">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#4F5DFF] rounded-t"
                    style={{
                      width: 10,
                      height: Math.random() * 80 + 10,
                      opacity: i === 0 || i === 29 ? 1 : 0.5,
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-4 w-full max-w-md justify-center">
                <div className="flex flex-col items-start w-1/2">
                  <label className="text-[#7B849B] mb-1">Min</label>
                  <input
                    type="number"
                    min={0}
                    max={maxMultiple}
                    value={minMultiple}
                    onChange={e => setMinMultiple(Number(e.target.value))}
                    className="border-2 border-[#E6ECFA] rounded-xl px-6 py-4 w-full text-lg focus:outline-none focus:border-[#4F5DFF]"
                    placeholder="0x"
                  />
                </div>
                <div className="flex flex-col items-start w-1/2">
                  <label className="text-[#7B849B] mb-1">Max</label>
                  <input
                    type="number"
                    min={minMultiple}
                    max={20}
                    value={maxMultiple}
                    onChange={e => setMaxMultiple(Number(e.target.value))}
                    className="border-2 border-[#E6ECFA] rounded-xl px-6 py-4 w-full text-lg focus:outline-none focus:border-[#4F5DFF]"
                    placeholder="20x+"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-2 w-full max-w-md justify-center">
                <span className="text-[#7B849B] text-base">{minMultiple}x</span>
                <span className="text-[#7B849B] text-base">–</span>
                <span className="text-[#7B849B] text-base">{maxMultiple === 20 ? '20x+' : `${maxMultiple}x`}</span>
              </div>
            </div>
            <div className="flex justify-between w-full max-w-3xl mt-8">
              <button
                type="button"
                className="font-semibold text-[#23235B] bg-transparent px-8 py-4 rounded-xl text-lg hover:underline"
                onClick={() => setStep(2)}
              >
                Back
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg transition-colors
                  ${(minMultiple < maxMultiple)
                    ? 'bg-[#23235B] text-white hover:bg-[#18194A]'
                    : 'bg-[#E6ECFA] text-[#7B849B] cursor-not-allowed'}
                `}
                disabled={minMultiple >= maxMultiple}
                onClick={() => setStep(4)}
              >
                Next <span aria-hidden>→</span>
              </button>
            </div>
            <div className="fixed left-0 bottom-0 w-full h-2 bg-[#E6ECFA]">
              <div className="h-2 bg-[#4F5DFF] transition-all" style={{ width: '75%' }} />
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <h1 className="text-3xl font-extrabold text-[#23235B] mb-10 text-center">What is your ideal profit multiple range?</h1>
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center mb-8">
              <div className="w-full h-32 flex items-end gap-1 mb-6">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#4F5DFF] rounded-t"
                    style={{
                      width: 10,
                      height: Math.random() * 80 + 10,
                      opacity: i === 0 || i === 29 ? 1 : 0.5,
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-4 w-full max-w-md justify-center">
                <div className="flex flex-col items-start w-1/2">
                  <label className="text-[#7B849B] mb-1">Min</label>
                  <input
                    type="number"
                    min={0}
                    max={maxProfitMultiple}
                    value={minProfitMultiple}
                    onChange={e => setMinProfitMultiple(Number(e.target.value))}
                    className="border-2 border-[#E6ECFA] rounded-xl px-6 py-4 w-full text-lg focus:outline-none focus:border-[#4F5DFF]"
                    placeholder="0x"
                  />
                </div>
                <div className="flex flex-col items-start w-1/2">
                  <label className="text-[#7B849B] mb-1">Max</label>
                  <input
                    type="number"
                    min={minProfitMultiple}
                    max={20}
                    value={maxProfitMultiple}
                    onChange={e => setMaxProfitMultiple(Number(e.target.value))}
                    className="border-2 border-[#E6ECFA] rounded-xl px-6 py-4 w-full text-lg focus:outline-none focus:border-[#4F5DFF]"
                    placeholder="20x+"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-2 w-full max-w-md justify-center">
                <span className="text-[#7B849B] text-base">{minProfitMultiple}x</span>
                <span className="text-[#7B849B] text-base">–</span>
                <span className="text-[#7B849B] text-base">{maxProfitMultiple === 20 ? '20x+' : `${maxProfitMultiple}x`}</span>
              </div>
            </div>
            <div className="flex justify-between w-full max-w-3xl mt-8">
              <button
                type="button"
                className="font-semibold text-[#23235B] bg-transparent px-8 py-4 rounded-xl text-lg hover:underline"
                onClick={() => setStep(3)}
              >
                Back
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg transition-colors
                  ${(minProfitMultiple < maxProfitMultiple)
                    ? 'bg-[#23235B] text-white hover:bg-[#18194A]'
                    : 'bg-[#E6ECFA] text-[#7B849B] cursor-not-allowed'}
                `}
                disabled={minProfitMultiple >= maxProfitMultiple}
                onClick={() => setStep(5)}
              >
                Next <span aria-hidden>→</span>
              </button>
            </div>
            <div className="fixed left-0 bottom-0 w-full h-2 bg-[#E6ECFA]">
              <div className="h-2 bg-[#4F5DFF] transition-all" style={{ width: '87.5%' }} />
            </div>
          </>
        )}
        {step === 5 && (
          <>
            <h1 className="text-3xl font-extrabold text-[#23235B] mb-10 text-center">What is your ideal time to market range?</h1>
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center mb-8">
              <div className="w-full h-32 flex items-end gap-1 mb-6">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#4F5DFF] rounded-t"
                    style={{
                      width: 10,
                      height: Math.random() * 80 + 10,
                      opacity: i === 0 || i === 29 ? 1 : 0.5,
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-4 w-full max-w-md justify-center">
                <div className="flex flex-col items-start w-1/2">
                  <label className="text-[#7B849B] mb-1">Min</label>
                  <input
                    type="number"
                    min={0}
                    max={maxTTM}
                    value={minTTM}
                    onChange={e => setMinTTM(Number(e.target.value))}
                    className="border-2 border-[#E6ECFA] rounded-xl px-6 py-4 w-full text-lg focus:outline-none focus:border-[#4F5DFF]"
                    placeholder="0 months"
                  />
                </div>
                <div className="flex flex-col items-start w-1/2">
                  <label className="text-[#7B849B] mb-1">Max</label>
                  <input
                    type="number"
                    min={minTTM}
                    max={1000000}
                    value={maxTTM}
                    onChange={e => setMaxTTM(Number(e.target.value))}
                    className="border-2 border-[#E6ECFA] rounded-xl px-6 py-4 w-full text-lg focus:outline-none focus:border-[#4F5DFF]"
                    placeholder="1,000,000 months+"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-2 w-full max-w-md justify-center">
                <span className="text-[#7B849B] text-base">{minTTM} months</span>
                <span className="text-[#7B849B] text-base">–</span>
                <span className="text-[#7B849B] text-base">{maxTTM === 1000000 ? '1,000,000 months+' : `${maxTTM} months`}</span>
              </div>
            </div>
            <div className="flex justify-between w-full max-w-3xl mt-8">
              <button
                type="button"
                className="font-semibold text-[#23235B] bg-transparent px-8 py-4 rounded-xl text-lg hover:underline"
                onClick={() => setStep(4)}
              >
                Back
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg transition-colors
                  ${(minTTM < maxTTM)
                    ? 'bg-[#23235B] text-white hover:bg-[#18194A]'
                    : 'bg-[#E6ECFA] text-[#7B849B] cursor-not-allowed'}
                `}
                disabled={minTTM >= maxTTM}
                onClick={() => setStep(6)}
              >
                Next <span aria-hidden>→</span>
              </button>
            </div>
            <div className="fixed left-0 bottom-0 w-full h-2 bg-[#E6ECFA]">
              <div className="h-2 bg-[#4F5DFF] transition-all" style={{ width: '93.75%' }} />
            </div>
          </>
        )}
        {step === 6 && (
          <>
            <h1 className="text-3xl font-extrabold text-[#23235B] mb-10 text-center">What is your ideal time to market profit range?</h1>
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center mb-8">
              <div className="w-full h-32 flex items-end gap-1 mb-6">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#4F5DFF] rounded-t"
                    style={{
                      width: 10,
                      height: Math.random() * 80 + 10,
                      opacity: i === 0 || i === 29 ? 1 : 0.5,
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-4 w-full max-w-md justify-center">
                <div className="flex flex-col items-start w-1/2">
                  <label className="text-[#7B849B] mb-1">Min</label>
                  <input
                    type="number"
                    min={0}
                    max={maxTTMProfit}
                    value={minTTMProfit}
                    onChange={e => setMinTTMProfit(Number(e.target.value))}
                    className="border-2 border-[#E6ECFA] rounded-xl px-6 py-4 w-full text-lg focus:outline-none focus:border-[#4F5DFF]"
                    placeholder="0"
                  />
                </div>
                <div className="flex flex-col items-start w-1/2">
                  <label className="text-[#7B849B] mb-1">Max</label>
                  <input
                    type="number"
                    min={minTTMProfit}
                    max={200000}
                    value={maxTTMProfit}
                    onChange={e => setMaxTTMProfit(Number(e.target.value))}
                    className="border-2 border-[#E6ECFA] rounded-xl px-6 py-4 w-full text-lg focus:outline-none focus:border-[#4F5DFF]"
                    placeholder="200,000"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-2 w-full max-w-md justify-center">
                <span className="text-[#7B849B] text-base">{minTTMProfit}</span>
                <span className="text-[#7B849B] text-base">–</span>
                <span className="text-[#7B849B] text-base">{maxTTMProfit}</span>
              </div>
            </div>
            <div className="flex justify-between w-full max-w-3xl mt-8">
              <button
                type="button"
                className="font-semibold text-[#23235B] bg-transparent px-8 py-4 rounded-xl text-lg hover:underline"
                onClick={() => setStep(5)}
              >
                Back
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg transition-colors
                  ${(minTTMProfit < maxTTMProfit)
                    ? 'bg-[#23235B] text-white hover:bg-[#18194A]'
                    : 'bg-[#E6ECFA] text-[#7B849B] cursor-not-allowed'}
                `}
                disabled={minTTMProfit >= maxTTMProfit}
                onClick={() => setStep(7)}
              >
                Next <span aria-hidden>→</span>
              </button>
            </div>
            <div className="fixed left-0 bottom-0 w-full h-2 bg-[#E6ECFA]">
              <div className="h-2 bg-[#4F5DFF] transition-all" style={{ width: '96.875%' }} />
            </div>
          </>
        )}
        {step === 7 && (
          <>
            <h1 className="text-3xl font-extrabold text-[#23235B] mb-10 text-center">What is your ideal industry?</h1>
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center mb-8">
              <div className="flex flex-wrap gap-4">
                {industryTags.map((industry) => (
                  <button
                    key={industry}
                    type="button"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-lg transition-colors
                      ${selectedIndustries.includes(industry)
                        ? 'bg-[#4F5DFF] text-white hover:bg-[#3B4BCC]'
                        : 'bg-[#E6ECFA] text-[#7B849B] hover:bg-[#4F5DFF]/10'}
                    `}
                    onClick={() => toggleIndustry(industry)}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between w-full max-w-3xl mt-8">
              <button
                type="button"
                className="font-semibold text-[#23235B] bg-transparent px-8 py-4 rounded-xl text-lg hover:underline"
                onClick={() => setStep(6)}
              >
                Back
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg transition-colors
                  ${selectedIndustries.length > 0
                    ? 'bg-[#23235B] text-white hover:bg-[#18194A]'
                    : 'bg-[#E6ECFA] text-[#7B849B] cursor-not-allowed'}
                `}
                disabled={selectedIndustries.length === 0}
                onClick={() => setStep(8)}
              >
                Next <span aria-hidden>→</span>
              </button>
            </div>
            <div className="fixed left-0 bottom-0 w-full h-2 bg-[#E6ECFA]">
              <div className="h-2 bg-[#4F5DFF] transition-all" style={{ width: '98.4375%' }} />
            </div>
          </>
        )}
        {step === 8 && (
          <>
            <h1 className="text-3xl font-extrabold text-[#23235B] mb-10 text-center">What is your ideal business model?</h1>
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center mb-8">
              <div className="flex flex-wrap gap-4">
                {businessModelTags.map((model) => (
                  <button
                    key={model}
                    type="button"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-lg transition-colors
                      ${selectedBusinessModels.includes(model)
                        ? 'bg-[#4F5DFF] text-white hover:bg-[#3B4BCC]'
                        : 'bg-[#E6ECFA] text-[#7B849B] hover:bg-[#4F5DFF]/10'}
                    `}
                    onClick={() => toggleBusinessModel(model)}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between w-full max-w-3xl mt-8">
              <button
                type="button"
                className="font-semibold text-[#23235B] bg-transparent px-8 py-4 rounded-xl text-lg hover:underline"
                onClick={() => setStep(7)}
              >
                Back
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg transition-colors
                  ${selectedBusinessModels.length > 0
                    ? 'bg-[#23235B] text-white hover:bg-[#18194A]'
                    : 'bg-[#E6ECFA] text-[#7B849B] cursor-not-allowed'}
                `}
                disabled={selectedBusinessModels.length === 0}
                onClick={() => setStep(9)}
              >
                Next <span aria-hidden>→</span>
              </button>
            </div>
            <div className="fixed left-0 bottom-0 w-full h-2 bg-[#E6ECFA]">
              <div className="h-2 bg-[#4F5DFF] transition-all" style={{ width: '99.21875%' }} />
            </div>
          </>
        )}
        {step === 9 && (
          <>
            <h1 className="text-3xl font-extrabold text-[#23235B] mb-10 text-center">What is your ideal tech stack?</h1>
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center mb-8">
              <div className="flex flex-wrap gap-4">
                {techStackTags.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-lg transition-colors
                      ${selectedTechStacks.includes(tech)
                        ? 'bg-[#4F5DFF] text-white hover:bg-[#3B4BCC]'
                        : 'bg-[#E6ECFA] text-[#7B849B] hover:bg-[#4F5DFF]/10'}
                    `}
                    onClick={() => toggleTechStack(tech)}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between w-full max-w-3xl mt-8">
              <button
                type="button"
                className="font-semibold text-[#23235B] bg-transparent px-8 py-4 rounded-xl text-lg hover:underline"
                onClick={() => setStep(8)}
              >
                Back
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg transition-colors
                  ${selectedTechStacks.length > 0
                    ? 'bg-[#23235B] text-white hover:bg-[#18194A]'
                    : 'bg-[#E6ECFA] text-[#7B849B] cursor-not-allowed'}
                `}
                disabled={selectedTechStacks.length === 0}
                onClick={() => setStep(10)}
              >
                Next <span aria-hidden>→</span>
              </button>
            </div>
            <div className="fixed left-0 bottom-0 w-full h-2 bg-[#E6ECFA]">
              <div className="h-2 bg-[#4F5DFF] transition-all" style={{ width: '99.609375%' }} />
            </div>
          </>
        )}
        {step === 10 && (
          <>
            <h1 className="text-3xl font-extrabold text-[#23235B] mb-10 text-center">What is your ideal area?</h1>
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center mb-8">
              <div className="flex flex-wrap gap-4">
                {filteredAreas.map((area) => (
                  <button
                    key={area}
                    type="button"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-lg transition-colors
                      ${selectedArea === area
                        ? 'bg-[#4F5DFF] text-white hover:bg-[#3B4BCC]'
                        : 'bg-[#E6ECFA] text-[#7B849B] hover:bg-[#4F5DFF]/10'}
                    `}
                    onClick={() => setSelectedArea(area)}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between w-full max-w-3xl mt-8">
              <button
                type="button"
                className="font-semibold text-[#23235B] bg-transparent px-8 py-4 rounded-xl text-lg hover:underline"
                onClick={() => setStep(9)}
              >
                Back
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg transition-colors
                  ${selectedArea.length > 0
                    ? 'bg-[#23235B] text-white hover:bg-[#18194A]'
                    : 'bg-[#E6ECFA] text-[#7B849B] cursor-not-allowed'}
                `}
                disabled={selectedArea.length === 0}
                onClick={() => setStep(11)}
              >
                Next <span aria-hidden>→</span>
              </button>
            </div>
            <div className="fixed left-0 bottom-0 w-full h-2 bg-[#E6ECFA]">
              <div className="h-2 bg-[#4F5DFF] transition-all" style={{ width: '99.8046875%' }} />
            </div>
          </>
        )}
      </div>
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    content = <div style={{ color: 'red', padding: 32 }}><b>Runtime Error:</b> {errorMessage}</div>;
  }
  return content;
}