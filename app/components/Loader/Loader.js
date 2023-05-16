import { BsFillCartCheckFill } from "react-icons/bs";

export default function Loader() {
    return(
        <div className="w-full h-full fixed top-0 left-0 bg-black text-white flex justify-center items-center font-black z-40" >
            <BsFillCartCheckFill size={80} color="white" />
        </div>
    );
}