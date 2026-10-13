import React from "react";

export default function Topbar({ title, rightContent}) {
    return (
        <header className="sticky top-0 w-full z-30 bg-white pt-10 pb-3 px-6 shadow-[0_2px_15px_0_rgba(0,0,0,0.05)]">
            <div className={`flex items-center w-full max-w-md mx-auto
                ${rightContent ? 'justify-between':'justify-center'}`}>
                <h2 className="text-h3 font-bold text-blackk">
                    {title}
                </h2>
                {rightContent && (
                    <div>{rightContent}</div>
                )}
            </div>
        </header>
    )
}