import React, {useState} from "react";

function MultipleChoiceQuestion({ question, options, setAnswer }) {
    const handleOptionsChange = (option) => {
        // if the option is already selected, remove it from the array
        if (question.answer.includes(option)) {
            setAnswer(question.id, question.answer.filter((o) => o !== option)
            );
        } else {
            setAnswer(question.id, [...question.answer, option]);
        }
    };
    return (
        <div>
            {options.map((option, index) => (
                <div key={index} className={`${
                    question.answer.includes(option)
                      ? "custom-border-color border-2"
                      : "border-gray-200 border"
                  } p-4 rounded-lg mb-4 bg-white cursor-pointer transition-all`}
                  onClick={() => handleOptionsChange(option)}>
                    <input  
                        type="checkbox"
                        id={`option-${index}`}
                        name={`multiple-selection-${question.id}`}
                        value={option}
                        className="hidden"
                        checked={question.answer.includes(option)}
                        readOnly
                    />
                    <label htmlFor={`option-${index}`} onClick={(e) => e.stopPropagation()} className="flex items-center mb-2 cursor-pointer">{option}</label>
                </div>
            ))}
        </div>
    );
}

export default MultipleChoiceQuestion;

/*
<div className="mb-4">
            {question.options.map((option) => (
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
    </div>
*/