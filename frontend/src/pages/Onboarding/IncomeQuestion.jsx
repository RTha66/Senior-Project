import React, { useState } from "react";
import ReactDOM from 'react-dom';

import checkIcon from '../../assets/check.svg';
import addIcon from '../../assets/add.svg';
import leftArrow from '../../assets/icon_leftArrow.svg';
import CurrencyInput from "../../components/CurrencyInput";

export default function IncomeQusetion({ items, setItems}) {
    // แก้ไข item popup
    const [editingItem, setEditingItem] = useState(null);

    const [] = useState(null);
    // กำหนดค่า item
    const sortedItems = [...items].sort((a,b) => b.checked - a.checked);
    // dropdown เปิดไหม
    const [isDropdownOpen, setIsDropDownOpen] = useState(false);
    // toggle check
    const toggleChecked = (id) => {
        setItems(items.map(item => item.id === id ? {...item, checked: !item.checked} : item))
    }
    // ไม่ยอมกรอกช่องให้แสดง error
    const [nameError, setNameError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [dateError, setDateError] = useState('');
    // เปิด popup เพื่อแก้ไขรายการ
    const handleOpenEdit = (item) => {
        setNameError('');
        setAmountError('');
        setDateError('');
        setEditingItem({ ...item });
    }
    // เพิ่มรายการ
    const handleOpenAdd = () => {
        setNameError('');
        setAmountError('');
        setDateError('');
        setEditingItem({ id: null, name: '', amount: '', amount: '', date: '', checked: true});
    }
    const handleSave = () => {
        let hasError = false;
        setNameError('');
        setAmountError('');
        setDateError('');

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
        if (!editingItem.date) {
            setDateError('กรุณาเลือกวันที่เงินเข้า')
            hasError = true;
        }

        if (hasError) return;

        if (editingItem.id === null) {
            setItems([...items, {...editingItem, id: Date.now(), checked: true}])
        } else {
            setItems(items.map(item => item.id === editingItem.id ? editingItem : item))
        }

        setEditingItem(null);
    }
    // loop เพื่อดึงรายการหน้านั้น
    return (
        <div className="flex flex-col items-center w-full">
            <p className="text-blackk mb-[1vh] leading-relaxed">นี่ๆ ขอถามอะไรหน่อยสิ</p>
            <h2 className="text-h4 font-medium text-blackk text-center px-[2vw] leading-relaxed">เธอมีรายรับประจำที่ได้รับในแต่ละเดือนอะไรบ้างหรอ</h2>
            <div className="flex flex-col w-full gap-[1.5vh] px-[1vh] pb-[6dvh] mt-[4vh] overflow-y-auto max-h[cal(100dvh-90vh-11dvh)] hide-scrollbar">
                {sortedItems.map((item) => (
                    <div key={item.id} className={`flex items-center gap-[2vh] w-full p-[2vh] border-[1.5px] rounded-xl transition-all ${item.checked ? 'border-pinkk bg-pink-50' : 'border-babyblue bg-white'}`}>
                        {/* checkbox */}
                        <div onClick={() => toggleChecked(item.id)} className={`flex items-center justify-center w-[clamp(1.5rem,5vw,2.5rem)] h-[clamp(1.5rem,5vw,2.5rem)] rounded-lg transition-colors flex-shrink-0 ${item.checked ? 'bg-hotpink' : 'bg-gray-100'}`}>
                            {item.checked && <img src={checkIcon} className="w-[80%] h-[80%]" />}
                        </div>
                        {/* ชื่อรายการ + วันที่ / จน.เงิน*/}
                        <div onClick={() => handleOpenEdit(item)} className="flex flex-1 justify-between">
                            {/* ชื่อรายการ + วันที่ */}
                            <div className={`flex flex-col text-left ${item.checked ? 'text-black' : 'text-gray-400'}`}>
                                <span className='text-p'>
                                    {item.name}
                                </span>
                                <span className="text-sm">
                                    {item.date === '31' ? 'ได้รับทุกวันสิ้นเดือน' : `ได้รับทุกวันที่ ${item.date}`}
                                </span>
                            </div>
                            {/* จน.เงิน */}
                            <div className="flex items-center gap-[2vw]">
                                <span className={`font-bold text-p ${item.checked ? 'text-blackk' : 'text-gray-400 opacity-50'}`}>{item.amount ? Number(item.amount).toLocaleString('th-TH') : '0'}</span>
                                <span className={`text-p ${item.checked ? 'text-blackk' : 'text-gray-400 opacity-50'}`}>บาท</span>
                            </div>
                        </div>
                    </div>
                ))}
                {/* ปุ่มเพิ่มรายการ */}
                <button onClick={handleOpenAdd}
                    className="flex items-center justify-center gap-2 text-p w-full py-[1.5vh] mt-1 border-[1.5px] border-dashed border-babyblue text-gray-500 rounded-xl">
                    <img src={addIcon} alt="add" className="w-[5vw] min-w-[20px]" />
                    เพิ่มรายการ
                </button>
            </div>
            {/* เมื่อกดแก้ไขหรือกดเพิ่มรายการก็จะเปิด popup ขึ้นมา */}
            {editingItem && ReactDOM.createPortal(
                // พื้นหลัง
                <div className="fixed inset-0 bg-black/40 z-[100] flex justify-center items-center p-4">
                    {/* กล่อง */}
                    <div className="bg-white flex flex-col w-full max-w-sm rounded-2xl p-6 gap-4 shadow-xl">
                        {/* ข้อความหัวด้านบน */}
                        <h3 className="text-h4 font-bold text-blackk text-center">
                            {editingItem.id == null ? 'เพิ่มรายการรายรับ' : 'แก้ไขรายการรายรับ'}
                        </h3>
                        {/* ชื่อรายการ */}
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center">
                                <label>ชื่อรายการ</label>
                                {/* name?.length คือ name มีค่าไหมถ้ามีให้เอาค่า length มา ถ้าไม่มีจะไม่ Error แล้วเอาค่า 0 มาใช้แทน*/}
                                <span className='text-sm text-gray-400'>
                                    {editingItem.name?.length || 0}/25
                                </span>
                            </div>
                            <input type='text'placeholder="เช่น เงินเดือน" value={editingItem.name} maxLength={25} onChange={(e) => {setNameError(''); setEditingItem({ ...editingItem, name: e.target.value });}}
                                className={`w-full bg-gray-50 border-[1.5px] rounded-xl p-3 focus:outline-none ${nameError ? 'border-red-500 focus:border-red-500':'border-gray-200 focus:border-bluee'}`}/>
                            {/* เตือนถ้าไม่ยอมกรอก */}
                            {nameError && <span className="text-sm text-red-500 mt-0.5 ml-1">
                                {nameError}</span>}
                        </div>
                        {/* วันที่ที่ได้รับเงิน */}
                        <div className="relative flex flex-col gap-1">
                            <label>วันที่เงินเข้า</label>
                            <button type='button' onClick={() => {setDateError(''); setIsDropDownOpen(!isDropdownOpen)}}
                                className={`w-full flex items-center justify-between bg-gray-50 border-[1.5px] rounded-xl p-3 text-left transition-all ${dateError ? 'border-red-500 focus:border-red-500':'border-gray-200 focus:border-bluee'}`}>
                                <span className={editingItem.date ? 'text-blackk font-medium':'text-gray-400'}>
                                    {editingItem.date === '31' ? 'ทุกวันสิ้นเดือน' : editingItem.date ? `ทุกวันที่ ${editingItem.date} ของเดือน` : '-- เลือกวันที่เงินเข้า --'}
                                </span>
                                <img src={leftArrow} alt="arrow" className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-90' : '-rotate-90'}`}/>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute top-[102%] left-0 w-full bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden py-1.5 max-h-56 overflow-y-auto hide-scrollbar">
                                    {/* ตัวเลือกทุกสิ้นเดือน */}
                                    <div onClick={() => {setEditingItem({...editingItem, date: '31' }); setIsDropDownOpen(false);}}
                                        className={`flex items-center justify-between px-4 py-2.5 mx-1.5 rounded-xl text-p transition-colors ${editingItem.date === '31' ? 'bg-pink-100 text-hotpink font-bold':'text-blackk'}`}>
                                            <span>ทุกวันสิ้นเดือน</span>
                                            {editingItem.date === '31' && <img src={checkIcon} alt="check" className="w-4 h-4"/>}
                                    </div>
                                    {/* ตัวเลือกวันอื่น */}
                                    {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                                        const isSelected = String(editingItem.date) === String(day);
                                        return (
                                            <div key={day} onClick={() => {setEditingItem({...editingItem, date: String(day)}); setIsDropDownOpen(false);}}
                                            className={`flex items-center justify-between px-4 py-2.5 mx-1.5 rounded-xl text-p transition-colors ${isSelected ? 'bg-pink-50 text-hotpink font-semibold':'text-gray-700'}`}>
                                                    <span>ทุกวันที่ {day} ของเดือน</span>
                                                    {isSelected && <img src={checkIcon} alt="check" className="w-4 h-4"/>}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                            {/* เตือนถ้าเกิดไม่ยอมใส่วัน */}
                            {dateError && <span className="text-sm text-red-500 mt-0.5 ml-1">
                                {dateError}</span>}

                            {/* <select value={editingItem.date || ''} onChange={(e) => {setEditingItem({...editingItem, date: e.target.value });}}
                                className={`w-full bg-gray-50 border-[1.5px] rounded-xl p-3 focus:outline-none ${''}`}>
                                <option value='' disabled>-- เลือกวันที่เงินเข้า --</option> */}
                                {/* Array.from(object, mapFunction, thisValue<ไม่ได้ใช้แล้ว เพราะใช้ Arrow Func แทน>) */}
                                {/* (element, index) -> (_,i) element ใช้ก็เมื่อเอาค่า value ตัวนั้นมาใช้*/}
                                {/* {Array.from({ length: 30 }, (_ ,i) => i + 1).map((day) => (
                                    <option key={day} value={day}>
                                        ทุกวันที่ {day} ของเดือน
                                    </option>
                                ))}
                                <option value='31'>ทุกสิ้นเดือน</option>
                            </select> */}
                                    {/* เตือนถ้าไม่ยอมกรอก */}
                        </div>
                        {/* รายรับ */}
                        <div className="flex flex-col gap-1">
                            <label>จำนวนเงิน</label>
                            < CurrencyInput value={editingItem.amount} onChange={(val) => {setAmountError(''); setEditingItem({...editingItem, amount: (val || '0')})}} placeholder='0' 
                                className={`w-full bg-gray-50 border-[1.5px] rounded-xl p-3 focus:outline-none ${amountError ? 'border-red-500 focus:border-red-500':'border-gray-200 focus:border-bluee'}` }/>
                            {/* เตือนถ้าไม่ยอมกรอก */}
                            {amountError && <span className="text-sm text-red-500 mt-0.5 ml-1">
                                {amountError}</span>}
                        </div>
                        {/* ปุ่มกดบันทึก */}
                        <div className="flex justify-between gap-1 w-full">
                            {/* ยกเลิก */}
                            <button onClick={() => {setEditingItem(null);}}
                                className="text-p text-gray-600 rounded-xl px-5 py-3 flex-1">ยกเลิก</button>
                            {/* save */}
                            <button onClick={handleSave}
                                className="text-p text-blackk bg-bluee rounded-xl px-5 py-3 flex-1">บันทึก
                            </button>
                        </div>
                    </div>
                </div>, document.body
            )}
        </div>
    )
}