export default function FooterCol({children, title}) {
    return (
        <div className="flex flex-col mb-5 mr-10">
            <h3 className="text-xl my-3 uppercase">{title}</h3>
            <ul className="text-sm">
                {children}
            </ul>
        </div>
    );
}