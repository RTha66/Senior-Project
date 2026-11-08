import React, { useMemo, useState, useEffect } from "react";

const W = 358, H = 200;
// จุดศูนย์กลางวงกลม (ครึ่งนึงของ W กับ H)
const CX = 179, CY = 100;
// รัศมีจากจุดศูนย์กลางจนถึงกึ่งกลางของวงกลมสองเส้น ความหนาเส้นโดนัท ช่องว่างระหว่างส่วน
const R = 52, SW = 16, GAP = 3.5;
const CIRC = 2 * Math.PI * R;
// ระยะห่างแนวตั้งของข้อความ
const LABEL_STEP = 48

// สี
const THEME = {
    fix: {
        name: 'Fix Cost',
        ring: 'var(--color-hotpink)',
        ink: 'var(--color-hotpink)',
        dot: 'var(--color-hotpink)',
        badgeBg: 'bg-pink-50',
        badgeText: 'text-hotpink',
    },
    spend: {
        name: 'ใช้จ่าย',
        ring: 'var(--color-bluee)',
        ink: '#1D6FB8',
        dot: 'var(--color-bluee)',
        badgeBg: 'bg-blue-50',
        badgeText: 'text-blue-600',
    },
    save: {
        name: 'เงินออม',
        ring: 'var(--color-violet)',
        ink: 'var(--color-active)',
        dot: 'var(--color-violet)',
        badgeBg: 'bg-purple-50',
        badgeText: 'text-active',
    },
};

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const baht = (n) => '฿' + Math.round(n).toLocaleString('en-US');
const polar = (r, a) => ({ x: CX + r * Math.cos(a), y: CY + r * Math.sin(a)});

function layoutSegment(segments) {
    let start = 0;
}

export default function BudgetQuestion(params) {
    return null;
}