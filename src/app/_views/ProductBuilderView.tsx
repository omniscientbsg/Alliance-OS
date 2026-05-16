"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles, Save, Box, Layers, Play, Settings, Shield, Plus, Trash2, ArrowRight, ChevronDown } from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define the schema for the form
const FormSchema = z.object({
  productName: z.string().min(2),
  productCode: z.string().min(2),
  sections: z.array(z.object({
    id: z.string(),
    name: z.string(),
    covers: z.array(z.object({
      id: z.string(),
      name: z.string(),
      isMandatory: z.boolean(),
      logicType: z.enum(["FlatFee", "RateOnSumInsured", "RateOnPremium"]),
      value: z.number()
    }))
  })),
  globalDeductible: z.number(),
  taxes: z.array(z.object({
    name: z.string(),
    rate: z.number(),
    isFlat: z.boolean()
  }))
});

type FormValues = z.infer<typeof FormSchema>;

export default function ProductBuilderView() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [testSumInsured, setTestSumInsured] = useState<number>(50000000);

  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      productName: "Motor Private Comprehensive",
      productCode: "1002",
      sections: [
        {
          id: "sec-1",
          name: "Main Vehicle",
          covers: [
            { id: "cv-1", name: "Own Damage", isMandatory: true, logicType: "RateOnSumInsured", value: 4.5 },
            { id: "cv-2", name: "Third Party Liability", isMandatory: true, logicType: "FlatFee", value: 118000 },
            { id: "cv-3", name: "Excess Protector", isMandatory: false, logicType: "RateOnPremium", value: 10.0 }
          ]
        }
      ],
      globalDeductible: 150000,
      taxes: [
        { name: "VAT", rate: 18, isFlat: false },
        { name: "Stamp Duty", rate: 1000, isFlat: true }
      ]
    }
  });

  const { fields: sectionFields, append: appendSection, remove: removeSection } = useFieldArray({
    control,
    name: "sections"
  });

  const formValues = watch();

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 500);
  };

  const onSubmit = (data: FormValues) => {
    alert("Draft saved to workspace successfully. Data: " + JSON.stringify(data));
  };

  // Pure function to calculate premium based on form state
  const calculatePremium = () => {
    let grossPremium = 0;
    const coverBreakdown: { name: string; amount: number; desc: string }[] = [];

    // Base covers
    formValues.sections?.forEach(section => {
      section.covers.forEach(cover => {
        let amount = 0;
        let desc = "";
        if (cover.logicType === "RateOnSumInsured") {
          amount = testSumInsured * (cover.value / 100);
          desc = `${cover.value}%`;
        } else if (cover.logicType === "FlatFee") {
          amount = cover.value;
          desc = "Flat";
        }
        
        if (cover.logicType !== "RateOnPremium") {
           grossPremium += amount;
           coverBreakdown.push({ name: cover.name, amount, desc });
        }
      });
    });

    // Modifiers (RateOnPremium)
    formValues.sections?.forEach(section => {
      section.covers.forEach(cover => {
        if (cover.logicType === "RateOnPremium") {
          const amount = grossPremium * (cover.value / 100);
          grossPremium += amount;
          coverBreakdown.push({ name: cover.name, amount, desc: `${cover.value}%` });
        }
      });
    });

    let totalPayable = grossPremium;
    const taxBreakdown: { name: string; amount: number }[] = [];

    formValues.taxes?.forEach(tax => {
      let amount = 0;
      if (tax.isFlat) {
        amount = tax.rate;
      } else {
        amount = grossPremium * (tax.rate / 100);
      }
      totalPayable += amount;
      taxBreakdown.push({ name: `${tax.name} ${tax.isFlat ? '' : `(${tax.rate}%)`}`, amount });
    });

    return { grossPremium, totalPayable, coverBreakdown, taxBreakdown };
  };

  const math = calculatePremium();

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      {/* Header & AI Prompt */}
      <div className="shrink-0 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Box className="w-6 h-6 text-indigo-500" />
              Product Studio
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Design insurance products using step-by-step UI wizards or AI natural language generation.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleSubmit(onSubmit)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors">
              <Save className="w-4 h-4" /> Save Draft
            </button>
            <button onClick={() => alert("Product deploying to UAT Environment. Reinsurance engine updating...")} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
              Deploy Product
            </button>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800 rounded-xl p-3 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-indigo-500 shrink-0" />
          <input 
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Describe a product to AI (e.g., 'Create a comprehensive motor fleet product with a 10% fleet discount and TZS 500k flat deductible')"
            className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
          <button className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm flex items-center gap-1">
            Build with AI <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        
        {/* Left: UI Builder Form */}
        <form className="w-[60%] flex flex-col bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden" onSubmit={handleSubmit(onSubmit)}>
          <div className="h-12 bg-slate-50 dark:bg-slate-900/50 flex items-center px-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
            <Settings className="w-4 h-4 text-slate-400 mr-2" />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Step-by-Step Configuration</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            
            {/* Base Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                1. Base Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Product Name</label>
                  <input type="text" {...register("productName")} className="w-full border border-slate-200 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500" />
                  {errors.productName && <span className="text-xs text-rose-500 mt-1">{errors.productName.message}</span>}
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Product Code</label>
                  <input type="text" {...register("productCode")} className="w-full border border-slate-200 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500 font-mono" />
                </div>
              </div>
            </div>

            {/* Hierarchical Coverages */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  2. Coverages (Hierarchical)
                </h3>
                <button type="button" onClick={() => appendSection({ id: Date.now().toString(), name: "New Section", covers: [] })} className="text-xs text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1"><Plus className="w-3 h-3"/> Add Section</button>
              </div>
              
              <div className="space-y-4">
                {sectionFields.map((section, sIndex) => (
                  <div key={section.id} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                    <div className="bg-slate-100 dark:bg-slate-800/50 p-3 flex justify-between items-center border-b border-slate-200 dark:border-slate-700">
                      <div className="flex gap-2 items-center">
                         <Layers className="w-4 h-4 text-slate-500" />
                         <input {...register(`sections.${sIndex}.name`)} className="bg-transparent border-none font-bold text-sm outline-none w-48 text-slate-900 dark:text-slate-100" />
                      </div>
                      <button type="button" onClick={() => removeSection(sIndex)} className="text-slate-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    
                    <div className="p-3 space-y-3 bg-white dark:bg-[#0f172a]">
                      {formValues.sections?.[sIndex]?.covers.map((cover, cIndex) => (
                        <div key={cover.id} className="flex items-start gap-4 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-800/20 group">
                          <Shield className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <input type="text" {...register(`sections.${sIndex}.covers.${cIndex}.name`)} className="bg-transparent border-none text-sm font-semibold text-slate-900 dark:text-slate-100 outline-none w-48" />
                              <label className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded uppercase font-bold flex items-center gap-1 cursor-pointer">
                                <input type="checkbox" {...register(`sections.${sIndex}.covers.${cIndex}.isMandatory`)} /> Mandatory
                              </label>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="text-xs">
                                <span className="text-slate-500 mr-1">Logic:</span>
                                <select {...register(`sections.${sIndex}.covers.${cIndex}.logicType`)} className="bg-transparent border-b border-dashed border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 font-medium outline-none pb-0.5 cursor-pointer">
                                  <option value="RateOnSumInsured">Rate on Sum Insured</option>
                                  <option value="FlatFee">Flat Fee</option>
                                  <option value="RateOnPremium">Rate on Premium</option>
                                </select>
                              </div>
                              <div className="text-xs">
                                <span className="text-slate-500 mr-1">Value:</span>
                                <input type="number" step="0.01" {...register(`sections.${sIndex}.covers.${cIndex}.value`, { valueAsNumber: true })} className="bg-transparent border-b border-dashed border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 font-mono font-medium outline-none w-24 pb-0.5" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Taxes & Deductibles */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                3. Global Modifiers (Taxes/Deductibles)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Standard Deductible</label>
                  <div className="flex items-center gap-2">
                    <select className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded p-1.5 text-xs text-slate-900 dark:text-slate-100"><option>Minimum Flat</option></select>
                    <input type="number" {...register("globalDeductible", { valueAsNumber: true })} className="flex-1 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded p-1.5 text-xs text-slate-900 dark:text-slate-100 font-mono" />
                  </div>
                </div>
                <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Applicable Taxes</label>
                  <div className="flex gap-2 text-xs flex-wrap">
                    {formValues.taxes?.map((t, idx) => (
                      <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-md font-medium border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                        {t.name} {t.isFlat ? `(Flat)` : `(${t.rate}%)`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </form>

        {/* Right: Live Preview */}
        <Card className="w-[40%] flex flex-col bg-slate-50 dark:bg-[#0a0f1d] border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="h-12 bg-white dark:bg-[#0f172a] flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
            <div className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-wider gap-2">
              <Layers className="w-4 h-4" /> Live Math Preview
            </div>
            <button 
              onClick={handleSimulate}
              className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded hover:bg-indigo-100 transition-colors"
            >
              <Play className="w-3 h-3" /> Simulate Logic
            </button>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto">
            {isSimulating ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <Box className="w-8 h-8 animate-bounce mb-4 text-indigo-500" />
                <p>Compiling rating engine logic...</p>
              </div>
            ) : (
              <div className="max-w-md mx-auto space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{formValues.productName}</h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">Code: {formValues.productCode}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Test Input: Sum Insured (TZS)</label>
                    <input type="number" value={testSumInsured} onChange={(e) => setTestSumInsured(Number(e.target.value))} className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500 font-mono" />
                  </div>

                  <div className="p-4 bg-white dark:bg-[#0f172a] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-sm font-bold mb-3 text-slate-900 dark:text-slate-100">Calculated Premium Breakdown</h3>
                    <div className="space-y-2 text-sm">
                      {math.coverBreakdown.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">{item.name} ({item.desc})</span>
                          <span className="font-mono text-slate-900 dark:text-slate-100">{item.amount.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-900 dark:text-slate-100">Gross Premium</span>
                        <span className="font-mono text-slate-900 dark:text-slate-100">{math.grossPremium.toLocaleString()}</span>
                      </div>
                      
                      {math.taxBreakdown.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-rose-600">
                          <span>{item.name}</span>
                          <span className="font-mono">{item.amount.toLocaleString()}</span>
                        </div>
                      ))}

                      <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
                      <div className="flex justify-between font-bold text-indigo-600 text-lg">
                        <span>Total Payable</span>
                        <span className="font-mono">{math.totalPayable.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

      </div>
    </div>
  );
}
