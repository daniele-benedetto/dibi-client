import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { useLockBodyScroll } from "@/app/hooks/useLockBodyScroll";

export default function VerticalMenu({navbar, setMenuIsOpen}) {
    useLockBodyScroll();
    return (
        <ul className="flex flex-col w-full justify-center items-center text-4xl uppercase fixed top-0 left-0 font-black bg-white h-screen z-10">
            {navbar.map(item => (
                <li className="my-3" key={item.id}>
                    <Link onClick={() => setMenuIsOpen(false)} href={item.link}>{item.text}</Link>
                </li>
            ))}
            <Link onClick={() => setMenuIsOpen(false)} href="/user/login">
                <FaUserAlt size={32} className="my-3" />
            </Link>
        </ul>
    );
}