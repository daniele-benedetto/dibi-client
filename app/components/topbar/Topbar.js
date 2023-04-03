export default function Topbar({topbar}) {
    return (
        <div className="top-message-bar">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 bg-black text-white text-center text-xs p-1">
                        <div className="top-message-bar-text">
                            <p>{topbar.text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}