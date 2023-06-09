import React, { useState, Suspense } from 'react';
import SingleChoiceQuestion from './SingleChoiceQuestion';
//import MultipleChoiceQuestion from './MultipleChoiceQuestion';

import MultipleInputsQuestion from './MultipleInputsQuestion';
import { Navigate, useNavigate } from 'react-router-dom';
import ConsultationQuestion from './ConsultationQuestion';
import { sendDataToZoho } from './api';


function Questionnaire() {
  const MultipleChoiceQuestion = React.lazy(() => import('./MultipleChoiceQuestion'));
  const [questionnaire, setQuestionnaire] = useState([
    {
      id: 1,
      type: 'multiple-choice',
      question: 'Tell us your concerns',
      options: ['Wrinkles', 
        'Thin lips', 
        'Facial volumising', 
        'Uneven skin tone', 
        'Acne', 
        'Double chin',
        'Dark circles',
        'Dry skin',
        'Oily skin',
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
        question: 'Comfortable with Injectables?',
        description: '(e.g., Botox, Fillers)',
        options: ['Yes', 'No'],
        answer: '',
    },
    {
        id: 4,
        type: 'single-choice',
        question: 'Where did you hear about us?',
        options: ['Social Media', 'Google', 'Hotel', 'Corporate partnership', 'Influencer' , 'Family/Friend', 'Repeat customer' , 'Other'],
        answer: '',
    },
    {
        id: 5,
        type: 'consultation-question',
        question: 'Your personalised quiz results are now ready!',
        description: 'For a limited time we are offering free virtual consultations with qualified medical professionals to discuss your concerns, share cutting edge treatment options available to you and answer any of your questions. Look forward to connecting.',
        options: ['Free virtual consult (Newsletter)', 'In person consult (€35)', 'Skip Consultation'],
        answer: '',
    },
    {
      id: 6,
      type: 'multiple-inputs',
      question: 'Please provide your contact details',
      answer: { first_name: '', surname: '' , email: '', phone: '' },
    }
  ]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        // Regular expression for email validation
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePhone = (phone) => {
        // Regular expression for phone number validation
        const re = /^[+]?[0-9\b]+$/;
        return re.test(phone);
    };

    const handleSubmit = () => {
        console.log('handleSubmit triggered / next button clicked');
        if (![4, 5].includes(currentQuestionIndex) && !questionnaire[currentQuestionIndex].answer[0]) {
            setError('Please select an answer and try again');
            return;
        } else {
            setError(null);
        }
        if (currentQuestionIndex === 5) {
            if (!validateEmail(questionnaire[5].answer.email)) {
                setError('Please enter a valid email address.');
                return;
            }
            if (!validatePhone(questionnaire[5].answer.phone)) {
                setError('Please enter a valid phone number.');
                return;
            }
            if (!questionnaire[5].answer.first_name || !questionnaire[5].answer.surname) {
                setError("Please enter your name.");
                return;
            }
        }
        if (currentQuestionIndex === 4 && questionnaire[4].answer === 'Skip Consultation') {
            storeAndRedirect();
        } else if (currentQuestionIndex < questionnaire.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            storeAndRedirect();
        }
    }

    const storeAndRedirect = () => {
        const answers = questionnaire.map((q) => q.answer);
        // Redirect based on the answers
        // add switch case for each answer combination
        localStorage.setItem('questionnaireData', JSON.stringify(answers));
        sendDataToZoho(answers);
        //navigate('/treatments');
        window.top.location.href = 'https://www.carismaaesthetics.com/quiz-results';
    }
  

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
                setError={setError}
            />
            );
        case 'multiple-choice':
            return (
                <Suspense fallback={<div>Loading...</div>}>
                    <MultipleChoiceQuestion
                    question={question}
                    options={question.options}
                    setAnswer={handleAnswerChange}
                    setError={setError}
                    />
                </Suspense>
            );
        case 'multiple-inputs':
            return (
            <MultipleInputsQuestion 
                className="text-left"
                question={question}
                options={question.options}
                setAnswer={handleAnswerChange}
                setError={setError}
                consultType={questionnaire[4].answer}
            />
            );
        case 'consultation-question':
            return (
            <ConsultationQuestion
                question={question}
                options={question.options}
                setAnswer={handleAnswerChange}
                setError={setError}
            />
            );
        default:
            return null;
    }
  }
  

  return (
    <div className="min-h-screen flex items-start justify-center lg:pt-8">
        <div className='w-full lg:w-1/2'>
            <div className="min-h-screen p-1 lg:min-h-0 w-full mx-auto">
            <h1 className="text-2xl mb-4 mt-4 font-custom font-thin custom-text-color">
                {questionnaire[currentQuestionIndex].question}
            </h1>
                {questionnaire[currentQuestionIndex].description ?  
                    <div className="flex items-center justify-center mb-6">
                        <p className="text-sm custom-text-color font-light text-justify mb-2 font-roboto">{questionnaire[currentQuestionIndex].description}</p>
                    </div> 
                    : null
                }
            <div className="space-y-4">
                    {renderQuestionComponent(questionnaire[currentQuestionIndex])}
                    {error && <p className="custom-text-color">{error}</p>}
                    <div className="flex justify-between">
                    {currentQuestionIndex > 0 && (
                        <button
                        onClick={handleBackButtonClick}
                        className="sm:static sm:ml-0 sm:mb-0 custom-border-color h-12 custom-text-color font-custom py-2 px-6  text-sm mr-4 mb-4 whitespace-nowrap"
                        >
                        &larr; Back
                        </button>
                    )}
                    <button
                        className="sm:static sm:mr-0 sm:mb-0 w-full py-2 h-12 custom-button-color font-custom"
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