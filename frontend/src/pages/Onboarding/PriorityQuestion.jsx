import React from "react";

export default function PriorityQuestion({selectedID, setSelectedID}) {
    const options = [
        {id: 1, text: 'ถอยโทรศัพท์รุ่นใหม่ที่เล็งไว้นานแล้วทันที'},
        {id: 2, text: 'ฝากเข้าบัญชีออมทรัพย์เก็บไว้ให้อุ่นใจ'},
        {id: 3, text: 'แบ่งออมนิดหน่อย ที่เหลือเอาไว้สอยของที่เคยใส่ในตะกร้า'},
        {id: 4, text: 'รีบเอาไปจ่ายโปะหนี้ที่ค้างไว้'},
        {id: 5, text: 'นำไปซื้อกองทุนหรือหุ้น'},
    ];

    return (
        <div className="flex flex-col items-center w-full">
            <h2 className='text-h4 font-medium text-blackk px-[2vw] leading-relaxed'>ถ้าตอนนี้เธอมีเงินอยู่ 20,000 บาท สิ่งที่อยากทำที่สุดตอนนี้คืออะไรเหรอ</h2>
            <div className="flex flex-col w-full gap-[1.5vh] px-[1vh] pb-[6dvh] mt-[4vh] overflow-y-auto max-h-[calc(100dvh-90vw-11dvh)] hide-scrollbar">
                {options.map((opt) => {
                    const isSelected = selectedID === opt.id;
                    return (
                        // กล่องตัวเลือก
                        <div key={opt.id}
                            onClick={() => setSelectedID(opt.id)}
                            className={`flex items-center gap-[2vh] w-full p-[2vh] border-[1.5px] rounded-xl transition-all
                                ${isSelected ?'border-pinkk bg-pink-50':'border-babyblue bg-white'}`}
                        >
                            {/* ปุ่มวงกลม */}
                            <div className={`w-[clamp(1.5rem,5vw,2.5rem)] h-[clamp(1.5rem,5vw,2.5rem)] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? 'border-hotpink':'border-gray-300 bg-gray-100'}`}>
                                {isSelected && <div className="w-[60%] h-[60%] bg-hotpink rounded-full" />}
                            </div>
                            {/* ข้อความ */}
                            <span className={`text-left text-p flex-1 ${isSelected ? 'text-blackk font-semibold':'text-gray-600'}`}>
                                {opt.text}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}