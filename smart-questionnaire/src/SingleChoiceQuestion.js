import React from "react";

function SingleChoiceQuestion({ question, options, setAnswer }) {
    return (
        <div className="grid grid-cols-2 gap-1">
          {options.map((option, index) => (
            <div key={index} className={`${
                question.answer === option
                  ? "custom-border-color border-2"
                  : "border-gray-200 border"
              } p-4 bg-white cursor-pointer transition-all`}
              onClick={() => setAnswer(question.id, option)}
              >
                <div key={index} className="flex items-center">
                    <input
                        type="radio"
                        id={`option-${index}`}
                        name="single-choice"
                        value={option}
                        className="hidden"
                        onChange={event => setAnswer(question.id, event.target.value)}
                        checked={question.answer === option}
                    />
                <label htmlFor={`option-${index}`} className="flex items-center mb-2 font-roboto">{option}</label>
                </div>
            </div>
          ))}
        </div>
      );
}

export default SingleChoiceQuestion;