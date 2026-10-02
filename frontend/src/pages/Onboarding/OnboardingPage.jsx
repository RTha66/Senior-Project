import React, { useState } from 'react';
import bunny from '../../assets/bunny.svg';
import carrot from '../../assets/carrot.svg';

import BottomNav from './BottomNav';
import ExpenseQuestion from './ExpenseQuestion';
import CurrencyInput from '../../components/CurrencyInput';

function OnboardingPage(){
    const [step, setStep] = useState(0);
    const totalQuestions = [1, 2, 3, 4, 5];

    const [salary, setSalary] = useState('');
    const [expenseItems, setExpenseItems] = useState([
        {id: 1, name: 'หนี้กยศ.', checked: false, amount: '' },
        {id: 2, name: 'ค่าที่พัก', checked: false, amount: '' },
        {id: 3, name: 'ค่าผ่อนรถ', checked: false, amount: '' },
    ])
    
    const getBunnyPosition = () => {
        if (step === 0) return 'translate-y-[calc(100vh-90vw)]';
        if (step === 1) return 'translate-y-[calc(53vh-75vw)]';
        return 'translate-y-[-10vh]';
    }
    // ฟังก์ชันช่วยเหลือจะเป็น ขึ้นต้นด้วยตัวเล็ก
    const question = () => {
        switch(step) {
            case 1:
                return (
                    <>
                        <p className='text-blackk mb-[1vh]'>นี่ๆ ขอถามอะไรหน่อยสิ</p>
                        <h2 className='text-h4 font-medium text-blackk'>เธอมีเงินเดือนเท่าไหร่หรอ</h2>
                        <CurrencyInput placeholder="กรอกเงินเดือน" value={salary} onChange={setSalary} className='w-3/4 text-center text-[clamp(1.2rem,5vw,1.5rem)] m-[2vh] pb-[1vh] border-b-2 border-gray-300 focus:outline-none focus:border-pinkk transition-colors mb-[4vh]' />
                    </>
                );
            case 2:
                return <ExpenseQuestion items={expenseItems} setItems={setExpenseItems} />;
            case 3:
                return (
                    <>
                        <h2 className='text-h4 font-medium text-blackk px-[2vw]'>ถ้าตอนนี้เธอมีเงินอยู่ 20,000 บาท สิ่งที่อยากทำที่สุดตอนนี้คืออะไรเหรอ</h2>

                    </>
                );
            default:
                return null;
        }
    }

    // const salaryChange

    return (
        // ใช้ min-h-[100dvh] เพราะว่ามันจะรวมในส่วนของแถบ URL มาด้วย ถ้าเป็น vh ธรรมดาจะไม่รวมจะทำให้ตอนแสดงมันจะโดนบังได้
        // ใน tailwind เปลี่ยนเป็น -dvh = 100dvh
        <div className="bg-babyblue w-full min-h-dvh relative overflow-hidden flex flex-col">
            {step > 0 && (
                // progressbar
                // ใช้ left-0 เพราะว่าพอใช้ absolute กับ w-full บราวเซอร์ก็งงว่าความกว้างคือตรงไหนแต่ถ้าเติม left-0 คือชิดซ้ายก็ให้เริ่มที่ขอบจอและค่อยกางความกว้างไป่ี
                <div className='absolute top-[6vh] w-full left-0 flex justify-center items-center gap-[1.2vh] z-30'>
                    {totalQuestions.map((num) => ( num === step ?
                        (
                            <img src={carrot} alt='carrot' className='w-[3vw]' key={num}/>
                        ) : (
                            <img className='w-[2.5vw] h-[2.5vw] bg-[#d3d3d3] rounded-full' key={num}/>
                        )
                    ))}
                </div>
            )}
            {/* 
                ${step != 0 ? 'opacity-0 invisible' : 'opacity-100 visible'} คือ Ternary Operator
            */}
            {/* หน้าแรก step 0 */}
            <div className={`absolute top-[15vh] flex flex-col items-center w-full h-dvh gap-[2vh] text-center z-10 transition-all duration-500 ease-in-out ${step != 0 ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
                <p>ยินดีต้อนรับเข้าสู่</p>
                <h1>ชื่อ APP</h1>
                <p>มาเริ่มจัดการด้านการเงินด้วยกันเถอะ</p>
                <button onClick={() => setStep(1)} 
                    className='bg-white rounded-full w-[75vw] h-[7vh] mt-[2vh] text-center text-gray-800 font-bold text-[clamp(0.8rem,7vw,1.5rem)]'
                    >Start</button>
            </div>
            <div className={`absolute left-0 w-full h-screen flex flex-col items-center transition-transform duration-700 ease-in-out z-10 ${getBunnyPosition()}`}>
                {/* กระต่ายน้อยสุดน่ารักมุ๊มิ๊ๆ ปุ๊ปิ๊ๆ อุ๊อิ๊ๆ */}
                <img src={bunny} alt='bunny' className='w-[110%] block justify-center z-[20]' />
                {/* ข้อความด้านล่างกระต่าย */}
                <div className='bg-white w-full h-[150vh] flex flex-1 p-0 -mt-[5vw] text-center relative z-20'>
                    {step >= 1 && (
                        <div className='flex flex-col flex-1 items-center w-full px-[6vw] pb-[15vh]'>
                            {question()}
                        </div>
                    )}
                </div>
            </div>
            {/* แถบตรง navbar ด้านล่าง */}
            {step >= 1 && (
                <div className='absolute bottom-0 left-0 w-full bg-white z-50 px-[6vw] pt-[2vh] pb-[3vh]'>
                    <BottomNav
                        onBack={() => setStep(step - 1)}
                        onNext={() => setStep(step + 1)}
                    />
                </div>
            )}
        </div>
    );
}

export default OnboardingPage;