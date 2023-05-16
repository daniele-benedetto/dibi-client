"use client";
import { useLockBodyScroll } from "@/app/hooks/useLockBodyScroll";
import useWindowSize from "@/app/hooks/useWindowSize";
import { useEffect, useState } from "react";

import Button from "../Button/Button";
import ReorderMenu from "../ReorderMenu/ReorderMenu";

export default function ActionsMenu({setSortType, setSidebarIsOpen, sortType, sidebarIsOpen}) {

    const [orderMenu, setOrderMenu] = useState(false);

    useEffect(() => {
        if(sidebarIsOpen) {
            document.body.classList.add("no-scroll");            
        } else {
            document.body.classList.remove("no-scroll");
        }
    }, [sidebarIsOpen]);

    const size = useWindowSize();

    const isMobile = () => {
        if (size.width < 768) {
            return (
                <section className='flex align-center justify-between border-b pb-3'>
                    <div className="relative">
                        <Button text={'Ordina per'} type={'container'} icon={true} action={() => setOrderMenu(!orderMenu)} />
                        { orderMenu && <ReorderMenu sortType={sortType} setSortType={setSortType} action={() => setOrderMenu(!orderMenu)} /> }
                    </div>
                    <div className="relative">
                        <Button text={'Filtra'} type={'container'} icon={true} action={() => setSidebarIsOpen(true)} />
                    </div>
                </section>
            );
        } else {
            return (
                <section className='flex align-center justify-end border-b'>
                    <div className="relative">
                        <Button text={'Ordina per'} type={'outline'} icon={false} action={() => setOrderMenu(!orderMenu)} />
                        { orderMenu && <ReorderMenu sortType={sortType} setSortType={setSortType} action={() => setOrderMenu(!orderMenu)} /> }
                    </div>
                </section>
            );
        }
    }

    return (
        <>
            {isMobile()}
        </>
    );
}