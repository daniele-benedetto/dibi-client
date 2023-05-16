export default function ProductDetailWrapper({title, children}) {
    return (
        <div className='flex flex-col mt-5'>
        <h5 className="mb-3 font-thin">{title}:</h5>
        <div className='flex flex-wrap'>
            {children}
        </div>
    </div>
    );
}