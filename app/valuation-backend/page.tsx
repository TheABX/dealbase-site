'use client'

import React, { useEffect, useState } from 'react'

const ValuationBackendPage = () => {
  const [report, setReport] = useState<Record<string, unknown> | null>(null)
  const [businessData, setBusinessData] = useState<Record<string, unknown>>({})
  const [valuationResults, setValuationResults] = useState<Record<string, unknown>>({})

  useEffect(() => {
    const stored = localStorage.getItem('valuationResult')
    if (stored) {
      const parsedReport = JSON.parse(stored)
      setReport(parsedReport)
      
      // Extract business data from the form submission
      const formData = parsedReport.form_data || {}
      setBusinessData({
        businessName: formData.businessName || formData.form_data?.businessName || "Your Business",
        industry: formData.industry || formData.form_data?.industry || "Business",
        annualRevenue: formData.industry_specific_data?.annualRevenue || 0,
        netProfit: formData.industry_specific_data?.netProfit || 0,
        ownerInvolvement: formData.industry_specific_data?.ownerInvolvement || "Medium",
        yearsInOperation: formData.yearsInOperation || formData.form_data?.yearsInOperation || 0,
        location: formData.location || formData.form_data?.location || "Australia",
        employees: formData.industry_specific_data?.numberOfEmployees || formData.industry_specific_data?.numberOfStaff || 0
      })

      // Extract valuation results
      const { calculatedValue, metrics, aiSections } = parsedReport
      
      // Calculate saleability score
      const profitMargin = metrics?.profitMargin || 0
      const multiple = metrics?.multiple || 0
      const recurringRevenue = metrics?.recurring || metrics?.recurringRevenue === 'Yes'
      const ownerInvolvement = formData.industry_specific_data?.ownerInvolvement || 'Medium'
      
      let saleabilityScore = 5
      if (profitMargin > 20) saleabilityScore += 2
      else if (profitMargin > 10) saleabilityScore += 1
      else if (profitMargin < 7) saleabilityScore -= 1
      if (recurringRevenue) saleabilityScore += 1
      if (ownerInvolvement === 'Low') saleabilityScore += 1
      else if (ownerInvolvement === 'High') saleabilityScore -= 1
      saleabilityScore = Math.max(1, Math.min(10, Math.round(saleabilityScore)))

      // Extract industry benchmark
      let industryBenchmark = 2.5
      if (aiSections?.benchmarks) {
        const match = aiSections.benchmarks.match(/(\d+(\.\d+)?)[xX]/)
        if (match) {
          industryBenchmark = parseFloat(match[1])
        }
      }

      setValuationResults({
        estimatedValue: calculatedValue || 0,
        lowRange: calculatedValue ? calculatedValue * 0.85 : 0,
        highRange: calculatedValue ? calculatedValue * 1.15 : 0,
        saleabilityScore: saleabilityScore,
        multiple: multiple,
        confidenceLevel: 85,
        industryBenchmark: industryBenchmark
      })
    }
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getSaleabilityColor = (score: number) => {
    if (score <= 3) return '#EF4444'
    if (score <= 6) return '#F59E0B'
    if (score <= 8) return '#10B981'
    return '#059669'
  }

  if (!report) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px', textAlign: 'center' }}>
          <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '48px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>No Valuation Data</h2>
            <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '32px' }}>Please submit your business details first to view your valuation report.</p>
            <a href="/valuation" style={{ 
              background: '#2563eb', 
              color: 'white', 
              padding: '16px 32px', 
              borderRadius: '8px', 
              fontWeight: 'bold', 
              fontSize: '18px',
              textDecoration: 'none',
              display: 'inline-block'
            }}>
              Back to Valuation Tool
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', background: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
              ABX
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Professional Business Valuation Report</h1>
              <p style={{ color: '#6b7280', margin: '4px 0 0 0' }}>{String(businessData.businessName)} • {String(businessData.industry)} • {String(businessData.location)}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Report ID: #BV-{Date.now().toString().slice(-6)}</p>
            <p style={{ fontSize: '14px', fontWeight: '500', margin: '4px 0 0 0' }}>{new Date().toLocaleDateString('en-AU')}</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
        {/* Key Metrics Dashboard */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', padding: '24px', borderLeft: '4px solid #2563eb' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>Estimated Value</h3>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', margin: '8px 0' }}>{formatCurrency(Number(valuationResults.estimatedValue))}</p>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>±{(((Number(valuationResults.highRange) - Number(valuationResults.lowRange)) / 2) / Number(valuationResults.estimatedValue) * 100).toFixed(0)}% range</p>
          </div>
          
          <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', padding: '24px', borderLeft: '4px solid #10b981' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>Saleability Score</h3>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', margin: '8px 0' }}>{String(valuationResults.saleabilityScore)}/10</p>
            <p style={{ fontSize: '14px', color: '#10b981', margin: '4px 0 0 0' }}>Above Average</p>
          </div>
          
          <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', padding: '24px', borderLeft: '4px solid #8b5cf6' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>Revenue Multiple</h3>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', margin: '8px 0' }}>{String(valuationResults.multiple)}x</p>
            <p style={{ fontSize: '14px', color: '#8b5cf6', margin: '4px 0 0 0' }}>SDE Multiple</p>
          </div>
          
          <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', padding: '24px', borderLeft: '4px solid #2563eb' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>Confidence Level</h3>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', margin: '8px 0' }}>{String(valuationResults.confidenceLevel)}%</p>
            <p style={{ fontSize: '14px', color: '#2563eb', margin: '4px 0 0 0' }}>High</p>
          </div>
        </div>

        {/* Main Valuation Display */}
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '48px', marginBottom: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Business Valuation Analysis</h2>
            <div style={{ fontSize: '72px', fontWeight: 'bold', color: '#2563eb', marginBottom: '16px' }}>
              {formatCurrency(Number(valuationResults.estimatedValue))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '32px', fontSize: '18px', marginBottom: '24px' }}>
              <div>
                <span style={{ color: '#6b7280' }}>Low Range: </span>
                <span style={{ fontWeight: '600' }}>{formatCurrency(Number(valuationResults.lowRange))}</span>
              </div>
              <div>
                <span style={{ color: '#6b7280' }}>High Range: </span>
                <span style={{ fontWeight: '600' }}>{formatCurrency(Number(valuationResults.highRange))}</span>
              </div>
            </div>
            
            {/* Confidence Interval Visualization */}
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ position: 'relative', height: '32px', background: '#e5e7eb', borderRadius: '16px' }}>
                <div style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: '20%', 
                  height: '100%', 
                  width: '60%',
                  background: '#2563eb', 
                  borderRadius: '16px', 
                  opacity: 0.3 
                }} />
                <div style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: '50%', 
                  height: '100%', 
                  width: '2px',
                  background: '#2563eb',
                  transform: 'translateX(-50%)'
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '14px', color: '#6b7280' }}>
                <span>{formatCurrency(Number(valuationResults.lowRange) * 0.8)}</span>
                <span style={{ color: '#2563eb', fontWeight: '600' }}>Most Likely Value</span>
                <span>{formatCurrency(Number(valuationResults.highRange) * 1.2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Benchmark Comparison */}
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '32px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>Industry Benchmark Comparison</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '24px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#2563eb' }}>Your Business Multiple</h4>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#2563eb', marginBottom: '8px' }}>
                {String(valuationResults.multiple)}x
              </div>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>Based on your financial performance</p>
            </div>
            
            <div style={{ background: '#fef3c7', borderRadius: '12px', padding: '24px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#92400e' }}>Industry Average</h4>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#92400e', marginBottom: '8px' }}>
                {String(valuationResults.industryBenchmark)}x
              </div>
              <p style={{ color: '#b45309', fontSize: '14px' }}>Typical for {String(businessData.industry)} businesses</p>
            </div>
          </div>
          
          <div style={{ marginTop: '24px', padding: '16px', borderRadius: '8px', background: Number(valuationResults.multiple) > Number(valuationResults.industryBenchmark) ? '#dcfce7' : '#fef2f2' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: Number(valuationResults.multiple) > Number(valuationResults.industryBenchmark) ? '#166534' : '#dc2626' }}>
              {Number(valuationResults.multiple) > Number(valuationResults.industryBenchmark) ? 'Above Industry Average' : 'Below Industry Average'}
            </h4>
            <p style={{ fontSize: '14px', color: Number(valuationResults.multiple) > Number(valuationResults.industryBenchmark) ? '#166534' : '#dc2626' }}>
              {Number(valuationResults.multiple) > Number(valuationResults.industryBenchmark)
                ? `Your business is performing ${((Number(valuationResults.multiple) / Number(valuationResults.industryBenchmark) - 1) * 100).toFixed(0)}% better than the industry average.`
                : `Your business is ${((1 - Number(valuationResults.multiple) / Number(valuationResults.industryBenchmark)) * 100).toFixed(0)}% below the industry average. Consider implementing the recommendations to improve your valuation.`}
            </p>
          </div>
        </div>

        {/* Saleability Score */}
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '32px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>Saleability Score Analysis</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '18px', fontWeight: '500' }}>Overall Score</span>
            <span style={{ fontSize: '36px', fontWeight: 'bold', color: getSaleabilityColor(Number(valuationResults.saleabilityScore)) }}>
              {String(valuationResults.saleabilityScore)}/10
            </span>
          </div>
          
          {/* Score Visualization */}
          <div style={{ position: 'relative', height: '16px', background: '#e5e7eb', borderRadius: '8px', marginBottom: '24px' }}>
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              height: '100%', 
              width: `${(Number(valuationResults.saleabilityScore) / 10) * 100}%`,
              background: getSaleabilityColor(Number(valuationResults.saleabilityScore)),
              borderRadius: '8px',
              transition: 'width 1s ease-out'
            }} />
          </div>

          <div style={{ 
            padding: '16px', 
            borderRadius: '8px', 
            borderLeft: `4px solid ${getSaleabilityColor(Number(valuationResults.saleabilityScore))}`,
            background: `${getSaleabilityColor(Number(valuationResults.saleabilityScore))}10`
          }}>
            <h4 style={{ fontWeight: '600', fontSize: '18px', marginBottom: '8px' }}>
              {Number(valuationResults.saleabilityScore) >= 8 ? 'Highly Saleable Business' : 
               Number(valuationResults.saleabilityScore) >= 6 ? 'Moderately Saleable Business' : 
               Number(valuationResults.saleabilityScore) >= 4 ? 'Fairly Saleable Business' : 'Challenging to Sell'}
            </h4>
            <p style={{ color: '#374151', marginBottom: '12px' }}>
              {Number(valuationResults.saleabilityScore) >= 8 ? 'Your business is in excellent condition for sale with strong market appeal.' :
               Number(valuationResults.saleabilityScore) >= 6 ? 'Your business has good saleability potential with some areas for improvement.' :
               Number(valuationResults.saleabilityScore) >= 4 ? 'Your business has moderate saleability but would benefit from addressing key areas.' :
               'Your business may face challenges in the current market. Focus on improving key metrics.'}
            </p>
          </div>
        </div>

        {/* AI Analysis Sections */}
        {(() => {
          const aiSections = report.aiSections;
          if (!aiSections || typeof aiSections !== 'object' || aiSections === null) return null;
          const sections = aiSections as Record<string, unknown>;
          return (
          <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '32px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>AI Analysis & Insights</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
              {typeof sections.valuationConfirmation === 'string' && (
                <div style={{ background: '#f0f9ff', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #2563eb' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#1e40af' }}>Valuation Summary</h4>
                  <p style={{ fontSize: '14px', color: '#1e40af', lineHeight: '1.5' }}>{String(sections.valuationConfirmation)}</p>
                </div>
              )}
              
              {typeof sections.keyFactors === 'string' && (
                <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #10b981' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#166534' }}>Key Value Drivers</h4>
                  <p style={{ fontSize: '14px', color: '#166534', lineHeight: '1.5' }}>{String(sections.keyFactors)}</p>
                </div>
              )}
              
              {typeof sections.risksAndOpportunities === 'string' && (
                <div style={{ background: '#fef3c7', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #f59e0b' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#92400e' }}>Risks & Opportunities</h4>
                  <p style={{ fontSize: '14px', color: '#92400e', lineHeight: '1.5' }}>{String(sections.risksAndOpportunities)}</p>
                </div>
              )}
              
              {typeof sections.recommendations === 'string' && (
                <div style={{ background: '#fef2f2', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #ef4444' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#dc2626' }}>Recommendations</h4>
                  <p style={{ fontSize: '14px', color: '#dc2626', lineHeight: '1.5' }}>{String(sections.recommendations)}</p>
                </div>
              )}
            </div>
          </div>
          );
        })()}

        {/* Call to Action */}
        <div style={{ 
          background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)', 
          borderRadius: '16px', 
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
          padding: '48px', 
          color: 'white',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Ready to Maximize Your Business Value?</h2>
          <p style={{ fontSize: '20px', marginBottom: '24px', color: '#bfdbfe' }}>
            Get expert guidance on selling your business at the optimal price.
          </p>
          
          <button style={{ 
            background: 'white', 
            color: '#2563eb', 
            padding: '16px 32px', 
            borderRadius: '8px', 
            fontWeight: 'bold', 
            fontSize: '18px',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '16px'
          }}>
            Get Expert Consultation
          </button>
          
          <div style={{ color: '#bfdbfe', fontSize: '16px' }}>
            <p style={{ margin: '8px 0' }}>✓ Professional business brokerage services</p>
            <p style={{ margin: '8px 0' }}>✓ Expert negotiation and deal management</p>
            <p style={{ margin: '8px 0' }}>✓ Confidential process with vetted purchasers</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ValuationBackendPage 