import Link from "next/link";
import FooterCol from "@/app/components/Footer/FooterCol";

export default function Footer({footerServizioClienti, footerSocial, footerAbout}) {
    return (
        <footer className="bg-black text-white text-xs p-5">
            <div className="container grid grid-cols-1 m-auto gap-5 p-5 md:grid-cols-5 md:p-0">

                <FooterCol title={"Servizio clienti"}>
                    {footerServizioClienti.map(item => (
                        <li className="my-1" key={item.id}>
                            <Link href={item.link}>{item.text}</Link>
                        </li>
                    ))}
                </FooterCol>

                <FooterCol title={"About"}>
                    {footerAbout.map(item => (
                        <li className="my-1" key={item.id}>
                            <Link href={item.link}>{item.text}</Link>
                        </li>
                    ))}
                </FooterCol>

                <FooterCol title={"Social"}>
                    {footerSocial.map((item, index) => (
                        <li className="my-1" key={item.id}>
                            <Link href={item.link}>{item.text}</Link>
                        </li>
                    ))}
                </FooterCol>
            </div>
        </footer>
    );
}