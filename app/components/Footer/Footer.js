import Link from "next/link";
import FooterCol from "@/app/components/Footer/FooterCol";
import Image from "next/image";
import logoImage from "../../../public/images/logo_cianfrusalia.png";

export default function Footer({footerServizioClienti, footerSocial, footerAbout}) {
    const year = new Date().getFullYear();
    return (
        <footer className=" text-xs p-5 background-first-color">
            <div className="container grid grid-cols-1 m-auto gap-5 p-5 md:grid-cols-5 md:p-0">

                <div className="flex items-center w-full justify-center p-2">
                    <Link href="/">
                        <Image src={logoImage} alt="Logo di Cianfrusalia" width={200} height={200} />
                    </Link>
                </div>

                <FooterCol title={"Servizio clienti"}>
                    {footerServizioClienti && footerServizioClienti.length > 0 && footerServizioClienti.map(item => (
                        <li className="my-1" key={item.id}>
                            <Link href={item.link}>{item.text}</Link>
                        </li>
                    ))}
                </FooterCol>

                <FooterCol title={"About"}>
                    {footerAbout && footerAbout.length > 0 && footerAbout.map(item => (
                        <li className="my-1" key={item.id}>
                            <Link href={item.link}>{item.text}</Link>
                        </li>
                    ))}
                </FooterCol>

                <FooterCol title={"Social"}>
                    {footerSocial && footerSocial.length > 0 && footerSocial.map((item, index) => (
                        <li className="my-1" key={item.id}>
                            <Link href={item.link}>{item.text}</Link>
                        </li>
                    ))}
                </FooterCol>
            </div>
            <div className="flex items-center flex-col w-full justify-center p-2">
                <p className="text-center text-sm">© {year} Cianfrusalia - Tutti i diritti riservati</p>
                <p className="text-center text-sm">P.IVA: 04098340369 | Telefono: 3716275760 | Email: mrciafrusalia@gmail.com</p>
            </div>
        </footer>
    );
}