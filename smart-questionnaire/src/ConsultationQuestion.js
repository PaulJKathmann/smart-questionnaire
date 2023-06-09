import React from "react";
import InPersonConsultationIcon from './assets/thumbnails-consultation/InPersonconsult.png'
import VirtualConsultationIcon from './assets/thumbnails-consultation/VirtualConsult.png';

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
                        <div className={`${
                            question.answer.includes(option)
                              ? "choice-selected"
                              : "border-gray-200 border custom-text-color"
                          } h-72 w-72 p-2 bg-white cursor-pointer transition-all flex flex-col items-center justify-center`}>
                            <img className="w-12 h-12 mb-4" src={InPersonConsultationIcon} alt="In-person consultation icon" />
                        <h2 className="mb-4">In Person <br></br>Consult</h2>
                        <h3>€35<br></br><br></br></h3>
                    </div>
                            :
                        (option === "Free virtual consult (Newsletter)" 
                            &&
                            <div className={`${
                                question.answer.includes(option)
                                  ? "choice-selected"
                                  : "border-gray-200 border custom-text-color"
                              } h-72 w-72 p-2 bg-white cursor-pointer transition-all flex flex-col items-center justify-center`}>
                                <img className="w-12 h-12 mb-4" src={VirtualConsultationIcon} alt="Virtual consultation icon" />
                                <h2 className="mb-4">Virtual <br></br> Consult</h2>
                                <h3>FREE <br></br>(Subscribe to Newsletter)</h3>
                            </div>
                        )
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
