import { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { HiOutlineInformationCircle, HiCheck } from 'react-icons/hi';
import { CgDanger } from 'react-icons/cg';

export default function Toast({type, text, setToast}) {

    const [toastIcon, setToastIcon] = useState(null);

    useEffect(() => {
        switch(type) {
            case 'information':
                setToastIcon(<HiOutlineInformationCircle size={20} color={'blue'} />);
                break;
    
            case 'success':
                setToastIcon(<HiCheck size={20} color={'green'} />);
                break;
            
            case 'alert':
                setToastIcon(<FiAlertTriangle size={20} color={'orange'} />);
                break;
    
            case 'danger':
                setToastIcon(<CgDanger size={20} color={'red'} />);
                break;
    
            default: 
                setToastIcon(null);
                break;
        }
    }, [type]);


    return(
        <div onClick={() => setToast(false)} className='max-w-sm border bg-white rounded-md shadow-lg fixed top-10 left-1/2 -translate-x-1/2 z-30 cursor-pointer'>
            <div className="flex p-4">
                <div className="flex-shrink-0">
                    {toastIcon}
                </div>
                <div className="ml-3">
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
}

