'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle, AlertTriangle, RefreshCw, Target, Activity, Calendar, FileText, Zap, Download } from 'lucide-react';

type AnalysisResult = {
  goal: string;
  approach: string;
  steps: string[];
  timeline: string;
  missingElements: {
    goalClarity: string;
    executionSteps: string;
    resourcesRequired: string;
    timeline: string;
  };
  simplifiedVersion: string;
  actionableSteps: string[];
  clarityScore: {
    score: number;
    explanation: string;
  };
};

export default function Home() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze the plan. Please try again.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  const scoreColor = (score: number) => {
    if (score >= 80) return 'var(--success)';
    if (score >= 50) return 'var(--warning)';
    return 'var(--text-muted)';
  };

  return (
    <main style={{ paddingBottom: '4rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem' }}>
        <h1 className="animate-slide-up">Explain My Plan <Sparkles style={{ display: 'inline', color: 'var(--accent)', verticalAlign: 'middle', marginLeft: '8px' }} size={36} /></h1>
        <p className="animate-slide-up delay-100" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Turn your vague ideas into clear, structured, and actionable plans with AI.
        </p>
      </header>

      <div className="glass-card animate-slide-up delay-200" style={{ marginBottom: '2rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Zap size={24} color="var(--primary)" /> Your Idea / Plan
        </h2>
        <textarea
          className="input-field print-text"
          rows={5}
          placeholder="e.g., I want to start a YouTube channel and earn money quickly..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        
        <div className="hide-on-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <div>
            {result && (
              <button className="btn btn-secondary" onClick={handleExportPDF}>
                <Download size={18} /> Export Options
              </button>
            )}
          </div>
          <button 
            className="btn btn-primary" 
            onClick={handleAnalyze} 
            disabled={loading || !input.trim()}
          >
            {loading ? (
              <>
                <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }} />
                Analyzing...
              </>
            ) : result ? (
              <>
                <RefreshCw size={18} />
                Re-Analyze
              </>
            ) : (
              <>
                Structure My Plan <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
        {error && <p className="hide-on-print" style={{ color: 'var(--warning)', marginTop: '1rem', textAlign: 'right' }}>{error}</p>}
      </div>

      {result && (
        <div className="animate-slide-up delay-100" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Top Info section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                    <Target size={20} /> The Core Goal
                  </h3>
                  <p style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginTop: '0.5rem' }}>{result.goal}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div className="score-circle" style={{ '--score': `${result.clarityScore.score}%`, '--accent': scoreColor(result.clarityScore.score) } as React.CSSProperties}>
                    <span className="score-value">{result.clarityScore.score}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>CLARITY</div>
                </div>
              </div>
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={16} /> Simplified Version
                </h4>
                <p style={{ fontStyle: 'italic', color: 'var(--text-main)' }}>"{result.simplifiedVersion}"</p>
              </div>
            </div>

            <div className="glass-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', marginBottom: '1rem' }}>
                <Activity size={20} /> Method & Approach
              </h3>
              <p style={{ color: 'var(--text-main)', marginBottom: '1.5rem' }}>{result.approach}</p>
              
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', marginBottom: '1rem' }}>
                <Calendar size={20} /> Timeline
              </h3>
              <p style={{ color: 'var(--text-main)' }}>
                {result.timeline ? (
                  result.timeline
                ) : (
                  <span style={{ color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertTriangle size={16} /> Not specified</span>
                )}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div className="glass-card" style={{ borderTop: '4px solid var(--primary)' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Structured Steps</h3>
              {result.steps.length > 0 ? (
                <ul style={{ listStyle: 'none' }}>
                  {result.steps.map((step, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ background: 'var(--primary)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, fontSize: '0.9rem' }}>
                        {idx + 1}
                      </div>
                      <span style={{ color: 'var(--text-main)', paddingTop: '2px' }}>{step}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No clear steps identified.</p>
              )}
            </div>

            <div className="glass-card" style={{ borderTop: '4px solid var(--success)' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--success)' }}>Actionable Next Steps</h3>
              <ul style={{ listStyle: 'none' }}>
                {result.actionableSteps.map((step, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                    <CheckCircle color="var(--success)" size={24} style={{ flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-main)', paddingTop: '2px' }}>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="glass-card" style={{ borderTop: '4px solid var(--warning)' }}>
            <h3 style={{ color: 'var(--warning)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={24} /> Missing Elements Identified
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div>
                <h4 style={{ color: 'var(--text-muted)' }}>Goal Clarity</h4>
                <p>{result.missingElements.goalClarity}</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--text-muted)' }}>Execution Steps</h4>
                <p>{result.missingElements.executionSteps}</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--text-muted)' }}>Resources required</h4>
                <p>{result.missingElements.resourcesRequired}</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--text-muted)' }}>Timeline</h4>
                <p>{result.missingElements.timeline}</p>
              </div>
            </div>
            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <h4 style={{ color: 'var(--warning)' }}>Clarity Feedback ({result.clarityScore.score}/100)</h4>
              <p style={{ color: 'var(--text-main)', marginTop: '0.5rem' }}>{result.clarityScore.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
