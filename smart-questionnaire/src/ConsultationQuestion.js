import React from "react";
import InPersonConsultation from './assets/thumbnails-consultation/In person consult.png';
import VirtualConsultation from './assets/thumbnails-consultation/Virtual consult.png';
import InPersonConsultationSelected from './assets/thumbnails-consultation/In person consult selected.png';
import VirtualConsultationSelected from './assets/thumbnails-consultation/Virtual consult selected.png';
import SkipConsultation from './assets/thumbnails-consultation/Skip consultation button.png';
import SkipConsultationSelected from './assets/thumbnails-consultation/Skip consultation button selected.png';

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
                            (question.answer === option ? 
                                <img src={InPersonConsultationSelected} className="w-62 cursor-pointer" />
                                : 
                                <img src={InPersonConsultation} className="w-62 cursor-pointer" />
                            ) 
                            : 
                            (question.answer === option ? 
                                <img src={VirtualConsultationSelected} className="w-62 cursor-pointer" />
                                : 
                                <img src={VirtualConsultation} className="w-62 cursor-pointer" />
                            )
                        }
                    </div>
                </div>
            ))}
            </div>
            <div className="mt-4">
                <div key={3}
                onClick={() => setAnswer(question.id, options[2])}
                >
                    <div key={3} className="flex items-center">
                        <input
                            type="radio"
                            id={`option-${3}`}
                            name="single-choice"
                            value={options[2]}
                            className="hidden"
                            onChange={event => setAnswer(question.id, event.target.value)}
                            checked={question.answer === options[2]}
                        />
                        {(question.answer === options[2]) ? 
                            <img src={SkipConsultationSelected} className="w-62 cursor-pointer" /> 
                            : 
                            <img src={SkipConsultation} className="w-62 cursor-pointer" />
                        }
                    </div>
                </div>
            </div>
        </div>
      );
}

export default ConsultationQuestion;
