import { Seo } from './components/seo/Seo';
import Navbar from './components/navbar/Navbar';
import { topbar } from './data/header';

export default function Home() {
    return (
        <main>
            <Seo title="Home" description="Home" />
            <Navbar topbar={topbar} />
        </main>
    );
};
