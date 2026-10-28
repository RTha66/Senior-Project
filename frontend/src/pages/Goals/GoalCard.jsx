import React from 'react';
import { IconCalendarWeekFilled, IconClock } from '@tabler/icons-react';
import MoodIcon, { getGoalMood } from '../../components/MoodIcon';

function formatRemainingTime(days) {
    if (days === null || days === undefined) return '';
    if (days <= 0) return 'ครบกำหนดวันนี้';
    if (days >= 365) return `เหลืออีก ${Math.floor(days / 365)} ปี`;
    if (days >= 30) return `เหลืออีก  ${Math.floor(days / 30)} เดือน`;
    return `เหลืออีก ${days} วัน`
}

export default function GoalCard({ goal }) {
    //คำนวณค่า (percentage, textcolor, barcolor, icon) มาเก็บใน mood
    const mood = getGoalMood(goal.currentAmount, goal.targetAmount);

    return (
        <div className='bg-white flex items-center justify-between gap-4 p-5 rounded-3xl border-gray-100 shadow-sm'>
            {/* ซ้าย ข้อมูล แบ่งเป็น 4 แถว*/}
            <div className='flex-1 flex flex-col justify-center'>
                {/* แถว 1 */}
                <div className='flex justify-between items-baseline mb-1'>
                    <p className='font-semibold text-blackk text-h4 leading-tight truncate pr-2'>
                        {goal.name}
                    </p>
                    <span className={`font-semibold text-h4 ${mood.textColor}`}>
                        {mood.percentage}
                    </span>
                </div>
                {/* แถว 2 */}
                <div className='flex justify-between items-center text-sm text-gray-500 mb-2.5'>
                    <div className='flex items-center gap-1'>
                        {goal.type === 'plan' ? 
                            (
                                <>
                                    <IconCalendarWeekFilled size={14} className='stroke-[2]' />
                                    <span>ออมตามแผน</span>
                                </>
                            ) 
                            : 
                            (
                                <>
                                    <IconClock size={14} className='stroke-[2]'/>
                                    <span>ออมตามใจ</span>
                                </>
                            )
                        }
                    </div>
                    <div>
                        {goal.type === 'plan' && (
                            mood.percentage >= 100 ? 
                            (
                                <span className='text-gray-700 font-medium'>สำเร็จ</span>
                            ) 
                            : 
                            (
                                <span>{formatRemainingTime(goal.daysLeft)}</span>
                            )
                        )}
                    </div>
                </div>
                {/* แถว 3 */}
                <div className='w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-2'>
                        <div className={`h-full rounded-full transition-all duration-500 ${mood.barColor}`} style={{width:`${mood.percentage}%`}} />
                </div>
                {/* แถว 4 */}
                <div className='flex justify-between items-center text-sm text-gray-700 font-medium'>
                        <span>฿ {goal.currentAmount.toLocaleString('th-TH')}</span>
                        <span>฿ {goal.targetAmount.toLocaleString('th-TH')}</span>
                </div>
            </div>
            {/* ขวา Mood jaaa */}
            <div className='shrink-0 flex items-center justify-center pl-1'>
                <MoodIcon icon={mood.icon} />
            </div>
        </div>
    )
}