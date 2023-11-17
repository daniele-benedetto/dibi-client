import Link from "next/link";
import { ImSad } from "react-icons/im";

export default function NotFound() {
    return(
        <main style={{height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <section style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <ImSad size={64} />
                <h1 style={{fontWeight: 'bold', fontSize: '3rem', textAlign: 'center', marginTop: '1rem'}}>
                    Scusa, non riusciamo a trovare la pagina che stai cercando.
                </h1>
                <Link href="/" style={{fontWeight: 'bold', fontSize: '2rem', backgroundColor: '#000', color: '#fff', padding: '1rem', borderRadius: '1rem', marginTop: '1rem', 'textDecoration': 'none'}} >
                    Torna alla home
                </Link>
            </section>
        </main>
    );
}