import React, {useState} from "react";

function MultipleChoiceQuestion({ question, options, setAnswer }) {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionsChange = (event) => {
        // if the option is already selected, remove it from the array
        if (selectedOptions.includes(event.target.value)) {
            setSelectedOptions((prev) =>
                prev.filter((option) => option !== event.target.value)
            );
        } else {
            setSelectedOptions((prev) => [...prev, event.target.value]);
        }
        // call the handleAnswerChange function with the question id and the selected options
        setAnswer(question.id, selectedOptions);
    };
    return (
        <div>
            {options.map((option, index) => (
                <div key={index}>
                    <input  
                        type="radio"
                        id={`option-${index}`}
                        name="single-choice"
                        value={option}
                        onChange={event => handleOptionsChange(event)}
                    />
                    <label htmlFor={`option-${index}`}>{option}</label>
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