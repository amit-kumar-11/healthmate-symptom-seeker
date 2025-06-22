
import React, { useState, useEffect } from 'react';
import { Search, X, ArrowLeft } from 'lucide-react';

interface SymptomInputProps {
  onBackToLanding: () => void;
  onGetSuggestions: (symptoms: string[]) => void;
}

const COMMON_SYMPTOMS = [
  'Headache', 'Fever', 'Cough', 'Sore throat', 'Runny nose', 'Fatigue', 'Nausea',
  'Stomach pain', 'Back pain', 'Muscle aches', 'Dizziness', 'Chills', 'Sneezing',
  'Shortness of breath', 'Chest pain', 'Joint pain', 'Loss of appetite', 'Vomiting',
  'Diarrhea', 'Constipation', 'Skin rash', 'Itching', 'Swelling', 'Anxiety',
  'Insomnia', 'Heartburn', 'Bloating', 'Earache', 'Toothache', 'Dry mouth'
];

const SymptomInput: React.FC<SymptomInputProps> = ({ onBackToLanding, onGetSuggestions }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (inputValue.length > 0) {
      const filtered = COMMON_SYMPTOMS.filter(symptom =>
        symptom.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedSymptoms.includes(symptom)
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue, selectedSymptoms]);

  const addSymptom = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const handleSubmit = () => {
    if (selectedSymptoms.length > 0) {
      onGetSuggestions(selectedSymptoms);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tell us your symptoms</h1>
            <p className="text-gray-600 mt-1">Select or type your symptoms to get personalized recommendations</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 animate-scale-in">
          {/* Input Section */}
          <div className="relative mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your symptoms (e.g., headache, fever, cough)"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg">
                {suggestions.map((symptom, index) => (
                  <button
                    key={index}
                    onClick={() => addSymptom(symptom)}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Symptoms */}
          {selectedSymptoms.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Selected Symptoms:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map((symptom, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-full"
                  >
                    <span>{symptom}</span>
                    <button
                      onClick={() => removeSymptom(symptom)}
                      className="hover:bg-blue-200 rounded-full p-1 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Symptoms */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Symptoms:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {COMMON_SYMPTOMS.slice(0, 12).map((symptom, index) => (
                <button
                  key={index}
                  onClick={() => addSymptom(symptom)}
                  disabled={selectedSymptoms.includes(symptom)}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedSymptoms.includes(symptom)
                      ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={selectedSymptoms.length === 0}
              className={`px-8 py-4 rounded-xl text-lg font-semibold transition-all ${
                selectedSymptoms.length > 0
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:shadow-lg transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Get AI Recommendations ({selectedSymptoms.length} symptoms)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomInput;
