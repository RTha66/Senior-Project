import React, { useState, useMemo } from 'react';

/**
 * ProportionQuestion (ระบบจำลองงบประมาณและการไหลของเงินขั้นสมบูรณ์)
 * ครอบคลุม 4 กรณีสำคัญ:
 * 1. การกินเงินออม: จะไม่มีทางเกินขนาดของเงินออม (ถ้ามี 100 กิน 80 เงินออมจะเหลือ 20 พอดีเป๊ะ)
 * 2. เงินเหลือสะสมเยอะมาก: กำหนด Cap ไม่ให้ล้นเกินขนาด Bar สีม่วง พร้อมคำแนะนำปัดเข้าเงินเก็บสำรอง
 * 3. ออมครบแล้วดึงเงินออก: ถือเป็น Goal Completed ไม่นำมานับเป็นค่าใช้จ่ายกินใช้เดือนนี้ (ไม่ทำให้งบเละ)
 * 4. ออมเกินเป้า (รัดเข็มขัด): แถบสีฟ้าลายทางจะล้นเข้ามายึดพื้นที่ของช่องกินใช้ แสดงความมีวินัย
 */

function createSmoothRoundedSector(cx, cy, rIn, rOut, a1, a2, cornerR = 9.5) {
    const span = a2 - a1;
    if (span <= 0.005) return '';

    const maxR = Math.min((rOut - rIn) / 2.1, (span * rIn) / 2.1);
    const cr = Math.max(1, Math.min(cornerR, maxR));

    const dOut = cr / rOut;
    const dIn = cr / rIn;

    const v1 = { x: cx + rOut * Math.cos(a1), y: cy + rOut * Math.sin(a1) };
    const v2 = { x: cx + rOut * Math.cos(a2), y: cy + rOut * Math.sin(a2) };
    const v3 = { x: cx + rIn * Math.cos(a2), y: cy + rIn * Math.sin(a2) };
    const v4 = { x: cx + rIn * Math.cos(a1), y: cy + rIn * Math.sin(a1) };

    const t1Rad = { x: cx + (rOut - cr) * Math.cos(a1), y: cy + (rOut - cr) * Math.sin(a1) };
    const t1Arc = { x: cx + rOut * Math.cos(a1 + dOut), y: cy + rOut * Math.sin(a1 + dOut) };

    const t2Arc = { x: cx + rOut * Math.cos(a2 - dOut), y: cy + rOut * Math.sin(a2 - dOut) };
    const t2Rad = { x: cx + (rOut - cr) * Math.cos(a2), y: cy + (rOut - cr) * Math.sin(a2) };

    const t3Rad = { x: cx + (rIn + cr) * Math.cos(a2), y: cy + (rIn + cr) * Math.sin(a2) };
    const t3Arc = { x: cx + rIn * Math.cos(a2 - dIn), y: cy + rIn * Math.sin(a2 - dIn) };

    const t4Arc = { x: cx + rIn * Math.cos(a1 + dIn), y: cy + rIn * Math.sin(a1 + dIn) };
    const t4Rad = { x: cx + (rIn + cr) * Math.cos(a1), y: cy + (rIn + cr) * Math.sin(a1) };

    const largeOut = (a2 - a1 - 2 * dOut) > Math.PI ? 1 : 0;
    const largeIn = (a2 - a1 - 2 * dIn) > Math.PI ? 1 : 0;

    return [
        `M ${t1Rad.x.toFixed(2)} ${t1Rad.y.toFixed(2)}`,
        `Q ${v1.x.toFixed(2)} ${v1.y.toFixed(2)} ${t1Arc.x.toFixed(2)} ${t1Arc.y.toFixed(2)}`,
        `A ${rOut} ${rOut} 0 ${largeOut} 1 ${t2Arc.x.toFixed(2)} ${t2Arc.y.toFixed(2)}`,
        `Q ${v2.x.toFixed(2)} ${v2.y.toFixed(2)} ${t2Rad.x.toFixed(2)} ${t2Rad.y.toFixed(2)}`,
        `L ${t3Rad.x.toFixed(2)} ${t3Rad.y.toFixed(2)}`,
        `Q ${v3.x.toFixed(2)} ${v3.y.toFixed(2)} ${t3Arc.x.toFixed(2)} ${t3Arc.y.toFixed(2)}`,
        `A ${rIn} ${rIn} 0 ${largeIn} 0 ${t4Arc.x.toFixed(2)} ${t4Arc.y.toFixed(2)}`,
        `Q ${v4.x.toFixed(2)} ${v4.y.toFixed(2)} ${t4Rad.x.toFixed(2)} ${t4Rad.y.toFixed(2)}`,
        'Z'
    ].join(' ');
}

export default function ProportionQuestion({
    title = 'สัดส่วนและวินัยงบประมาณที่คุณต้องการวางแผน',
    selectedID,
    onSelectedID,
    incomeItems = [],
    expenseItems = [],
}) {
    // ฐานรายได้ประจำเดือน
    const baseIncome = useMemo(() => {
        const sum = incomeItems
            .filter((i) => i.checked)
            .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
        return sum > 0 ? sum : 30000;
    }, [incomeItems]);

    // ยอดเงินเหลือสะสมจากเดือนก่อน (Rollover Fund เช่น 1,000 บาท)
    const [rawRolloverAmount, setRawRolloverAmount] = useState(1000);

    // =========================================================================
    // สูตร 50 : 30 : 20 ตามที่คุณกำหนดเป๊ะๆ
    // 1. Fix Cost: 50% ของ 30,000 (ไม่รวมเงินเพิ่ม) = 15,000 บาท
    // 2. Savings: 20% ของ 30,000 (ไม่รวมเงินเพิ่ม) = 6,000 บาท
    // 3. Living: 30% ของ 30,000 (9,000) + รวมเงินเหลือ (1,000) = 10,000 บาท
    // รวมทั้งวงกลม = 15,000 + 6,000 + 10,000 = 31,000 บาท (100% พอดี)
    // =========================================================================
    const plannedFixCost = Math.round(baseIncome * 0.50); // 15,000
    const plannedSavings = Math.round(baseIncome * 0.20); // 6,000
    const plannedLivingBase = Math.round(baseIncome * 0.30); // 9,000
    const plannedLiving = plannedLivingBase + rawRolloverAmount; // 9,000 + 1,000 = 10,000
    const totalBudget = plannedFixCost + plannedSavings + plannedLiving; // 31,000

    // ยอดใช้จ่ายจริง และ ยอดออมจริง
    const [actualSpending, setActualSpending] = useState(9500);
    const [actualSavings, setActualSavings] = useState(6000);
    const [isFixCostPaid, setIsFixCostPaid] = useState(true);
    const [isGoalCompletedAndWithdrawn, setIsGoalCompletedAndWithdrawn] = useState(false);
    const [activeScenario, setActiveScenario] = useState('using_rollover');

    const cornerRadius = 9.5;

    // ส่วนที่ใช้เกินงบกินใช้ทั้งหมด (เริ่มกินเงินออม)
    const overspendRealSavings = Math.max(0, actualSpending - plannedLiving);

    // การกินเงินออม: โดนกินสูงสุดไม่เกินช่องเงินออม (6,000)
    const eatenSavingsAmount = Math.min(plannedSavings, overspendRealSavings);
    const remainingSavings = Math.max(0, actualSavings - eatenSavingsAmount);

    // กรณีออมเกินเป้า (เกิน 6,000)
    const oversavedAmount = Math.max(0, actualSavings - plannedSavings);

    // เพดานงบกินใช้ที่เหลืออยู่จริงหลังจากหักเงินที่ออมเกินไปแล้ว
    const effectiveRemainingLivingBudget = Math.max(0, plannedLiving - oversavedAmount);

    // พารามิเตอร์ของกราฟโดนัท (วงกลมวงเดียว ไม่มีบาร์ขอบนอก)
    const CX = 160;
    const CY = 145;
    const R_OUT = 112;
    const R_IN = 70;
    const GAP = 0.045;

    // ขอบเขตมุมของ 3 แทร็กสีเทา คิดสัดส่วนจาก totalBudget (31,000)
    const pFixTarget = plannedFixCost / totalBudget;
    const aFixStart = -Math.PI / 2 + GAP / 2;
    const aFixEnd = aFixStart + pFixTarget * 2 * Math.PI - GAP;

    const pSaveTarget = plannedSavings / totalBudget;
    const aSaveStart = aFixEnd + GAP;
    const aSaveEnd = aSaveStart + pSaveTarget * 2 * Math.PI - GAP;

    const pLivingTarget = plannedLiving / totalBudget;
    const aLivingStart = aSaveEnd + GAP;
    const aLivingEnd = aLivingStart + pLivingTarget * 2 * Math.PI - GAP;

    // 1. แทร็กสีเทาด้านหลังคงที่ 100%
    const trackFixGray = createSmoothRoundedSector(CX, CY, R_IN, R_OUT, aFixStart, aFixEnd, cornerRadius);
    const trackSaveGray = createSmoothRoundedSector(CX, CY, R_IN, R_OUT, aSaveStart, aSaveEnd, cornerRadius);
    const trackLivingGray = createSmoothRoundedSector(CX, CY, R_IN, R_OUT, aLivingStart, aLivingEnd, cornerRadius);

    // 2. Fix Cost Fill (สีชมพู)
    const fillFixPink = isFixCostPaid
        ? createSmoothRoundedSector(CX, CY, R_IN, R_OUT, aFixStart, aFixEnd, cornerRadius)
        : '';

    // 3. ช่องเงินออม:
    // สัดส่วนของเงินออมที่เหลือจริง (สีฟ้า)
    const saveTotalSpan = aSaveEnd - aSaveStart;
    const saveRemainFraction = Math.min(1, remainingSavings / plannedSavings);
    const aSaveFillEnd = aSaveStart + saveTotalSpan * saveRemainFraction;
    const fillSaveBlue = remainingSavings > 0 && saveRemainFraction > 0.02
        ? createSmoothRoundedSector(CX, CY, R_IN, R_OUT, aSaveStart, aSaveFillEnd, cornerRadius)
        : '';

    // สัดส่วนของเงินออมที่โดนกินไป (ม่วงลายทาง): กินจากท้ายช่อง aSaveEnd ถอยลงมา
    const eatenFraction = eatenSavingsAmount / plannedSavings;
    const aEatenStart = aSaveEnd - saveTotalSpan * eatenFraction;
    const aEatenEnd = aSaveEnd;
    const fillOverspendStripes = eatenSavingsAmount > 0
        ? createSmoothRoundedSector(CX, CY, R_IN, R_OUT, Math.max(aSaveStart + 0.05, aEatenStart), aEatenEnd, cornerRadius)
        : '';

    // 4. ช่องงบกินใช้:
    const livingSpan = aLivingEnd - aLivingStart;

    // 4.1 กรณีออมเงินเกินเป้า (รัดเข็มขัด): ลายทางสีฟ้าเริ่มต้นจากจุดที่ล้นข้ามแดนมาจากเงินออม (aLivingStart)
    const oversaveAngleSpan = livingSpan * (Math.min(plannedLiving, oversavedAmount) / plannedLiving);
    const aOversaveStart = aLivingStart;
    const aOversaveEnd = aLivingStart + oversaveAngleSpan;
    const fillOversaveStripes = oversavedAmount > 0
        ? createSmoothRoundedSector(CX, CY, R_IN, R_OUT, aOversaveStart, aOversaveEnd, cornerRadius)
        : '';

    // 4.2 สีม่วง (งบกินใช้จริง): แสดงเฉพาะในพื้นที่ที่เหลือ ไม่ทับซ้อนกับลายทางสีฟ้าเด็ดขาด!
    // แถบใช้จ่ายจะเริ่มต่อจากลายทางสีฟ้า และใช้ได้สูงสุดแค่ตามงบที่เหลือ (effectiveRemainingLivingBudget)
    const livingBaseSpent = Math.min(effectiveRemainingLivingBudget, actualSpending);
    const hasOversave = oversavedAmount > 0;
    const aLivingFillStart = hasOversave 
        ? Math.min(aLivingEnd, aOversaveEnd + (effectiveRemainingLivingBudget > 0 && livingBaseSpent > 0 ? 0.025 : 0))
        : aLivingStart;
    const remainingLivingSpan = Math.max(0, aLivingEnd - aLivingFillStart);
    const livingFillFraction = effectiveRemainingLivingBudget > 0 ? (livingBaseSpent / effectiveRemainingLivingBudget) : 0;
    const aLivingFillEnd = aLivingFillStart + remainingLivingSpan * livingFillFraction;

    const fillLivingPurple = actualSpending > 0 && (aLivingFillEnd - aLivingFillStart) > 0.02
        ? createSmoothRoundedSector(CX, CY, R_IN, R_OUT, aLivingFillStart, aLivingFillEnd, cornerRadius)
        : '';

    // ฟังก์ชันเลือก Scenario จำลองเพื่อตอบโจทย์ทั้ง 4 คำถาม
    const applyScenario = (type) => {
        setActiveScenario(type);
        setIsGoalCompletedAndWithdrawn(false);

        if (type === 'using_rollover') {
            // กรณีใช้เงินเหลือ: งบกินใช้ 10,000 (9,000 + 1,000) ใช้ไป 9,500 (เงินออม 6,000 ปลอดภัย 100%)
            setRawRolloverAmount(1000);
            setActualSpending(9500);
            setActualSavings(6000);
            setIsFixCostPaid(true);
        } else if (type === 'eat_savings_exact') {
            // กรณีข้อ 1: ใช้เกินเพดาน 10,000 จนกินเงินออมไป 80% (กินไป 4,800 เงินออมเหลือ 1,200 หรือ 20% พอดีเป๊ะ)
            setRawRolloverAmount(1000);
            setActualSpending(10000 + 4800);
            setActualSavings(6000);
            setIsFixCostPaid(true);
        } else if (type === 'oversave_eat_living') {
            // กรณีข้อ 4: รัดเข็มขัดจนออมเกินเป้า (ออม 8,500 เกินเป้า 6,000 มา 2,500)
            setRawRolloverAmount(1000);
            setActualSpending(5000);  // กินใช้ 5,000 จากสิทธิ์ที่เหลือ 7,500
            setActualSavings(8500);  // ออม 8,500 (เกินเป้า 6,000 มา 2,500)
            setIsFixCostPaid(true);
        } else if (type === 'goal_withdrawn') {
            // กรณีข้อ 3: ออมครบตามเป้า 6,000 แล้วเบิกเงินออกไปซื้อของ (แถบเงินออมยังคงเดิม 100%)
            setRawRolloverAmount(1000);
            setActualSpending(8500);
            setActualSavings(6000);
            setIsGoalCompletedAndWithdrawn(true);
            setIsFixCostPaid(true);
        }
    };

    return (
        <div 
            className="flex flex-col items-center w-full max-w-md mx-auto h-[calc(100dvh-18vh)] max-h-[calc(100dvh-18vh)] overflow-y-auto overscroll-contain pb-36 px-1 select-none"
            style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
        >
            {/* หัวข้อคำถาม */}
            <h2 className="text-h4 font-medium text-blackk px-2 leading-relaxed text-center flex-shrink-0">
                {title}
            </h2>

            {/* แถบ Scenario Buttons จำลอง 4 คำถามหลัก */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 w-full mt-2.5 px-1 flex-shrink-0">
                <button
                    type="button"
                    onClick={() => applyScenario('using_rollover')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                        activeScenario === 'using_rollover'
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    🛡️ ใช้เงินเหลือ (ออมปลอดภัย)
                </button>
                <button
                    type="button"
                    onClick={() => applyScenario('eat_savings_exact')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                        activeScenario === 'eat_savings_exact'
                            ? 'bg-purple-700 text-white shadow-xs'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    ⚖️ กินออม 80% เหลือ 20%
                </button>
                <button
                    type="button"
                    onClick={() => applyScenario('oversave_eat_living')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                        activeScenario === 'oversave_eat_living'
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    🌟 ออมเกินเป้า (ฟ้ากินม่วง)
                </button>
                <button
                    type="button"
                    onClick={() => applyScenario('goal_withdrawn')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                        activeScenario === 'goal_withdrawn'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    🎉 ออมครบเบิกซื้อของ
                </button>
            </div>

            {/* แถบสรุปข้อเท็จจริงตาม 4 กรณีที่คุณถาม */}
            <div className="w-full mt-2 px-2 flex-shrink-0">
                {activeScenario === 'using_rollover' && (
                    <div className="bg-amber-50 border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 flex flex-col gap-1 shadow-2xs">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-amber-900">🛡️ ใช้เงินเหลือจากเดือนก่อน ฿1,000 (ในงบกินใช้ ฿10,000)</span>
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                เงินออม ฿6,000 ปลอดภัย 100%
                            </span>
                        </div>
                        <p className="text-[11px] text-amber-800 leading-snug">
                            งบกินใช้คิด 30% (฿9,000) รวมเงินเหลือ (฿1,000) = ฿10,000 โดยที่เงินออม (฿6,000) และ Fix Cost (฿15,000) คิดจากฐาน ฿30,000 เท่าเดิม ไม่ถูกกระทบ
                        </p>
                    </div>
                )}

                {activeScenario === 'eat_savings_exact' && (
                    <div className="bg-purple-50 border border-purple-300 rounded-xl p-2.5 text-xs text-purple-950 flex flex-col gap-1 shadow-2xs">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-purple-900">⚖️ กินเงินออมพอดีเป๊ะ ไม่เกินช่อง</span>
                            <span className="bg-purple-200 text-purple-900 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                โดนกิน 80% (฿4,800) เหลือ 20% (฿1,200)
                            </span>
                        </div>
                        <p className="text-[11px] text-purple-800 leading-snug">
                            ใช้จ่ายเกินเพดานกินใช้ (฿10,000) ไป ฿4,800 ทำให้ไปกินเงินออม 80% เงินออมจึงเหลือ ฿1,200 (20%) พอดี ไม่ล้นเกินช่อง
                        </p>
                    </div>
                )}

                {activeScenario === 'oversave_eat_living' && (
                    <div className="bg-blue-50 border border-blue-300 rounded-xl p-2.5 text-xs text-blue-950 flex flex-col gap-1 shadow-2xs">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-blue-900">🌟 รัดเข็มขัดจนออมเงินเกินเป้า (+฿2,500)</span>
                            <span className="bg-blue-200 text-blue-900 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                ฟ้าลายทางยึดพื้นที่ช่องกินใช้
                            </span>
                        </div>
                        <p className="text-[11px] text-blue-800 leading-snug">
                            ออมเงิน ฿8,500 (เกินเป้า ฿6,000 มา ฿2,500) ฟ้าลายทางจึงเริ่มจากจุดที่เกินเงินออมเข้ามายึดพื้นที่ช่องกินใช้ ฿2,500 งบกินใช้จะเหลือสิทธิ์ใช้ ฿7,500
                        </p>
                    </div>
                )}

                {activeScenario === 'goal_withdrawn' && (
                    <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-2.5 text-xs text-emerald-950 flex flex-col gap-1 shadow-2xs">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-emerald-900">🎉 ออมครบ ฿6,000 &amp; นำไปซื้อของสำเร็จ</span>
                            <span className="bg-emerald-200 text-emerald-900 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                แถบเงินออมยังคงเดิม 100%
                            </span>
                        </div>
                        <p className="text-[11px] text-emerald-800 leading-snug">
                            แถบเงินออมยังคงเต็มสีฟ้า (100% = ฿6,000) เพราะเราทำตามแผนสำเร็จ ส่วนการซื้อของจะบันทึกเป็น <b>"รายจ่ายตามเป้าหมาย (Goal Expense)"</b> ตัดจากเงินที่เก็บไว้ โดยไม่นำมาปนกับงบกินใช้ทั่วไป
                        </p>
                    </div>
                )}
            </div>

            {/* กราฟโดนัท SVG แสดงการจำลองทั้ง 4 กรณีอย่างแม่นยำ */}
            <div className="relative w-full flex justify-center items-center my-0.5 flex-shrink-0">
                <svg
                    viewBox="20 5 280 280"
                    className="w-full max-w-[280px] h-auto drop-shadow-xs overflow-visible"
                >
                    <defs>
                        <pattern
                            id="purpleStripesPattern"
                            width="9"
                            height="9"
                            patternTransform="rotate(45 0 0)"
                            patternUnits="userSpaceOnUse"
                        >
                            <rect width="9" height="9" fill="#C5BAFF" />
                            <line x1="0" y1="0" x2="0" y2="9" stroke="#7A6FA8" strokeWidth="2.5" />
                        </pattern>

                        <pattern
                            id="blueStripesPattern"
                            width="9"
                            height="9"
                            patternTransform="rotate(45 0 0)"
                            patternUnits="userSpaceOnUse"
                        >
                            <rect width="9" height="9" fill="#A0D9FD" />
                            <line x1="0" y1="0" x2="0" y2="9" stroke="#0284C7" strokeWidth="2.5" />
                        </pattern>
                    </defs>

                    {/* ==================================================== */}
                    {/* LAYER 0: แทร็กสีเทาด้านหลังคงที่ 100% (Fixed Guide Tracks) */}
                    {/* ==================================================== */}
                    <g opacity="0.95">
                        <path d={trackFixGray} fill="#E9ECEF" stroke="#DFE3E8" strokeWidth="0.5" />
                        <path d={trackSaveGray} fill="#ECEEF1" stroke="#DFE3E8" strokeWidth="0.5" />
                        <path d={trackLivingGray} fill="#E9ECEF" stroke="#DFE3E8" strokeWidth="0.5" />
                    </g>

                    {/* ==================================================== */}
                    {/* LAYER 1: สีจริงเติมทับตามความคืบหน้า */}
                    {/* ==================================================== */}
                    {/* 1.1 Fix Cost (ชมพู) */}
                    {fillFixPink && (
                        <path
                            d={fillFixPink}
                            fill="#FA6C9D"
                            className="transition-all duration-300"
                            style={{ filter: 'drop-shadow(0 2px 6px #FA6C9D55)' }}
                        />
                    )}

                    {/* 1.2 เงินออมจริงคงเหลือ (สีฟ้า) */}
                    {fillSaveBlue && (
                        <path
                            d={fillSaveBlue}
                            fill="#A0D9FD"
                            className="transition-all duration-300"
                            style={{ filter: 'drop-shadow(0 2px 6px #38BDF855)' }}
                        />
                    )}

                    {/* 1.3 งบกินใช้ปกติ (สีม่วงในวงแหวนหลัก) */}
                    {fillLivingPurple && (
                        <path
                            d={fillLivingPurple}
                            fill="#C5BAFF"
                            className="transition-all duration-300"
                            style={{ filter: 'drop-shadow(0 2px 6px #C5BAFF55)' }}
                        />
                    )}

                    {/* ==================================================== */}
                    {/* LAYER 2: ลายทางล้นข้ามแดน (Overspend Stripes & Oversave Stripes) */}
                    {/* ==================================================== */}
                    {/* 2.1 ม่วงลายทางกินเงินออม (ไม่เกินขนาดช่องเงินออมเด็ดขาด!) */}
                    {fillOverspendStripes && (
                        <path
                            d={fillOverspendStripes}
                            fill="url(#purpleStripesPattern)"
                            stroke="#8B5CF6"
                            strokeWidth="1"
                            className="transition-all duration-300 animate-in fade-in"
                            style={{ filter: 'drop-shadow(0 3px 8px #7A6FA877)' }}
                        />
                    )}

                    {/* 2.2 ฟ้าลายทางยึดพื้นที่กินใช้ (กรณีออมเกินเป้า) */}
                    {fillOversaveStripes && (
                        <path
                            d={fillOversaveStripes}
                            fill="url(#blueStripesPattern)"
                            stroke="#0284C7"
                            strokeWidth="1"
                            className="transition-all duration-300 animate-in fade-in"
                            style={{ filter: 'drop-shadow(0 3px 8px #0284C777)' }}
                        />
                    )}

                    {/* ข้อความตรงกลางโดนัท */}
                    <g className="pointer-events-none select-none">
                        <text
                            x={CX}
                            y={CY - 10}
                            textAnchor="middle"
                            className="fill-gray-700 text-[13px] font-semibold"
                            style={{ fontFamily: 'Prompt, sans-serif' }}
                        >
                            งบประมาณรวม
                        </text>
                        <text
                            x={CX}
                            y={CY + 18}
                            textAnchor="middle"
                            className="fill-gray-900 text-[20px] font-bold tracking-tight"
                            style={{ fontFamily: 'Prompt, sans-serif' }}
                        >
                            ฿ {totalBudget.toLocaleString('en-US')}
                        </text>
                        {isGoalCompletedAndWithdrawn ? (
                            <text
                                x={CX}
                                y={CY + 33}
                                textAnchor="middle"
                                className="fill-emerald-600 text-[9.5px] font-bold"
                            >
                                🎉 ออมครบสำเร็จแล้ว!
                            </text>
                        ) : rawRolloverAmount > 0 ? (
                            <text
                                x={CX}
                                y={CY + 33}
                                textAnchor="middle"
                                className="fill-amber-700 text-[9.5px] font-bold"
                            >
                                (รายได้ ฿{baseIncome.toLocaleString()} + เงินเหลือ ฿{rawRolloverAmount.toLocaleString()})
                            </text>
                        ) : null}
                    </g>
                </svg>
            </div>

            {/* Slider ทดลองปรับสัดส่วนเพื่อทดสอบความสมดุล */}
            <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200/80 rounded-xl mb-2.5 space-y-2 flex-shrink-0">
                <div>
                    <div className="flex justify-between items-center text-xs text-gray-600 mb-0.5">
                        <span>💜 ยอดกินใช้จริง:</span>
                        <span className="font-bold text-purple-700">
                            ฿{actualSpending.toLocaleString()} / สิทธิ์ใช้ได้ ฿{effectiveRemainingLivingBudget.toLocaleString()} {oversavedAmount > 0 && `(ถูกตัดไปออม ฿${oversavedAmount.toLocaleString()})`}
                        </span>
                    </div>
                    <input
                        type="range"
                        min={3000}
                        max={18000}
                        step={500}
                        value={actualSpending}
                        onChange={(e) => {
                            setActiveScenario('custom');
                            setActualSpending(Number(e.target.value));
                        }}
                        className="w-full accent-purple-600 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-gray-400">
                        <span>฿3,000</span>
                        <span>฿9,000 (งบ 30%)</span>
                        <span className="text-amber-700 font-bold">฿10,000 (รวมเงินเหลือ)</span>
                        <span className="text-purple-700 font-bold">฿14,800 (กินออม 80%)</span>
                        <span className="text-red-500 font-bold">&gt; ฿16,000 (กินออม 100%)</span>
                    </div>
                </div>

                <div className="pt-1.5 border-t border-gray-200/60">
                    <div className="flex justify-between items-center text-xs text-gray-600 mb-0.5">
                        <span>💙 ยอดออมเงินจริง:</span>
                        <span className="font-bold text-blue-700">
                            ฿{actualSavings.toLocaleString()} / เป้าหมาย ฿{plannedSavings.toLocaleString()} (20%)
                        </span>
                    </div>
                    <input
                        type="range"
                        min={1000}
                        max={12000}
                        step={500}
                        value={actualSavings}
                        onChange={(e) => {
                            setActiveScenario('custom');
                            setActualSavings(Number(e.target.value));
                        }}
                        className="w-full accent-blue-600 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-gray-400">
                        <span>฿1,000</span>
                        <span className="text-blue-600 font-semibold">฿6,000 (ครบเป้า 20%)</span>
                        <span className="text-emerald-600 font-semibold">&gt; ฿6,000 (ออมเกิน ล้นไปยึดช่องม่วง)</span>
                    </div>
                </div>

                {/* ตัวปรับเงินเหลือสะสม (Rollover Fund) */}
                <div className="pt-1.5 border-t border-gray-200/60">
                    <div className="flex justify-between items-center text-xs text-gray-600 mb-0.5">
                        <span>💵 เงินเหลือจากเดือนก่อน:</span>
                        <span className="font-bold text-amber-800">
                            + ฿{rawRolloverAmount.toLocaleString()} (รวมในงบกินใช้แล้ว)
                        </span>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={8000}
                        step={500}
                        value={rawRolloverAmount}
                        onChange={(e) => setRawRolloverAmount(Number(e.target.value))}
                        className="w-full accent-amber-600 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-gray-400">
                        <span>฿0</span>
                        <span className="text-amber-700 font-semibold">฿1,000 (ค่าจำลอง)</span>
                        <span className="text-gray-500">฿8,000</span>
                    </div>
                </div>
            </div>

            {/* การ์ดสรุปแจกแจงแต่ละหมวด */}
            <div className="flex flex-col w-full gap-2 px-1 flex-shrink-0">
                {/* 1. Fix Cost */}
                <div
                    onClick={() => {
                        setIsFixCostPaid(!isFixCostPaid);
                        onSelectedID && onSelectedID(1);
                    }}
                    className="flex flex-col p-2.5 rounded-lg border border-gray-200 bg-white hover:border-gray-300 cursor-pointer shadow-2xs"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3.5 h-3.5 rounded-xs bg-[#FA6C9D]" />
                            <div className="flex flex-col text-left">
                                <span className="text-xs font-semibold text-gray-800">
                                    ค่าใช้จ่ายคงที่ (Fix Cost 50%)
                                </span>
                                <span className="text-[10px] text-gray-500">
                                    คิด 50% จากฐานเงินเดือน ฿{baseIncome.toLocaleString()} (ไม่รวมเงินเพิ่ม)
                                </span>
                            </div>
                        </div>
                        <span className="text-xs font-bold text-gray-900">
                            ฿{plannedFixCost.toLocaleString()} ({(pFixTarget * 100).toFixed(1)}%)
                        </span>
                    </div>
                </div>

                {/* 2. งบกินใช้ทั่วไป */}
                <div
                    onClick={() => onSelectedID && onSelectedID(2)}
                    className="flex flex-col p-2.5 rounded-lg border border-gray-200 bg-white hover:border-gray-300 cursor-pointer shadow-2xs"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3.5 h-3.5 rounded-xs bg-[#C5BAFF]" />
                            <div className="flex flex-col text-left">
                                <span className="text-xs font-semibold text-gray-800">
                                    งบกินใช้ทั่วไป (Living Expense 30% + เงินเหลือ)
                                </span>
                                <span className="text-[10px] text-gray-500">
                                    งบ 30% (฿{plannedLivingBase.toLocaleString()}) + เงินเหลือ (฿{rawRolloverAmount.toLocaleString()}) = เพดาน ฿{plannedLiving.toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <span className={`text-xs font-bold ${overspendRealSavings > 0 ? 'text-red-600' : actualSpending > plannedLivingBase ? 'text-amber-700' : 'text-gray-900'}`}>
                            ฿{actualSpending.toLocaleString()} ({(pLivingTarget * 100).toFixed(1)}%)
                        </span>
                    </div>
                </div>

                {/* 3. เงินออม */}
                <div
                    onClick={() => onSelectedID && onSelectedID(4)}
                    className="flex flex-col p-2.5 rounded-lg border border-gray-200 bg-white hover:border-gray-300 cursor-pointer shadow-2xs"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3.5 h-3.5 rounded-xs bg-[#A0D9FD]" />
                            <div className="flex flex-col text-left">
                                <span className="text-xs font-semibold text-gray-800">
                                    เงินออม (Savings 20%)
                                </span>
                                <span className="text-[10px] text-gray-500">
                                    {isGoalCompletedAndWithdrawn ? (
                                        <span className="text-emerald-700 font-bold">🎉 ออมสำเร็จครบ 100% (นำไปซื้อของตามเป้าหมายเรียบร้อย)</span>
                                    ) : eatenSavingsAmount > 0 ? (
                                        <span className="text-red-600">⚠️ โดนกินไป ฿{eatenSavingsAmount.toLocaleString()} ({(eatenFraction * 100).toFixed(0)}%) เหลือจริง ฿{remainingSavings.toLocaleString()}</span>
                                    ) : (
                                        <span className="text-emerald-600 font-medium">คิด 20% จากฐานเงินเดือน ฿{baseIncome.toLocaleString()} (ไม่รวมเงินเพิ่ม) = ฿{plannedSavings.toLocaleString()}</span>
                                    )}
                                </span>
                            </div>
                        </div>
                        <span className={`text-xs font-bold ${eatenSavingsAmount > 0 ? 'text-red-600' : 'text-blue-700'}`}>
                            ฿{remainingSavings.toLocaleString()} ({(pSaveTarget * 100).toFixed(1)}%)
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
