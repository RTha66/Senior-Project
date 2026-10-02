import React, { useState } from "react";
import checkIcon from '../../assets/check.svg';
import addIcon from '../../assets/add.svg';

// items คือค่า ExpenseItems ค่าพวก id, name, checked, amount
export default function ExpenseQuestion({ items, setItems }) {
    // ใช้เก็บข้อมูล item ที่กำลังแก้ไขอยู่ (null = ปิด popup)
    // ใช้ null เพราะว่าถ้าเป็น null คือ ปิด popup ไม่มีข้อมูล พอเพิ่มรายการจะเปลี่ยนจาก null เป็น OBJ เปล่า
    // ถ้าใช้ false แก้ไขข้อมูลด้านในไม่ได้ / {} ไม่รู้ว่าเปิดหรือปิด
    const [editingItem, setEditingItem] = useState(null);

    const toggleChecked = (id) => {
        setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item))
    }

    // กดรายการเดิมเพื่อเปิดป็อปอัพและมีข้อมูลเดิม
    const openEdit = (item) => {
        setEditingItem({ ...item });
    }

    // เพิ่มรายการที่เป็นค่าเปล่าๆ
    const openAdd = () => {
        setEditingItem({ id: null, name: '', amount: '', checked: true })
    }

    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="text-h4 font-medium text-blackk text-center px-[2vw]">
                ตอนนี้เธอมีค่าใช้จ่ายที่ต้องจ่ายทุกเดือนไหม
            </h2>
            <div className="flex flex-col w-full gap-[1.5vh] overflow-y-auto max-h-[45vh] px-[1vh] pb-[2vh] mt-[4vh]">
                {/* วนไปแต่ละไอเท็ม */}
                {items.map((item) => (
                    <div key={item.id}
                        className={`flex items-center gap-[2vh] w-full p-[2vh] border-[1.5px] rounded-xl transition-all 
                            ${item.checked ? 'border-pinkk bg-pink-50' : 'border-babyblue bg-white'} `}>
                        {/* ตรงสีส้มที่เป็น checkbox */}
                        <div onClick={() => toggleChecked(item.id)}
                            className={`w-[clamp(1.5rem,5vw,2.5rem)] h-[clamp(1.5rem,5vw,2.5rem)] rounded-lg flex items-center justify-center cursor-pointer transition-colors flex-shrink-0 
                                ${item.checked ? 'bg-hotpink' : 'bg-gray-100'}`}
                        >{item.checked && <img src={checkIcon} alt="check" className="w-[80%] h-[80%]" />}
                        </div>
                        {/* กดที่ข้อความจะเปิด popup เพื่อแก้ไขข้อมูล */}
                        <div onClick={() => openEdit(item)}
                            className="flex flex-1 items-center justify-between">
                            <span className={`text-left text-p ${item.checked ? 'text-blackk' : 'text-gray-400'}`}>{item.name}</span>
                            <div className="flex items-center gap-[2vw]">
                                <span className={`font-bold text-p ${item.checked ? 'text-blackk' : 'text-gray-400 opacity-50'}`}>{item.amount || '0'}</span>
                                <span className={`text-p ${item.checked ? 'text-blackk' : 'text-gray-400 opacity-50'}`}>บาท</span>
                            </div>
                        </div>
                    </div>
                ))}
                <button onClick={openAdd}
                    className="w-full py-[1.5vh] mt-1 border-[1.5px] border-dashed border-babyblue text-gray-500 rounded-xl flex items-center justify-center gap-2 text-p">
                    <img src={addIcon} alt="add" className="w-[5vw] min-w-[20px]" />
                    เพิ่มรายการ
                </button>
            </div>
            {/* popup เพิ่ม / แก้ไข */}
            {editingItem && (
                ''
            )}
        </div>
    )

}