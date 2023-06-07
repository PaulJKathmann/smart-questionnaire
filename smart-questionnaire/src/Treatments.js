import React from 'react';
import { useEffect, useState } from 'react';
import BotoxIcon from './assets/thumbnails/Botox.png';
import CollagenIcon from './assets/thumbnails/Collagen.png';
import DermalFillersIcon  from './assets/thumbnails/DermalFiller.png';
import HydraFacialIcon  from './assets/thumbnails/Hydrafacial.png';
import MesotherapyIcon  from './assets/thumbnails/Mesotherapy.png';
import MicroneedlingIcon  from './assets/thumbnails/Microneedling.png';
import PRPIcon from './assets/thumbnails/PRP.png';
import ThreadLiftIcon from './assets/thumbnails/ThreadLift.png';
import UnderChinReductionIcon from './assets/thumbnails/UnderChinReduction.png';
import MFUIcon from './assets/thumbnails/MFU.png';
import LipFillersIcon from './assets/thumbnails/LipFiller.png';
import {ReactComponent as IconWrinkles} from "./assets/icons/Wrinkles.svg";
import {ReactComponent as IconThinLips} from "./assets/icons/ThinLips.svg";
import {ReactComponent as IconFacialVolumising} from "./assets/icons/FacialVolumising.svg";
import {ReactComponent as IconUnevenSkinTone} from "./assets/icons/UnevenSkinTone.svg";
import {ReactComponent as IconAcne} from "./assets/icons/Acne.svg";
import {ReactComponent as IconDoubleChin} from "./assets/icons/DoubleChin.svg";
import {ReactComponent as IconDarkCircles} from "./assets/icons/DarkCircles.svg";
import {ReactComponent as IconDrySkin} from "./assets/icons/DrySkin.svg";
import {ReactComponent as IconOilySkin} from "./assets/icons/OilySkin.svg";



function Treatments() {
    const [data, setData] = useState([]);
    const [treatments, setTreatments] = useState(new Set());
   // store all treatments in a hashmap with the key being the treatment and the values being the images, links, descriptions and list of concerns
    const treatmentsMap = {
        "Collagen": { image: CollagenIcon, link: "https://www.carismaaesthetics.com/collagen-stimulator", description: "Collagen stimulators are used to stimulate the body’s own collagen production. They are injected into the skin and work by stimulating the body’s own collagen production. Collagen stimulators are used to treat wrinkles, facial volume loss, acne scars and cellulite.", concerns: ["Wrinkles", "Facial volumising", "Uneven skin tone", "Acne", "Double chin", "Dark circles", "Dry skin", "Oily skin"] },
        "Botox":   { image: BotoxIcon, link: "https://www.carismaaesthetics.com/botoxmalta", description: "Botox is a muscle relaxant that is injected into the skin to reduce the appearance of wrinkles. It is used to treat wrinkles, facial slimming, teeth grinding, excessive sweating and migraines.", concerns: ["Wrinkles", "Oily skin"] },
        "DermalFillers": { image: DermalFillersIcon, link: "https://www.carismaaesthetics.com/dermalfillersmalta", description: "Dermal fillers are used to restore volume loss in the face. They are injected into the skin and are used to treat wrinkles, facial volume loss, thin lips, facial slimming, acne scars, cellulite and dark circles.", concerns: ["Wrinkles", "Thin lips", "Facial volumising", "Double chin", "Dark circles"] },
        "HydraFacial": { image: HydraFacialIcon, link: "https://www.carismaaesthetics.com/hydrafacialmalta", description: "HydraFacial is a medical grade facial that uses patented technology to cleanse, extract and hydrate the skin. It is used to treat acne, uneven skin tone, dry skin and wrinkles.", concerns: ["Uneven skin tone", "Acne", "Dry skin"] },
        "Mesotherapy": { image: MesotherapyIcon, link: "https://www.carismaaesthetics.com/mesotherapymalta", description: "Mesotherapy is a treatment that involves injecting a cocktail of vitamins, minerals and hyaluronic acid into the skin. It is used to treat dark circles, acne scars, cellulite and dry skin.", concerns: ["Dark circles", "Dry skin", "Uneven skin tone"] },
        "Microneedling": { image: MicroneedlingIcon, link: "https://www.carismaaesthetics.com/microneedlingmalta", description: "Microneedling is a treatment that involves using a device with tiny needles to create micro-injuries in the skin. It is used to treat acne scars, dark circles, dry skin, uneven skin tone and wrinkles.", concerns: ["Acne", "Dark circles", "Dry skin", "Uneven skin tone", "Wrinkles"] },
        "PRP": { image: PRPIcon, link: "https://www.carismaaesthetics.com/prpmalta", description: "PRP (Platelet Rich Plasma) is a treatment that involves taking a sample of your blood, spinning it in a centrifuge to separate the plasma and then injecting the plasma into the skin. It is used to treat dark circles, acne scars, dry skin and wrinkles.", concerns: ["Dark circles", "Dry skin", "Uneven skin tone", "Wrinkles"] },
        "ThreadLift": { image: ThreadLiftIcon, link: "https://www.carismaaesthetics.com/threadliftmalta", description: "Thread lifts are a non-surgical alternative to a facelift. They involve inserting dissolvable threads into the skin to lift and tighten the skin. They are used to treat wrinkles and facial volume loss.", concerns: ["Wrinkles", "Facial volumising"] },
        "UnderChinReduction": { image: UnderChinReductionIcon, link: "https://www.carismaaesthetics.com/chinfatreductionmalta", description: "Under chin reduction is a treatment that involves injecting a fat dissolving solution into the skin. It is used to treat double chin.", concerns: ["Double chin"] },
        "MFU": { image: MFUIcon, link: "https://www.carismaaesthetics.com/mfu-ultight", description: "MFU (Micro Focused Ultrasound) is a treatment that uses ultrasound energy to tighten the skin. It is used to treat wrinkles and facial volume loss.", concerns: ["Wrinkles", "Facial volumising"] },
        "Lip Fillers": { image: LipFillersIcon, link: "https://www.carismaaesthetics.com/lipfillers", description: "Lipfillers description", concerns: ["Thin lips"] }
   // get the treatments by concern using a map of concerns to treatments including the needle question
    }
    const withNeedleMap = { 
        "Acne": ["Collagen", "Microneedling", "PRP"], 
        "Dark circles": ["DermalFillers", "PRP", "Microneedling", "Mesotherapy"], 
        "Double chin": ["UnderChinReduction", "DermalFillers", "MFU", "Collagen"], 
        "Dry skin": ["HydraFacial", "Mesotherapy", "Microneedling", "PRP"], 
        "Facial volumising": ["DermalFillers", "Collagen", "MFU", "ThreadLift", "UnderChinReduction"], 
        "Oily skin": ["PRP", "Microneedling", "Botox"], 
        "Thin lips": ["Lip Fillers"], 
        "Uneven skin tone": ["HydraFacial", "Mesotherapy", "Microneedling", "PRP", "Botox"], 
        "Wrinkles": ["Botox", "DermalFillers", "Collagen", "MFU", "ThreadLift", "Mesotherapy"]
    }
   // non-needlemap
    const withoutNeedleMap = {
        "Acne": ["Chemical Peel", "HydraFacial", "Topical Skincare"],
        "Dark circles": ["DermalFillers", "PRP", "Microneedling", "Mesotherapy"],
        "Double chin": ["UnderChinReduction", "DermalFillers", "MFU", "Collagen"],
        "Dry skin": ["HydraFacial", "Mesotherapy", "Microneedling", "PRP"],
        "Facial volumising": ["DermalFillers", "Collagen", "MFU", "ThreadLift", "UnderChinReduction"],
        "Oily skin": ["PRP", "Microneedling", "Botox"],
        "Thin lips": ["Lip Fillers"],
        "Uneven skin tone": ["HydraFacial", "Mesotherapy", "Microneedling", "PRP", "Botox"],
        "Wrinkles": ["Botox", "DermalFillers", "Collagen", "MFU", "ThreadLift", "Mesotherapy"]
    }

    const optionIcons = {
        'Wrinkles': IconWrinkles,
        'Thin lips': IconThinLips,
        'Facial volumising': IconFacialVolumising,
        'Uneven skin tone': IconUnevenSkinTone,
        'Acne': IconAcne,
        'Double chin': IconDoubleChin,
        'Dark circles': IconDarkCircles,
        'Dry skin': IconDrySkin,
        'Oily skin': IconOilySkin,
    };

    useEffect(() => {
        const storedData = localStorage.getItem('questionnaireData');
        if (storedData) {
            setData(JSON.parse(storedData));
        } else {
            return <div> <h1> Loading...</h1></div> ;
        }
    }, []);

    useEffect(() => {
        if (data && data.length > 0) {
            let tempTreatments = new Set();
            if (data[2] === 'Yes') {
                data[0].forEach(concern => {
                    
                    withNeedleMap[concern].forEach((treatment) => {
                        tempTreatments.add(treatment);
                    })
                });
            } else {
                data[0].forEach(concern => {
                    withoutNeedleMap[concern].forEach((treatment) => {
                        tempTreatments.add(treatment);
                    })
                });
            }
            setTreatments(tempTreatments);
        }
    }, [data]);

    let firstName = 'You'
    if (data[5]) {
        firstName = data[5].first_name;
    }

    return (
        <div className='min-h-screen flex items-start justify-center lg:pt-8'>
            <div className="min-h-screen p-1 lg:min-h-0 w-full">
                <div className='w-full mx-auto max-w-2xl bg-white p-1 lg:p-10'>
                    <h2 className='font-custom custom-text-color text-center text-1xl font-semibold mb-4'>Recommendations</h2>
                    <h1 className='font-custom custom-text-color text-center text-3xl font-semibold mb-4'>Made for {firstName}</h1>
                    {data && data[4] === 'In person consult (€35)' ? 
                    <p className='font-custom custom-text-color'>We have received your contact information and will be reaching out to you soon to schedule your appointment.
                      <br></br>Below are possible treatments options typically suggested for your skin concerns. Kindly note that every individual is different and we look forward to discussing the best treatment plan 
                      to address your unique needs. 
                      </p> : 
                       <p className='font-custom custom-text-color'>Please find below treatments options tailored to your skin concerns.
                       <br></br>Kindly note that every individual is different and we highly recommend booking a consultation with one of our qualified practitioners to discuss what treatments would best address your unique needs.
                       </p>
                    }
                    <div className='border border-gray-100 mt-6'> </div>
                </div>
                <div className='w-full mx-auto max-w-3xl bg-white p-2 lg:p-4'>
                    {treatments.size > 0 && Array.from(treatments).map((treatment) => {
                        const treatmentData = treatmentsMap[treatment];
                        return (
                            <div key={treatment} className='mt-4'>
                                <div className='flex flex-col items-center sm:flex-row border-b border-gray-200 pb-4'>
                                    <img className='w-64 h-64' src={treatmentData.image} alt={treatment}></img>
                                    <div className='flex flex-col m-4'>
                                        <h2 className='text-left font-custom custom-text-color text-1xl font-semibold mb-4'>{treatment}</h2>
                                        <p className='text-left'>{treatmentData.description}</p>
                                        <div className='col-span-1 sm:col-span-2 my-4'>
                                            <h2 className='text-left font-custom custom-text-color text-1xl font-semibold' >Treatable concerns</h2>
                                        </div>
                                        <div className='grid grid-cols-4 sm:grid-cols-6 gap-1'>
                                            {treatmentData.concerns.map((concern, index) => {
                                                const Icon = optionIcons[concern];
                                                return (
                                                    <div key={index} className='m-2 flex flex-col'>
                                                        <Icon className="w-8 h-8 mx-auto" alt={concern} />
                                                        <p className='text-xs mt-2'>{concern}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <a href={treatmentData.link} className="sm:static sm:mr-0 sm:mb-0 w-full 
                                        py-2 h-10 custom-button-color text-white font-custom mt-2">Learn more</a>
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

export default Treatments;
