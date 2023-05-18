import React from "react";
import InPersonConsultation from "./assets/thumbnails/InPersonConsult.png";
import VirtualConsultation from "./assets/thumbnails/VirtualConsult.png";

function ConsultationQuestion({ question, options, setAnswer, handleSubmit }) {
   const consultationOptions = options.slice(0, 2);

   const setAnswerAndNext = (id, value) => {
        setAnswer(id, value);
        handleSubmit();
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 space-around">
            {consultationOptions.map((option, index) => (
                <div key={index}
                onClick={() => setAnswerAndNext(question.id, option)}
                >
                    <div key={index} className="flex justify-center transform hover:scale-110 transition-transform duration-200">
                        <input
                            type="radio"
                            id={`option-${index}`}
                            name="single-choice"
                            value={option}
                            className="hidden"
                            onChange={event => setAnswerAndNext(question.id, event.target.value)}
                            checked={question.answer === option}
                        />
                    {option === "In person consult (€35)" ? 
                    <img src={InPersonConsultation} className="w-80 cursor-pointer" />
                    : 
                    <img src={VirtualConsultation} className="w-80 cursor-pointer" />
                    }
                    </div>
                </div>
            ))}
            </div>
            <div className="mt-4">
                <div key={3}
                onClick={() => setAnswerAndNext(question.id, options[2])}
                >
                    <div key={3} className="flex items-center">
                        <input
                            type="radio"
                            id={`option-${3}`}
                            name="single-choice"
                            value={options[2]}
                            className="hidden"
                            onChange={event => setAnswerAndNext(question.id, event.target.value)}
                            checked={question.answer === options[2]}
                        />
                    <label htmlFor={`option-${3}`} className="mx-auto flex items-center text-sm mb-2 font-custom font-custom-color underline cursor-pointer">{options[2]}</label>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default ConsultationQuestion;