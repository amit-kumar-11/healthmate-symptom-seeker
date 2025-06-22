
import React, { useState } from 'react';
import LandingSection from '../components/LandingSection';
import SymptomInput from '../components/SymptomInput';
import AIResults from '../components/AIResults';

type AppState = 'landing' | 'symptoms' | 'results';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const handleStartDiagnosis = () => {
    setCurrentState('symptoms');
  };

  const handleBackToLanding = () => {
    setCurrentState('landing');
    setSelectedSymptoms([]);
  };

  const handleGetSuggestions = (symptoms: string[]) => {
    setSelectedSymptoms(symptoms);
    setCurrentState('results');
  };

  const handleBackToSymptoms = () => {
    setCurrentState('symptoms');
  };

  const renderCurrentView = () => {
    switch (currentState) {
      case 'landing':
        return <LandingSection onStartDiagnosis={handleStartDiagnosis} />;
      case 'symptoms':
        return (
          <SymptomInput
            onBackToLanding={handleBackToLanding}
            onGetSuggestions={handleGetSuggestions}
          />
        );
      case 'results':
        return (
          <AIResults
            symptoms={selectedSymptoms}
            onBack={handleBackToSymptoms}
            onStartOver={handleBackToLanding}
          />
        );
      default:
        return <LandingSection onStartDiagnosis={handleStartDiagnosis} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentView()}
    </div>
  );
};

export default Index;
