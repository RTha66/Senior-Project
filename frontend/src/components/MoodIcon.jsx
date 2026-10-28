import React from "react";

import greatJobStatic from '../assets/great_job_Mood.svg';
import awesomeStatic from '../assets/awesome_Mood.svg';
import goodStatic from '../assets/good_Mood.svg';
import soSoStatic from '../assets/so_so_Mood.svg';
import sadStatic from '../assets/sad_Mood.svg';

import greatJobAnimate from '../assets/great_Job_animate.svg';
import awesomeAnimate from '../assets/awesome_animate.svg';
import goodAnimate from '../assets/good_animate.svg';
import soSoAnimate from '../assets/so_so_animate.svg';
import sadAnimate from '../assets/sad_animate.svg'

export const MOODS = {
    GREATJOB: {
        textColor: 'text-[#55C81B]', barColor: 'bg-[#B4F05A]', icon: greatJobStatic, animateIcon: greatJobAnimate
    },
    AWSOME: {
         textColor: 'text-[#E06516]', barColor: 'bg-[#F99F66]', icon: awesomeStatic, animateIcon: awesomeAnimate
    },
    GOOD: {
        textColor: 'text-[#E0A816]', barColor: 'bg-[#F9D066]', icon: goodStatic, animateIcon: goodAnimate
    },
    SOSO: {
        textColor: 'text-[#0298F4]', barColor: 'bg-[#61C3F9]', icon: soSoStatic, animateIcon: soSoAnimate
    },
    SAD: {
        textColor: 'text-[#E77C7C]', barColor: 'bg-[#F7A8A8]', icon: sadStatic, animateIcon: sadAnimate
    },
}

// คำนวณว่ายอดนี้ควรได้ mood อะไร
export function getGoalMood(currentAmount, targetAmount) {
    const percentage = Math.min(Math.round((currentAmount/targetAmount)*100), 100);

    let key = 'so_so';
    if (percentage >= 100) return { percentage, ...MOODS.GREATJOB };
    if (percentage >= 75) return { percentage, ...MOODS.AWSOME };
    if (percentage >= 50) return { percentage, ...MOODS.GOOD };
    if (percentage > 0) return { percentage, ...MOODS.SOSO };
    return { percentage, ...MOODS.SAD };
}

export default function MoodIcon({ icon, className = 'w-20 h-20'}) {
    return (
        <img
            src={icon}
            alt='Mood'
            className={`${className} object-contain`}
        />
    )
}