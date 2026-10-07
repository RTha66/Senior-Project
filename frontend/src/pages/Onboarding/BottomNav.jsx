import React from "react";
import leftArrow from '../../assets/icon_leftArrow.svg';

// component จะเป็นขึ้นต้นตัวใหญ่
function BottomNav({ onBack, onNext, disable}) {
    return (
        <div className='flex justify-between items-center w-full gap-2'>
            <button onClick={onBack}
                className='w-[14vw] h-[14vw] flex items-center justify-center rounded-full bg-babypinkk text-blackk hover:bg-gray-200 transition-color'
                >
                     <img src={leftArrow} alt="back" className="w-[50%]" />
                </button>
            <button onClick={onNext} disabled={disable}
                className={`text-h4 font-semibold py-[1.7vh] px-[8vh] flex-1 rounded-full ${disable ? 'bg-gray-300 text-gray-500':'bg-bluee text-blackk'}`}
                >Next</button>
        </div>
    );
}

export default BottomNav;