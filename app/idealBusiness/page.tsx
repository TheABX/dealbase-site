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

export default function IdealStartupPage() {
  console.log('IdealBusiness component loaded');
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
      <div>hello</div>
    );
  } catch (error) {
    // TypeScript-safe error handling
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    content = <div>Error: {errorMessage}</div>;
  }
  return content;
} 