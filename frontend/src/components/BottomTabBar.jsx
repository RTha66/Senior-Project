import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { IconHome2, IconListDetails, IconTargetArrow, IconCalculator } from '@tabler/icons-react'

// ความกว้างของครึ่งวงกลม
const TILE_WIDTH = 20;
// ความสูงของครึ่งวงกลม
const SCALLOP_HEIGHT = 10;
// ระยะซ้อนทับ
const OVERLAP = 2;
// สีของแถบ Menubar
const BAR_COLOR = 'var(--color-violet)';

// SVG Tile สำหรับ CSS Mask
const SVG_MASK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${TILE_WIDTH} ${SCALLOP_HEIGHT + OVERLAP}'%3E%3Cpath d='M0,${SCALLOP_HEIGHT} A${TILE_WIDTH / 2},${SCALLOP_HEIGHT} 0 0,1 ${TILE_WIDTH},${SCALLOP_HEIGHT} L${TILE_WIDTH},${SCALLOP_HEIGHT + OVERLAP} L0,${SCALLOP_HEIGHT + OVERLAP} Z' fill='%23000'/%3E%3C/svg%3E")`;

const NAV_ITEMS = [
    {id: 'home', label: 'หน้าหลัก', path: '/dashboard', icon: IconHome2},
    {id: 'transactions', label: 'รายการ', path: '/transactions', icon: IconListDetails},
    {id: 'goals', label: 'เป้าหมาย', path: '/goals', icon: IconTargetArrow},
    {id: 'calculators', label: 'คำนวณ', path: '/calculators', icon: IconCalculator},
];

export default function BottomTabBar(){
    const navigate = useNavigate();
    const location = useLocation();

    return(
        <nav className="fixed w-full bottom-0 left-0 right-0 z-40 pointer-events-none">
            <div className="w-full relative z-10"
                style={{
                    height: `${SCALLOP_HEIGHT+OVERLAP}px`,
                    marginBottom: `-${OVERLAP}px`,
                    backgroundColor: BAR_COLOR,
                    // WebkitMaskImg
                    WebkitMaskImage: SVG_MASK,
                    WebkitMaskRepeat: 'round on-repeat',
                    WebkitMaskSize: `${TILE_WIDTH}px auto`,
                    WebkitMaskPosition: 'left bottom',
                    // Standard Mask
                    maskImage: SVG_MASK,
                    maskRepeat: 'round no-repeat',
                    maskSize: `${TILE_WIDTH}px auto`,
                    maskPosition: 'left bottom',
                }}
            />
            <div className="pointer-events-auto flex items-center justify-around px-3 h-[68px] pb-[env(safe-area-inset-bottom)] w-full relative z-20"
                style={{backgroundColor: BAR_COLOR}}>
                {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    // ดึง ICON มาใช้
                    const Icon = item.icon;

                    return (
                        <button key={item.id} onClick={() => navigate(item.path)}
                            className={`flex items-center justify-center transition-all duration-300 border-none
                                ${isActive ? 'flex-row gap-2 bg-white text-active px-2.5 py-3 rounded-full font-semibold shadow-md':'flex-col gap-1 text-maiactive bg-transparent py-1 px-3 text-[12px]'}`}
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