import Image from 'next/image';
import logoImage from '../../../public/images/logo_cianfrusalia.png';

export default function Loader() {
    return(
        <div className="w-full h-full fixed top-0 left-0 background-first-color text-white flex justify-center items-center font-black z-40" >
            <Image className="logo-white" src={logoImage} alt="Logo di Cianfrusalia" width={400} height={400} />
        </div>
    );
}