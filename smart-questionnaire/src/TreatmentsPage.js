import React from 'react';
import { useEffect, useState } from 'react';
import { ReactComponent as BotoxIcon } from './assets/thumbnails/Botox.png';
import { ReactComponent as CollagenIcon } from './assets/thumbnails/Collagen.png';
import { ReactComponent as DermalFillersIcon } from './assets/thumbnails/DermalFiller.png';
import { ReactComponent as HydraFacialIcon } from './assets/thumbnails/Hydrafacial.png';
import { ReactComponent as MesotherapyIcon } from './assets/thumbnails/Mesotherapy.png';
import { ReactComponent as MicroneedlingIcon } from './assets/thumbnails/Microneedling.png';
import { ReactComponent as PRPIcon } from './assets/thumbnails/PRP.png';
import { ReactComponent as ThreadLiftIcon } from './assets/thumbnails/ThreadLift.png';
import { ReactComponent as UnderChinReductionIcon } from './assets/thumbnails/UnderChinReduction.png';



function TreatmentsPage() {
    const [data, setData] = useState([]);
    const treatmentsMap = {
        "Acne": [ CollagenIcon],
        "Dark circles": [MesotherapyIcon],
        "Double chin": [ UnderChinReductionIcon],
        "Dry skin": [ HydraFacialIcon],
        "Facial volumising": [ MicroneedlingIcon],
        "Oily skin": [ CollagenIcon],
        "Thin lips": [ PRPIcon],
        "Uneven skin tone": [ ThreadLiftIcon ],
        "Wrinkles": [ BotoxIcon , CollagenIcon, ThreadLiftIcon],
    } 

    useEffect(() => {
        const storedData = localStorage.getItem('questionnaireData');
        if (storedData) {
            setData(JSON.parse(storedData));
        } else {
            return <div> <h1> Loading...</h1></div> ;
        }
    }, []);

    let firstName = 'You'
    if (data[5]) {
        firstName = data[5].first_name;
    }


    return (
        <div className='min-h-screen flex items-start justify-center lg:pt-8'>
            <div className="min-h-screen p-1 lg:min-h-0 w-full">
                <div className='w-full mx-auto max-w-2xl bg-white shadow-lg p-5 lg:p-10'>
                    <h2 className='font-custom text-center text-1xl font-semibold mb-4'>Recommendations</h2>
                    <h1 className='font-custom text-center text-3xl font-semibold mb-4'>Made for {firstName}</h1>
                </div>
                <div className='w-full mx-auto max-w-2xl bg-white shadow-lg p-5 lg:p-10'>
                    {/* Map over data[0] show each selected treatment */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Selected treatments:</h3>
                    {data && data[0] && data[0].map((concern, index) => {
                        const thumbnails = treatmentsMap[concern];
                        return (
                            <div key={index} className="flex items-center mb-6 mx-auto">
                                <div className="flex-col text-left items-center justify-center mr-3">
                                    <h1 className='font-custom text-1xl mb-2'>You told us </h1>
                                    <h2> you wanted treatment for {concern}</h2>
                                </div>
                                <div className="border-b border-gray-400 mb-4">
                                    <h3 className='text-lg font-semibold text-gray-800 mb-2 mt-2'>Treatments:</h3>
                                    <div>
                                    {thumbnails.map((Thumbnail) => {
                                        return (
                                            <Thumbnail className="w-24 h-24 mr-2" />
                                        )
                                    }
                                    )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default TreatmentsPage;
