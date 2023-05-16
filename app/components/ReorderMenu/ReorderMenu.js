"use client";

export default function ReorderMenu({setSortType, action, sortType}) {

    return (
        <div className="absolute top-100 left-100 w-80 bg-white border border-gray-300 rounded-md shadow-md md:-translate-x-3/4">
            <ul className="flex flex-col" onClick={action}>
                <li onClick={() => setSortType(['name', 'asc'])} className="p-3 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">Ordina per nome (A-Z)</li>
                <li onClick={() => setSortType(['name', 'desc'])} className="p-3 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">Ordina per nome (Z-A)</li>
                <li onClick={() => setSortType(['price', 'asc'])} className="p-3 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">Ordina per prezzo (dal basso all'alto)</li>
                <li onClick={() => setSortType(['price', 'desc'])} className="p-3 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">Ordina per prezzo (da alto a basso)</li>
            </ul>
        </div>
    );
}