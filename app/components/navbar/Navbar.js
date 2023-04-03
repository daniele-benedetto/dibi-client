import Topbar from "../topbar/Topbar";

export default function Navbar({ topbar }) {
    //top message bar
    return (
        <header>
            <Topbar topbar={topbar} />
        </header>
    );
};
