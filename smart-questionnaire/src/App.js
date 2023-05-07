import React, { useState } from 'react';
import './App.css';

function App() {
  const [questionnaire, setQuestionnaire] = useState([
    {
      id: 1,
      type: 'single-choice',
      question: 'Tell us your concerns',
      options: ['Wrinkles and fine lines', 
        'Thin lips', 
        'Facial volumising / Contouring', 
        'Uneven skin tone/sun damage/rosacea', 
        'Acne and acne scarring', 
        'Double chin/ jaw line',
        'Dark circles and under-eye bags',
        'Dry/dull dehydrated skin',
        'Oily skin'
      ],
      answer: '',
    },
    {
      id: 2,
      type: 'single-choice',
      question: 'Please select your skin type',
      options: ['Combination', 'Dry', 'Oily', 'Acne', 'Sensitive'],
      answer: '',
    },
    {
      id: 3,
      type: 'single-choice',
      question: 'Are you comfortable with needles?',
      options: ['Yes', 'No'],
      answer: '',
    },
    {
      id: 4,
      type: 'multiple-inputs',
      question: 'Please provide your contact details:',
      answer: { name: '', email: '', phone: '' },
    },
  ]);


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleSubmit = () => {
    if (questionnaire[currentQuestionIndex].answer === '') {
      alert('Please select an answer before proceeding.');
      return;
    }
    if (currentQuestionIndex < questionnaire.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const answers = questionnaire.map((q) => q.answer);
      // Redirect based on the answers
      // add switch case for each answer combination
      switch (true) {
        case answers[2] === 'Yes':
          window.location.href = 'https://youtube.com';
          break;
        case answers[2] === 'No':
          window.location.href = 'https://www.google.com';
          break;
        default:
          window.location.href = 'https://example1.com/result';
      }
    }
  };
  

  const handleAnswerChange = (id, value) => {
    setQuestionnaire((prev) =>
      prev.map((q) => (q.id === id ? { ...q, answer: value } : q))
    );
  };

  const handleBackButtonClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h1 className="text-2xl font-bold mb-6">
        {questionnaire[currentQuestionIndex].question}
      </h1>
      <div className="mb-4">
            {questionnaire[currentQuestionIndex].options.map((option) => (
              <div key={option} className={`${
                questionnaire[currentQuestionIndex].answer === option
                  ? "border-blue-500 border-2"
                  : "border-gray-200 border"
              } p-4 rounded-lg mb-4 bg-white cursor-pointer hover:border-blue-300 transition-all`}
              onClick={() =>
                handleAnswerChange(questionnaire[currentQuestionIndex].id, option)
              }
              >
                <div className="flex items-center">
                  <input 
                  type="radio" 
                  name="option" 
                  value={option} 
                  className="hidden"
                  checked={questionnaire[currentQuestionIndex].answer === option}
                  />
                  <label htmlFor={option} className="flex items-center mb-2">{option}</label>
              </div>
            </div>
            ))}
            <div className="flex justify-between">
              {currentQuestionIndex > 0 && (
                <button
                  onClick={handleBackButtonClick}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md text-sm mr-4 mb-4"
                >
                  &larr; Back
                </button>
              )}
              <button
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg"
              onClick={handleSubmit}
              >
              {currentQuestionIndex === questionnaire.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
