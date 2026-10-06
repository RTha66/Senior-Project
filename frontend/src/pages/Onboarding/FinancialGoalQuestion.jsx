import React from "react";

export default function FinancialGoalQuestion({selectedID, setSelectedID}) {
    const options = [
        {id: 1, text: 'เน้นเก็บเงินสำรองฉุกเฉิน / สร้างความมั่นคงขั้นแรก'},
        {id: 2, text: 'ตั้งใจปลดหนี้สินที่มีอยู่ให้หมดเรียบร้อย'},
        {id: 3, text: 'วางแผนซื้อทรัพย์สินใหญ่ (เช่น บ้าน, รถ, แต่งงาน)'},
        {id: 4, text: 'ลงทุนให้เงินทำงาน / สร้างพอร์ตให้เติบโต'},
        {id: 5, text: 'ยังไม่ได้คิดแผนชัดเจน เน้นใช้ชีวิตไปทีละวันก่อน'},
    ];

    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="text-h4 font-medium text-blackk px-[2vw] leading-relaxed">เธอวางแผนการเงินของตัวเองในอีก 1-3 ปีข้างหน้าว่าอย่างไรบ้าง</h2>
            <div className="flex flex-col w-full gap-[1.5vh] px-[1vh] pb-[6dvh] mt-[4vh] overflow-y-auto max-h-[calc(100dvh-90vw-11dvh)] hide-scrollbar">
                {options.map((opt) => {
                    const isSelected = selectedID === opt.id;
                    return(
                        // แต่ละรายการ
                        <div key={opt.id}
                            onClick={() => setSelectedID(opt.id)}
                            className={`flex items-center gap-[2vh] w-full p-[2vh] border-[1.5px] rounded-xl transition-all
                                ${isSelected ?'border-pinkk bg-pink-50':'border-babyblue bg-white'}`}
                                >
                            {/* ปุ่มวงกลม */}
                            <div className={`w-[clamp(1.5rem,5vw,2.5rem)] h-[clamp(1.5rem,5vw,2.5rem)] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? 'border-hotpink':'border-gray-300 bg-gray-100'}`}>
                                {/* วงด้านในเมื่อเลือก */}
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