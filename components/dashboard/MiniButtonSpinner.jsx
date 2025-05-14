const MiniButtonSpinner = ({ text = "Saving..." }) => {
    return (
        <div className="flex items-center justify-center space-x-2">
            <img
                src="/navLogo.png"
                alt="Solutyics Logo"
                className="w-5 h-5 mr-2"
            />
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            <span>{text}</span>
        </div>
    );
};

export default MiniButtonSpinner;