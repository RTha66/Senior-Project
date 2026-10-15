import React from "react";
import awesomeIcon from '../assets/Awesome.svg';

export default function MoodGoalsPopup({ isOpen, onClose }) {
    // ถ้าไม่ได้เปิดเป็น false ไม่ต้องแสดงอะไรเลย แล้วก็จะไม่สร้าง animate
    if (!isOpen) return null;
    return (
        <>
            {/* ฉากหลังมืด + เบลอ*/}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4" onClick={onClose}>
                {/* กล่องสีขาว */}
                <div className="animate-card-bounce w-full bg-white rounded-3xl px-7 py-10 shadow-2xl flex flex-col items-center text-center"
                    // ป้องกันไม่ให้กดการ์ดแล้ว popup ปิดลง stopPropagation คือหยุดการส่งต่อสัญญาณคลิก
                    onClick={(e) => e.stopPropagation()}>
                    {/* กล่องวาง Mood + เงา*/}
                    <div className="relative mb-5 flex flex-col items-center select-none">
                        {/* ใส่ animation */}
                        <div className="animate-mood-wiggle [transform-origin:50%_90%]">
                            <img src={awesomeIcon} alt="Mood" className="w-28 h-28 object-contain"/>
                        </div>
                        <div className="animate-shadow-pulse absolute -mt-1.5 -bottom-1.5 w-[68px] h-[10px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0)_70%)]" />
                    </div>
                    {/* ข้อความ */}
                    <div className="text-blackk font-medium text-p leading-relaxed mb-6 gap-y-0.5">
                        <p>มาเลี่ยงน้อง Mood ให้มีความสุข</p>
                        <p>ด้วยการออมเงินตามเป้าหมายกันเถอะ</p>
                    </div>
                    {/* ปุ่ม */}
                    <button onClick={onClose} className="w-fit py-2.5 px-6 bg-bluee text-blackk font-semibold text-p rounded-xl">
                        เริ่มต้นการออมเงิน
                    </button>
                </div>
            </div>
        </>
    )
}