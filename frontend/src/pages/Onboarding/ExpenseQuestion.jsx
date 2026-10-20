import React, { useState } from "react";
import ReactDOM from 'react-dom';
import checkIcon from '../../assets/check.svg';
import addIcon from '../../assets/add.svg';
import CurrencyInput from '../../components/CurrencyInput';

// items คือค่า ExpenseItems ค่าพวก id, name, checked, amount
export default function ExpenseQuestion({ items, setItems }) {
    // ใช้เก็บข้อมูล item ที่กำลังแก้ไขอยู่ (null = ปิด popup)
    // ใช้ null เพราะว่าถ้าเป็น null คือ ปิด popup ไม่มีข้อมูล พอเพิ่มรายการจะเปลี่ยนจาก null เป็น OBJ เปล่า
    // ถ้าใช้ false แก้ไขข้อมูลด้านในไม่ได้ / {} ไม่รู้ว่าเปิดหรือปิด
    const [editingItem, setEditingItem] = useState(null);

    const [nameError, setNameError] = useState('');
    const [amountError, setAmountError] = useState('');

    // เปลี่ยนค่า checked
    const toggleChecked = (id) => {
        setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item))
    }

    // กดรายการเดิมเพื่อเปิดป็อปอัพและมีข้อมูลเดิม
    const openEdit = (item) => {
        setNameError('');
        setAmountError('');
        setEditingItem({ ...item });
    }
    
    // เพิ่มรายการที่เป็นค่าเปล่าๆ
    const openAdd = () => {
        setNameError('');
        setAmountError('');
        setEditingItem({ id: null, name: '', amount: '', checked: true })
    }

    const handleSave = () => {
        let hasError = false;
        // ล้างค่าอันเก่าออก
        setNameError('');
        setAmountError('');

        // ชื่อห้ามว่าง เอา editname ก่อนเพราะว่าเผื่อสร้างมาแล้วยังไม่มีค่า ก็คือ Null & Undifined ถ้าเอา trim ขึ้นก่อนจะ error เพราะจะ trim ค่าสองอันนั้นไม่ได้
        if (!editingItem.name || !editingItem.name.trim()) {
            setNameError('กรุณากรอกชื่อรายการ')
            hasError = true;
            // ถ้ามีแต่ตัวเลข
        } else if (!/[a-zA-Zก-ฮ]/.test(editingItem.name)) {
            setNameError('กรุณากรอกตัวอักษร')
            hasError = true;
        }
        if (!editingItem.amount || Number(editingItem.amount) <= 0) {
            setAmountError('กรุณากรอกจำนวนเงินให้ถูกต้อง')
            hasError = true;
        }

        if (hasError) return;

        // แก้ไขในส่วนของรายการที่เพิ่มเข้าไปใหม่
        if (editingItem.id === null) {
            setItems([...items, {...editingItem, id: Date.now(), checked: true}])
        } else {
            // แก้ไขรายการเดิม
            setItems(items.map(item => item.id === editingItem.id ? editingItem : item));
        }

        setEditingItem(null);
    }
    // เอา items ทั้งหมดมาจัดเรียง 1 = true 0 = false แล้วก็เอามาลบกันเพื่อหาลำดับ
    const sortedItems = [...items].sort((a, b) => b.checked - a.checked);

    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="text-h4 font-medium text-blackk text-center px-[2vw] leading-relaxed">
                ตอนนี้เธอมีค่าใช้จ่ายที่ต้องจ่ายทุกเดือนไหม
            </h2>
            <div className="flex flex-col w-full gap-[1.5vh] px-[1vh] pb-[6dvh] mt-[4vh] overflow-y-auto max-h-[calc(100dvh-90vw-11dvh)] hide-scrollbar ">
                {/* วนไปแต่ละไอเท็ม */}
                {sortedItems.map((item) => (
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
                            className="flex flex-1 items-center justify-between min-w-0">
                            <span className={`text-left text-p break-words min-w-0 ${item.checked ? 'text-blackk' : 'text-gray-400'}`}>{item.name}</span>
                            <div className="flex items-center gap-[2vw] flex-shrink-0">
                                <span className={`font-bold text-p ${item.checked ? 'text-blackk' : 'text-gray-400 opacity-50'}`}>{item.amount ? Number(item.amount).toLocaleString('th-TH') : '0'}</span>
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
            {/* ใช้ ReactDOM.createPortal เพราะว่า Z-100 ที่ใช้มันอยู่แค่ในสโคปของกระต่ายแต่ส่วนอื่นเช่น Progessbar มันอยู่บนกว่าทำให้ใช้ค่า 100 แต่ก็สูงสุดแค่ในกระต่าย
                เลยต้องใช้ createPortal (), document.body เพื่อเป็นการเอาไปใส่ใน HTML element Body และก็จะอยุ่สูงกว่าส่วนอื่น */}
            {editingItem && ReactDOM.createPortal(
                <div className="fixed inset-0 bg-black/40 z-[100] flex justify-center items-center p-4">
                    <div className="bg-white flex flex-col w-full max-w-sm rounded-2xl p-6 gap-4 shadow-xl">
                        <h3 className="text-h4 font-bold text-blackk text-center">
                            {editingItem.id == null ? 'เพิ่มรายการค่าใช้จ่าย' : 'แก้ไขรายการ'}
                        </h3>
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center">
                                <label className="text-p text-blackk">ชื่อรายการ</label>
                                <span className="text-sm text-gray-400">{editingItem.name?.length || 0}/25</span>
                            </div>
                            <input type="text" placeholder="เช่น ค่าน้ำ ค่าไฟ..." maxLength={25}
                                // ตรง nameError ปกติเป็นค่า '' คือ False เลยแสดงเป็นขอบเทา ก็คือไม่ Error แต่ถ้า nameError คือ 'กรุณากรอกชื่อรายการ' ก็คือ True เพราะว่ามีค่า ก็จะแสดงเป็นสีแดง ซึ่งคือไม่ได้กรอกชื่อต้อง Error
                                className={`w-full bg-gray-50 border-[1.5px] rounded-xl p-3 focus:outline-none 
                                    ${nameError ? 'border-red-500 focus:border-red-500':'border-gray-200 focus:border-bluee'}`}
                                value={editingItem.name} onChange={(e) => {setNameError(''); setEditingItem({...editingItem, name: e.target.value});}} />
                            {nameError && <span className="text-sm text-red-500 mt-0.5 ml-1">
                                {nameError}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-p text-blackk">จำนวนเงิน</label>
                            <CurrencyInput placeholder='0' value={editingItem.amount} onChange={(val) => { setAmountError(''); setEditingItem({...editingItem, amount: val || ''}); } } 
                            className={`w-full bg-gray-50 border-[1.5px] rounded-xl p-3 focus:outline-none ${amountError ? 'border-red-500 focus:border-red-500':'border-gray-200 focus:border-bluee'}` } />
                            {/* ตัวหนังสือเตือนถ้าไม่ได้มีข้อความกรอก */}
                            {amountError && <span className="text-sm text-red-500 mt-0.5 ml-1">
                                {amountError}</span>}
                        </div>
                        <div className="flex justify-between gap-1 w-full">
                            <button onClick={() => {setNameError(''); setAmountError(''); setEditingItem(null);}}
                                className="text-p text-gray-600 rounded-xl px-5 py-3 flex-1 ">ยกเลิก</button>
                            <button onClick={handleSave}
                                className="text-p text-blackk bg-bluee rounded-xl px-5 py-3 flex-1 ">บันทึก</button>
                            
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    )

}