import React, { use, useState } from 'react';
import bunny from '../../assets/bunny.svg';
import carrot from '../../assets/carrot.svg';

import BottomNav from './BottomNav';
import ExpenseQuestion from './ExpenseQuestion';
import CurrencyInput from '../../components/CurrencyInput';
import SingleChoiceQuestion from './singleChoiceQuestion';

function OnboardingPage(){
    const [step, setStep] = useState(0);
    const totalQuestions = [1, 2, 3, 4, 5];

    const [salary, setSalary] = useState('');

    const [expenseItems, setExpenseItems] = useState([
        {id: 1, name: 'หนี้กยศ.', checked: false, amount: '' },
        {id: 2, name: 'ค่าที่พัก', checked: false, amount: '' },
        {id: 3, name: 'ค่าผ่อนรถ', checked: false, amount: '' },
    ])

    const [priorityChoice, setPriorityChoice] = useState(null);

    const [creditChoice, setCreditChoice] = useState(null);

    const [goalChoice, setGoalChoice] = useState(null);

    const SINGLE_CHOICE_QUESTIONS = {
        3: {
            title: 'ถ้าตอนนี้เธอมีเงินอยู่ 20,000 บาท สิ่งที่อยากทำที่สุดตอนนี้คืออะไรเหรอ',
            options: [
                { id: 1, text: 'ถอยโทรศัพท์รุ่นใหม่ที่เล็งไว้นานแล้วทันที' },
                { id: 2, text: 'ฝากเข้าบัญชีออมทรัพย์เก็บไว้ให้อุ่นใจ' },
                { id: 3, text: 'แบ่งออมนิดหน่อย ที่เหลือเอาไว้สอยของที่เคยใส่ในตะกร้า' },
                { id: 4, text: 'รีบเอาไปจ่ายโปะหนี้ที่ค้างไว้' },
                { id: 5, text: 'นำไปซื้อกองทุนหรือหุ้น' },
            ]
        },
        4: {
            title: 'เวลาพูดถึงเรื่อง “บัตรเครดิต” หรือ “หนี้สิน” เธอรู้สึกอย่างไร',
            options: [
                { id: 1, text: 'รูดไปก่อนค่อยว่ากัน' },
                { id: 2, text: 'เลี่ยงได้เลี่ยง! ไม่ชอบเป็นหนี้ใคร' },
                { id: 3, text: 'รูดซื้อของเล็กๆน้อยๆ แต่ถ้าเริ่มเห็นยอด สูงจะเริ่มเครียดแล้วยังตัวเองไม่ให้รูดต่อ' },
                { id: 4, text: 'หมุนเงินไม่ทัน มีหนี้หลายก้อนจนจำไม่ได้' },
                { id: 5, text: 'มองเป็นเครื่องมือสะสมแต้มหรือสิทธิประโยชน์รูดเต็มจำนวนและจ่ายตรงเวลา' },
            ]
        },
        5: {
            title: 'เธอวางแผนการเงินของตัวเองในอีก 1-3 ปีข้างหน้าว่าอย่างไรบ้าง',
            options: [
                { id: 1, text: 'เน้นเก็บเงินสำรองฉุกเฉิน / สร้างความมั่นคงขั้นแรก' },
                { id: 2, text: 'ตั้งใจปลดหนี้สินที่มีอยู่ให้หมดเรียบร้อย' },
                { id: 3, text: 'วางแผนซื้อทรัพย์สินใหญ่ (เช่น บ้าน, รถ, แต่งงาน)' },
                { id: 4, text: 'ลงทุนให้เงินทำงาน / สร้างพอร์ตให้เติบโต' },
                { id: 5, text: 'ยังไม่ได้คิดแผนชัดเจน เน้นใช้ชีวิตไปทีละวันก่อน' },
            ]
        },
    }
    
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
                        <p className='text-blackk mb-[1vh] leading-relaxed'>นี่ๆ ขอถามอะไรหน่อยสิ</p>
                        <h2 className='text-h4 font-medium text-blackk leading-relaxed'>เธอมีเงินเดือนเท่าไหร่หรอ</h2>
                        <CurrencyInput placeholder="กรอกเงินเดือน" value={salary} onChange={setSalary} className='w-3/4 text-center font-bold placeholder:font-normal placeholder:text-h3 text-h1 m-[2vh] pb-[1vh] border-b-2 border-gray-300 focus:outline-none focus:border-pinkk transition-colors mb-[4vh]' />
                    </>
                );
            case 2:
                return <ExpenseQuestion items={expenseItems} setItems={setExpenseItems} />
            case 3:
                // return <PriorityQuestion selectedID={priorityChoice} setSelectedID={setPriorityChoice} />
                return (
                    < SingleChoiceQuestion
                        title={SINGLE_CHOICE_QUESTIONS[3].title}
                        options={SINGLE_CHOICE_QUESTIONS[3].options}
                        selectedID={priorityChoice}
                        onSelectedID={setPriorityChoice}
                    />
                )
            case 4:
                // return <CreditAttitudeQuestion selectedID={creditChoice} setSelectedID={setCreditChoice}/>
                return (
                    < SingleChoiceQuestion
                        title={SINGLE_CHOICE_QUESTIONS[4].title}
                        options={SINGLE_CHOICE_QUESTIONS[4].options}
                        selectedID={creditChoice}
                        onSelectedID={setCreditChoice}
                    />
                )
            case 5:
                // return <FinancialGoalQuestion selectedID={goalChoice} setSelectedID={setGoalChoice} />
                return (
                    < SingleChoiceQuestion
                        title={SINGLE_CHOICE_QUESTIONS[5].title}
                        options={SINGLE_CHOICE_QUESTIONS[5].options}
                        selectedID={goalChoice}
                        onSelectedID={setGoalChoice}
                    />
                )
            default:
                return null;
        }
    }
    
    // ส่งค่าเป็น True or False โดยถ้าเป็น True คือ ไม่แสดง ส่วนถ้าเป็น False คือแสดง
    // ถ้าเข้าเงื่อนไขด้านล่างก็คือเป็น true ก็คือไม่แสดง
    const isNextDisabled = () => {
        switch (step){
            case 1:
                return !salary || Number(salary) <= 0;
            case 2:
                return false;
            case 3:
                return priorityChoice === null;
            case 4:
                return creditChoice === null;
            case 5:
                return goalChoice === null;
            default:
                return false;
        }
    }

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
                        disable={isNextDisabled()}
                    />
                </div>
            )}
        </div>
    );
}

export default OnboardingPage;