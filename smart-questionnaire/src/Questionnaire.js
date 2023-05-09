import React, { useState } from 'react';
import SingleChoiceQuestion from './SingleChoiceQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import MultipleInputsQuestion from './MultipleInputsQuestion';
import ProgressBar from './ProgressBar';

function Questionnaire() {
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
    } else if ((currentQuestionIndex === questionnaire.length - 1) && questionnaire[currentQuestionIndex].answer.email === '') {
      alert('Please enter your email address.');
      return;
    } else if ((currentQuestionIndex === questionnaire.length - 1) && questionnaire[currentQuestionIndex].answer.name === '') {
        alert('Please enter your name.');
        return;
    } else if ((currentQuestionIndex === questionnaire.length - 1) && questionnaire[currentQuestionIndex].answer.phone === '') {
        alert('Please enter your phone number.');
        return;
    }
    if (currentQuestionIndex < questionnaire.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const answers = questionnaire.map((q) => q.answer);
      // Redirect based on the answers
      // add switch case for each answer combination
      switch (true) {
        case answers[0] === 'Wrinkles and fine lines' && answers[2] === 'No':
          window.location.href = 'https://www.carismaaesthetics.com/chemicalpeelmalta';
          break;
        case answers[0] === 'Wrinkles and fine lines' && answers[2] === 'Yes':
          window.location.href = 'https://www.carismaaesthetics.com/wrinklesandfinelines#comp-lg4zufst';
          break;
        case answers[0] === 'Thin lips':
            window.location.href = 'https://www.carismaaesthetics.com/thinlips#comp-lg56at0h';
            break;
        case answers[0] === 'Facial volumising / Contouring' && answers[2] === 'Yes':
            window.location.href = 'https://www.carismaaesthetics.com/facialvolumisingandcontouring#comp-lg7pph011';
            break;
        case answers[0] === 'Facial volumising / Contouring' && answers[2] === 'No':
            window.location.href = 'https://www.carismaaesthetics.com/facialvolumisingandcontouring#comp-lh0nejhh';
            break;
        case answers[0] === 'Uneven skin tone/sun damage/rosacea' && answers[1] === 'Combination':
        default:
          window.location.href = 'https://www.carismaaesthetics.com';
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

  function renderQuestionComponent(question) {
    switch (question.type) {
      case 'single-choice':
        return (
          <SingleChoiceQuestion
            question={question}
            options={question.options}
            setAnswer={handleAnswerChange}
          />
        );
      case 'multiple-choice':
        return (
          <MultipleChoiceQuestion
            question={question}
            setAnswer={handleAnswerChange}
          />
        );
      case 'multiple-inputs':
        return (
          <MultipleInputsQuestion 
            className="text-left"
            question={question}
            options={question.options}
            setAnswer={handleAnswerChange}
          />
        );
        default:
            return null;
    }
  }
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center lg:pt-16">
        <div>
            <ProgressBar progressPercentage={Math.max(5, (currentQuestionIndex / (questionnaire.length - 1)) * 100)}/>
            <div className="bg-white min-h-screen lg:min-h-0 p-6 rounded-lg shadow-lg w-96">
            <h1 className="text-2xl font-bold mb-6">
                {questionnaire[currentQuestionIndex].question}
            </h1>
            <div className="space-y-4">
                    {renderQuestionComponent(questionnaire[currentQuestionIndex])}
                    <div className="flex justify-between">
                    {currentQuestionIndex > 0 && (
                        <button
                        onClick={handleBackButtonClick}
                        className="sm:static sm:ml-0 sm:mb-0 custom-border-color h-12 text-grey-600/50 font-semibold py-2 px-6 rounded-md text-sm mr-4 mb-4 whitespace-nowrap"
                        >
                        &larr; Back
                        </button>
                    )}
                    <button
                    className="sm:static sm:mr-0 sm:mb-0 w-full py-2 h-12 custom-button-color text-white font-semibold rounded-lg"
                    onClick={handleSubmit}
                    >
                    {currentQuestionIndex === questionnaire.length - 1 ? 'Submit' : 'Next'}
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Questionnaire;
