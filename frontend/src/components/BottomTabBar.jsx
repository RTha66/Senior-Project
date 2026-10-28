import React, { useMemo, useRef, useState, useLayoutEffect, use } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { IconHome2, IconListDetails, IconTargetArrow, IconCalculator } from '@tabler/icons-react';

// ความกว้างของครึ่งวงกลม
const TILE_WIDTH = 20;
// ความสูงของครึ่งวงกลม
const SCALLOP_HEIGHT = 10;
// ระยะซ้อนทับ
const OVERLAP = 3;
// สีของแถบ Menubar
const BAR_COLOR = 'var(--color-violet)';

function ScallopEdge({ color = BAR_COLOR }) {
    const ref = useRef(null);
    // ดึงค่าเริ่มต้นค.กว้างจอมาใช้ ถ้าเปิดบน Browser ต่างๆคอมมือถือจะมีค่า แต่ถ้าเปิดบนเซิร์ฟเวอร์ (รัน SSR / Next.js) จะไม่มีหน้าจอ window จะเป็น undefined
    const [width, setWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 0));

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        const update = () => setWidth(el.clientWidth || window.innerWidth);
        update();
        const resize = new ResizeObserver(update);
        resize.observe(el);
        // หยุดการทำงาน ของ ResizeObserver เมื่อหน้านี้ถูกปิดหรือเปลี่ยนไปหน้าอื่น
        return () => resize.disconnect();
    }, []);

    const w = TILE_WIDTH;
    const h = SCALLOP_HEIGHT;
    // ความสูงของ Svg ทั้งชิ้น
    const total = h + OVERLAP;

    // คำนวณและการสร้าง SVG PAth
    const { d, svgWidth, offset } = useMemo(() => {
        if (!width) return { d:'', svgWidth: 0, offset: 0 };
       
        // คำนวณจำนวนลูกคลื่นที่ต้องใช้
        let count = Math.ceil(width / w) + 2;
        if (count % 2 === 0) count += 1;
        // หาความกว้างรวมของลูกคลื่น
        const full = count * w;

        // วาด SVG
        let path = `M0,${total} L0,${h}`
        // loop วาดครึ่งวงกลมทีละลูก
        for (let i = 0; i < count; i++) {
            path += `A${w/2},${h} 0 0,1 ${(i + 1) * w},${h}`
        }
        // ลากเส้นล่างขวาย้อนมาจุดเริ่ม
        path += `L${full},${total} Z`

        // full จะยาวเกิน width เพราะปัดเศษขึ้น+2 อีกกันเห็นขอบ เลยเอามาลบแล้วหาร 2 จะได้ตัดสองข้าง
        return {d: path, svgWidth: full, offset: (width - full) / 2};
    }, [width, w, h, total]);

    return (
        <div ref={ref} className="w-full overflow-hidden" style={{ height: total }}>
            {svgWidth > 0 && (
                <svg
                    width={svgWidth}
                    height={total}
                    viewBox={`0 0 ${svgWidth} ${total}`}
                    className="block max-w-none"
                    style={{ marginLeft: offset }}
                    aria-hidden='true'
                >
                    <path d={d} fill={color}/>
                </svg>
            )}
        </div>
    )
}

const NAV_ITEMS = [
    {id: 'home', label: 'หน้าหลัก', path: '/dashboard', icon: IconHome2},
    {id: 'transactions', label: 'รายการ', path: '/transactions', icon: IconListDetails},
    {id: 'goals', label: 'เป้าหมาย', path: '/goals', icon: IconTargetArrow},
    {id: 'calculators', label: 'คำนวณ', path: '/calculators', icon: IconCalculator},
];

export default function BottomTabBar() {
    const navigate = useNavigate();
    const location = useLocation();

    return(
        <nav className="fixed w-full bottom-0 left-0 right-0 z-40 pointer-events-none">
            {/* ส่วนด้านบน */}
            <div className="w-full relative z-10" style={{ marginBottom: `-${OVERLAP}px` }}>
                <ScallopEdge />
            </div>

            {/* ด้านล่าง */}
            <div className="pointer-events-auto flex items-center justify-around px-3 h-[68px] pb-[env(safe-area-inset-bottom)] w-full relative z-20"
                style={{backgroundColor: BAR_COLOR}}>
                {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    // ดึง ICON มาใช้
                    const Icon = item.icon;

                    return (
                        <button key={item.id} onClick={() => navigate(item.path)}
                            className={`flex items-center justify-center transition-all duration-300 border-none
                                ${isActive ? 'flex-row gap-2 bg-white text-active px-2.5 py-3 rounded-full font-semibold shadow-md transition-all duration-300':'flex-col gap-1 text-maiactive bg-transparent py-1 px-3 text-[12px] transition-none'}`}
                            >
                            <Icon size={22} stroke={2} className="shrink-0" />
                            <span className={isActive ? 'text-[12px] font-bold':'text-[12px]'}>
                                {item.label}
                            </span>
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}