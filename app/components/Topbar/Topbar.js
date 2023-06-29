export default function Topbar({topbar}) {
    return (
        <header className="w-full col-md-12 background-first-color text-black text-center text-xs p-1 relative z-20 font-bold">
            <p>{topbar}</p>
        </header>
    );
}