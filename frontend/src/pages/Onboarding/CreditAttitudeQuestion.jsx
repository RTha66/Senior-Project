import React from "react";

export default function CreditAttitudeQuestion({selectedID, setSelectedID}) {
    const options = [
        {id: 1,text: 'รูดไปก่อนค่อยว่ากัน'},
        {id: 2,text: 'เลี่ยงได้เลี่ยง! ไม่ชอบเป็นหนี้ใคร'},
        {id: 3,text: 'รูดซื้อของเล็กๆน้อยๆ แต่ถ้าเริ่มเห็นยอด สูงจะเริ่มเครียดแล้วยังตัวเองไม่ให้รูดต่อ'},
        {id: 4,text: 'หมุนเงินไม่ทัน มีหนี้หลายก้อนจนจำไม่ได้'},
        {id: 5,text: 'มองเป็นเครื่องมือสะสมแต้มหรือสิทธิประโยชน์รูดเต็มจำนวนและจ่ายตรงเวลา'},
    ];

    return (
        <div className="flex flex-col w-full items-center">
            <h2 className="text-h4 font-medium text-blackk px-[2vw] leading-relaxed">เวลาพูดถึงเรื่อง “บัตรเครดิต” หรือ “หนี้สิน” เธอรู้สึกอย่างไร</h2>
            <div className="flex flex-col w-full gap-[1.5vh] px-[1vh] pb-[6dvh] mt-[4vh] overflow-y-auto max-h-[calc(100dvh-90vw-11dvh)] hide-scrollbar">
                {options.map((opt) => {
                    const isSelected = selectedID === opt.id;
                    return (
                        <div key={opt.id}
                            onClick={() => setSelectedID(opt.id)}
                            className={`flex items-center gap-[2vh] w-full p-[2vh] border-[1.5px] rounded-xl transition-all
                                ${isSelected ? 'border-pinkk bg-pink-50':'border-babyblue bg-white'}`}
                        >
                            {/* ปุ่มวงกลม */}
                            <div className={`flex items-center justify-center flex-shrink-0 w-[clamp(1.5rem,5vw,2.5rem)] h-[clamp(1.5rem,5vw,2.5rem)] rounded-full border-2 transition-colors ${isSelected ? 'border-hotpink':'border-gray-300 bg-gray-100'} `}>
                                {/* วงกลมด้านใน */}
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