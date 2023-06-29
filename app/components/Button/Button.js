"use client";    
import { useLayoutEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function Button({text, type, action, icon, color}) {

    const [buttonClasses, setButtonClasses] = useState("border border-black flex items-center justify-between p-2");
    const [buttonStyles, setButtonStyles] = useState({});

    useLayoutEffect(() => {
        switch (type) {
            case "container":
                setButtonClasses("border border-black flex items-center justify-between p-2 mr-2");
                break;
            case "container-center":
                setButtonClasses("border border-black flex items-center justify-center p-2 mr-2");
                break;
            case "outline":
                setButtonClasses("flex items-center justify-between p-2");
                break;
            case "filled":
                setButtonClasses("background-first-color text-black flex items-center justify-center p-2 uppercase w-full font-black");
                break;
            case "top-right":
                setButtonClasses("absolute right-0 top-0 cursor-pointer");
                break;
            case "top-left":
                setButtonClasses("absolute left-5 top-5 cursor-pointer");
                break;
            case "empty":
                setButtonClasses("flex items-center justify-center p-2");
                break;
            case "underline":
                setButtonClasses("font-black underline text-xs");
                break;
            case "quad":
                setButtonClasses("min-w-[32px] min-h-[32px] mr-2 flex justify-center items-center border p-1 uppercase");
                setButtonStyles({backgroundColor: color});
                break;
            case "quad-active":
                setButtonClasses("min-w-[32px] min-h-[32px] mr-2 flex justify-center items-center border-2 border-black p-1 uppercase");
                setButtonStyles({backgroundColor: color});
                break;
            case "disable":
                setButtonClasses("bg-gray-300 text-white flex items-center justify-center p-2 uppercase w-full font-black");
                break;
            default:
                setButtonClasses("border border-black flex items-center justify-between p-2");
                break;
        }
    }, [type]);

    return (
        <button style={buttonStyles} className={buttonClasses} onClick={action}>
            {text}
            {icon && <MdOutlineKeyboardArrowRight /> }
        </button>
    );
}