export default function Topbar({topbar}) {
    return (
        <header className="w-full col-md-12 background-first-color text-black text-center text-md p-1 relative z-20 font-bold uppercase">
            <p>{topbar}</p>
        </header>
    );
}