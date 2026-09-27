import React, { useState } from 'react';
import './OnboardingPage.css'; 
import bunny from '../../assets/bunny.svg';
import carrot from '../../assets/carrot.svg';

function OnboardingPage(){
    const [step, setStep] = useState(0);
    const totalQuestions = [1, 2, 3, 4, 5];
    const getBunnyPosition = () => {
        if (step === 0) return 'at-bottom';
        if (step === 1) return 'at-middle';
        return 'at-top';
    }
    return (
        <div className="onBoard-bg">
            {step > 0 && (
                <div className='progress-bar'>
                    {totalQuestions.map((num) => ( num === step ?
                        (
                            <img src={carrot} alt='carrot' className='progress-carrot' key={num}/>
                        ) : (
                            <img className='progress-dot' key={num}/>
                        )
                    ))}
                </div>
            )}
            {/* ${step !== 0 ? 'fade-out' : ''} คือ Multiple Class Selection หรือการเลือกคลาสแบบผสม
                เรียกเทคนิคนี้ว่า Class Toggling หรือการสลับคลาส
                start-screen-content เป็น Base Class คือหน้าตาพื้นฐาน
                .fade-out เป็น State Class คือเติมมาทีหลังโดยจะเขียนทับ Base Class 
            */}
            <div className={`start-screen-content ${step !== 0 ? 'fade-out' : ''}`}>
                <p>ยินดีต้อนรับเข้าสู่</p>
                <h1>ชื่อ APP</h1>
                <p>มาเริ่มจัดการด้านการเงินด้วยกันเถอะ</p>
                <button onClick={() => setStep(1)} className='btn-start'>Start</button>
            </div>
            <div className={`bunny-sliding-layer ${getBunnyPosition()}`}>
                    <img src={bunny} alt='bunny' className='bunny-img' />
                    <div className='bunny-white-body'>
                        {step === 1 &&(
                            <div>
                                <p className='question-text'>นี่ๆ ขอถามอะไรหน่อยสิ</p>
                                <h2>เธอมีเงินเดือนเท่าไหร่หรอ</h2>
                                <input type='num' placeholder='กรอกเงินเดือน' />
                                <div className='bottom-actions'>
                                    <button onClick={() => setStep(0)}>icon</button>
                                    <button onClick={() => setStep(1)}>Next</button>
                                </div>
                            </div>
                        )}
                    </div>

            </div>
        </div>
    );
}

export default OnboardingPage;