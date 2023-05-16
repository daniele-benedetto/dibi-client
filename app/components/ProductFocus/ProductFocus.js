export default function ProductFocus({title, text, icon}) {
    return (
        <div className='w-1/3 flex flex-col justify-center items-center text-center p-1'>
            {icon}
            <span className='text-sm uppercase font-bold mt-3'>{title}</span>
            <p className='text-xs mt-1 font-thin'>{text}</p>
        </div>
    );
}