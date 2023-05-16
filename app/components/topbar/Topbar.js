export default function Topbar({topbar}) {
    return (
        <header className="w-full col-md-12 bg-black text-white text-center text-xs p-1 relative z-20">
            <p>{topbar.text}</p>
        </header>
    );
}