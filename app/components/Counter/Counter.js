export default function Counter({time, text}) {
    return (
        <div className="flex flex-col justify-center items-center">
            <span className="text-2xl font-bold bg-black text-white w-10 h-10 flex justify-center items-center mx-5">{time}</span>
            <span className="text-sm">{text}</span>
        </div>
    );
};
