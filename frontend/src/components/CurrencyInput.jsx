import React from "react";

export default function CurrencyInput({value, onChange, placeholder, className }) {
    // ใช้คำว่า handel เพื่อบอกว่าฟังก์ชันนี้จะทำงานก็ต่อเมื่อมี event เข้ามา
    // แปลงค่า input มาเอาลูกน้ำออกจากนั้นแปลงเป็น num แล้วส่งไปเปลี่ยนแปลงค่า salary คือ setSalary
    const handleChange = (e) => {
        // /,/g คือ Regular Expression เอาไว้หาตัวอักษร / / คือการบอกว่าไม่ใช่ข้อความปกติให้หาข้อความด้านใน , คือสิ่งที่จะหา g คือ Global ก็คือให้หาทุกตัวในประโยคไม่ใช่แค่ตัวแรกที่เจอ
        // ถ้าใช้ replace(',', "") จะเอาแค่ลูกน้ำตัวแรกและหยุดการทำงานทันที
        const rawValue = e.target.value.replace(/,/g, '');
        
        if (rawValue === '') {
            onChange('');
        } else if (!isNaN(rawValue)) {
            // ตรงนี้เป็นค่าที่รับมาจากฟังก์ชัน
            onChange(Number(rawValue));
        }
    }

    const formathNumber = (numStr) => {
        // '' คือตอนลบค่าหมด null คือ db ส่งค่าว่างหรือไม่มีมาให้ undefined คือไม่มีคนให้ค่ามาไม่มีค่าอยู่จริง
        if (numStr === '' || numStr === null || numStr === undefined) return '';
        // .toLocalString('th-TH) คือให้จัดรูปให้ตรงกับสไตร์ของประเทศไทยคือเติมลุกน้ำคั่น
        return Number(numStr).toLocaleString('th-TH');
    }

    return (
        <input 
            type="text"
            inputMode="numeric"
            placeholder={placeholder}
            value={formathNumber(value)}
            onChange={handleChange}
            className={className}
        />
    )
}