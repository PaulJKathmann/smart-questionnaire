import React from "react";
import InPersonConsultation from './assets/thumbnails-consultation/InPersonconsult.png'
import VirtualConsultation from './assets/thumbnails-consultation/VirtualConsult.png';

function ConsultationQuestion({ question, options, setAnswer }) {
   const consultationOptions = options.slice(0, 2);

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 space-around">
            {consultationOptions.map((option, index) => (
                <div key={index}
                onClick={() => setAnswer(question.id, option)}
                >
                    <div key={index} className="flex justify-center">
                        <input
                            type="radio"
                            id={`option-${index}`}
                            name="single-choice"
                            value={option}
                            className="hidden"
                            onChange={event => setAnswer(question.id, event.target.value)}
                            checked={question.answer === option}
                        />
                        {option === "In person consult (€35)" ? 
                            <img src={InPersonConsultation} className={`h-88 w-88 cursor-pointer ${question.answer === option ? 'choice-selected' : ''}`} /> 
                            :
                        (option === "Free virtual consult (Newsletter)" 
                            &&
                            <img src={VirtualConsultation} className={`h-88 w-88 cursor-pointer ${question.answer === option ? 'choice-selected' : ''}`} />)
                        }
                    </div>
                </div>
            ))}
            </div>
            <div className="mt-4">
                        <div key={3} className={`${
                            question.answer.includes("Skip Consultation")
                            ? "choice-selected"
                            : "border-gray-200 border custom-text-color"
                        } border-gray-200 border p-1 justify-center items-center cursor-pointer`}
                        onClick={() => setAnswer(question.id, options[2])}
                        >
                            <div key={3} className="flex items-center justify-center">
                                <input
                                    type="radio"
                                    id={`option-${3}`}
                                    name="single-choice"
                                    value={options[2]}
                                    className="hidden"
                                    onChange={event => setAnswer(question.id, event.target.value)}
                                    checked={question.answer === options[2]}
                                />
                                <div className="flex justify-center">
                                    <span className="flex items-center text-sm font-custom  custom-text-color">Skip Consultation</span>
                                </div>
                            </div>
                        </div>
                    </div>
            
        </div>
      );
}

export default ConsultationQuestion;
