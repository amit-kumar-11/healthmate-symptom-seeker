
import React from 'react';
import { ArrowLeft, AlertTriangle, Clock, Pill, Shield } from 'lucide-react';

interface Medicine {
  name: string;
  type: string;
  dosage: string;
  description: string;
  price: string;
}

interface AIResultsProps {
  symptoms: string[];
  onBack: () => void;
  onStartOver: () => void;
}

const MOCK_MEDICINES: Medicine[] = [
  {
    name: "Acetaminophen (Tylenol)",
    type: "Pain Relief",
    dosage: "500mg every 4-6 hours",
    description: "Effective for headaches, fever, and mild pain relief",
    price: "$8-12"
  },
  {
    name: "Ibuprofen (Advil)",
    type: "Anti-inflammatory",
    dosage: "200mg every 6-8 hours",
    description: "Reduces inflammation, fever, and pain",
    price: "$6-10"
  },
  {
    name: "Throat Lozenges",
    type: "Throat Relief",
    dosage: "1 lozenge every 2 hours",
    description: "Soothes sore throat and provides temporary relief",
    price: "$4-8"
  }
];

const PREVENTIVE_TIPS = [
  "Stay hydrated by drinking plenty of water",
  "Get adequate rest (7-9 hours of sleep)",
  "Eat nutritious foods rich in vitamins",
  "Practice good hygiene - wash hands frequently",
  "Avoid stress and practice relaxation techniques"
];

const AIResults: React.FC<AIResultsProps> = ({ symptoms, onBack, onStartOver }) => {
  const getConditionName = (symptoms: string[]) => {
    const symptomCount = symptoms.length;
    const hasHeadache = symptoms.some(s => s.toLowerCase().includes('headache'));
    const hasFever = symptoms.some(s => s.toLowerCase().includes('fever'));
    const hasCough = symptoms.some(s => s.toLowerCase().includes('cough'));
    
    if (hasHeadache && hasFever) return "Common Cold or Viral Infection";
    if (hasCough && hasFever) return "Upper Respiratory Infection";
    if (hasHeadache) return "Tension Headache";
    if (symptomCount >= 3) return "General Malaise";
    return "Mild Symptoms";
  };

  const shouldSeeDoctor = symptoms.length >= 4 || 
    symptoms.some(s => s.toLowerCase().includes('chest pain') || 
                      s.toLowerCase().includes('shortness of breath'));

  const conditionName = getConditionName(symptoms);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Health Analysis</h1>
              <p className="text-gray-600 mt-1">Based on your symptoms: {symptoms.join(', ')}</p>
            </div>
          </div>
          <button
            onClick={onStartOver}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            Start Over
          </button>
        </div>

        <div className="space-y-8">
          {/* Probable Condition */}
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Probable Condition</h2>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{conditionName}</h3>
              <p className="text-blue-700">
                Based on your symptoms, this appears to be a common condition that can typically be managed with rest and over-the-counter medications.
              </p>
            </div>
          </div>

          {/* Doctor Alert */}
          {shouldSeeDoctor && (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg animate-fade-in">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <div>
                  <h3 className="text-lg font-semibold text-red-900">Important: Consider Seeing a Doctor</h3>
                  <p className="text-red-700 mt-1">
                    Your symptoms may require professional medical attention. Please consult with a healthcare provider.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Recommended Medicines */}
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-scale-in delay-150">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <Pill className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Recommended OTC Medicines</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_MEDICINES.map((medicine, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="bg-gray-100 w-full h-32 rounded-lg mb-4 flex items-center justify-center">
                    <Pill className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{medicine.name}</h3>
                  <p className="text-sm text-blue-600 font-medium mb-2">{medicine.type}</p>
                  <p className="text-gray-600 text-sm mb-3">{medicine.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{medicine.dosage}</span>
                    </div>
                    <div className="text-green-600 font-semibold">{medicine.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preventive Tips */}
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-scale-in delay-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Preventive Care Tips</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {PREVENTIVE_TIPS.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 animate-fade-in delay-500">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">Medical Disclaimer</h3>
                <p className="text-yellow-800 text-sm">
                  This AI analysis is for informational purposes only and should not replace professional medical advice. 
                  Always consult with a qualified healthcare provider for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResults;
