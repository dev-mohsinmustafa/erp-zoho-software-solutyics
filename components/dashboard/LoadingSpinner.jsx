const LoadingSpinner = ({ message = "Loading, please wait..." }) => {
    return (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <img
                src="/navLogo.png"
                alt="Solutyics Logo"
                className="w-16 h-16 mb-4"
            />
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-violetRed mt-2"></div>
            <p className="text-violetRed font-semibold mt-4">{message}</p>
        </div>
    );
};

export default LoadingSpinner;