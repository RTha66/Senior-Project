import React from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../../components/Topbar";

import taxIcon from "../../assets/tax_icon.svg"
import carLoanIcon from "../../assets/carloan_icon.svg"
import homeLoanIcon from "../../assets/homeloan_icon.svg"
import socialSecurityIcon from "../../assets/SocialS_icon.svg"
import providentFundIcon from "../../assets/ProvidentF_icon.svg"
import creditCardIcon from "../../assets/credit_icon.svg"

export default function CalculatorsPage() {
    const navigate = useNavigate();

    const menuItems = [
        {id: 'tax', title: 'ภาษี', icon: taxIcon, path: ''},
        {id: 'car', title: 'ผ่อนรถ', icon: carLoanIcon , path: ''},
        {id: 'home', title: 'ผ่อนบ้าน', icon: homeLoanIcon, path: ''},
        {id: 'social', title: 'ประกันสังคม', icon: socialSecurityIcon, path: ''},
        {id: 'provident', title: 'กองทุนเลี้ยงชีพ', icon: providentFundIcon, path: ''},
        {id: 'credit', title: 'บัตรเครดิต', icon: creditCardIcon, path: ''},
    ];

    return (
        <div className="flex flex-col h-screen h-dvh pb-[82px] overflow-hidden">
            <Topbar title='คำนวณ' />
            <main className='flex-1 min-h-0 max-w-md w-full mx-auto px-[5vw] py-[3vh]'>
                <div className="h-full grid grid-cols-2 grid-rows-3 gap-[2vh]">
                    {menuItems.map((item) => (
                        <button key={item.id} onClick={() => item.path && navigate(item.path)}
                            className="bg-white rounded-2xl p-3 flex flex-col items-center justify-center gap-0 shadow-[0_4px_16px_0_rgba(0,0,0,0.04)] active:scale-[0.98] transition-all cursor-pointer border border-transparent">
                                <div className="flex-1 min-h-0 w-full flex items-center justify-center">
                                    <img src={item.icon} alt={item.title} className="w-full h-full max-h-[92%] max-w-[85%] object-contain"/>
                                </div>
                                <span className="shrink-0 text-p font-semibold text-blackk pb-3">{item.title}</span>
                        </button>
                    ))}
                </div>
            </main>
        </div>
    );
}