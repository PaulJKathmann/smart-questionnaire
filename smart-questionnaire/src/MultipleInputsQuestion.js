import React from "react";

function MultipleInputsQuestion({ question, setAnswer }) {
    const inputFocus = (e) => {
        e.target.previousElementSibling.classList.remove('mt-3', 'text-sm');
        e.target.previousElementSibling.classList.add('text-[9px]', 'mt-1');
    };
    
    const inputBlur = (e) => {
        if (!e.target.value) {
            e.target.previousElementSibling.classList.remove('text-[9px]', 'mt-1');
            e.target.previousElementSibling.classList.add('mt-3', 'text-sm');
        }
    };
    return (
        <div>
            <div className="relative mb-4">
                <p className="text-sm text-gray-500 mb-2">We ask for your email in order to share your quiz results and we will add you to our email list to receive 10% off your first treatment purchase, information on our services, special offers, and more.</p>
            </div>
            <div className="relative mb-4">
                <label htmlFor="first_name" className="absolute text-sm top-0 left-0 ml-3 mt-3 text-gray-500 transition-all duration-200">
                    First Name
                </label>
                <input
                    type="text"
                    id="first_name"
                    value={question.answer.first_name}
                    onChange={(e) => setAnswer(question.id, {
                        ...question.answer,
                        first_name: e.target.value,
                    })
                    }
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:custom-border-color"
                />
            </div>
            <div className="relative mb-4">
                <label htmlFor="name" className="absolute text-sm top-0 left-0 ml-3 mt-3 text-gray-500 transition-all duration-200">
                    Surname
                </label>
                <input
                    type="text"
                    id="name"
                    value={question.answer.surname}
                    onChange={(e) => setAnswer(question.id, {
                        ...question.answer,
                        surname: e.target.value,
                    })
                    }
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:custom-border-color"
                />
            </div>
            <div className="relative mb-4">
                <label htmlFor="email" className="absolute text-sm top-0 left-0 ml-3 mt-3 text-gray-500 transition-all duration-200">
                Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={question.answer.email}
                    onChange={(e) =>
                    setAnswer(question.id, {
                        ...question.answer,
                        email: e.target.value,
                    })
                    }
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:custom-border-color"
                />
            </div>
            <div className="relative mb-4">
                <label htmlFor="phone" className="absolute text-sm top-0 left-0 ml-3 mt-3 text-gray-500 transition-all duration-200">
                    Phone
                </label>
                <input
                    type="tel"
                    id="phone"
                    value={question.answer.phone}
                    onChange={(e) =>
                    setAnswer(question.id, {
                        ...question.answer,
                        phone: e.target.value,
                    })
                    }
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:custom-border-color"
                />
            </div>
            <div className="relative mb-4">
                <p className="text-grey-600/40 text-xs"> You will be subscribed to our email list. See our <a className="underline" href="https://www.carismaaesthetics.com/privacy-policy">Privacy Policy</a> for more information.</p>
            </div>
        </div>
    );
      
}

export default MultipleInputsQuestion;