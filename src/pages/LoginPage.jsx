const LoginPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                <div className="px-4 py-5 sm:p-6">
                    <div className="text-center text-xl">Login</div>
                    <div>FIREBASE AUTO DEPLOY</div>
                    <button id="rosefireButton" type="button" 
                        className="block my-15 mx-auto text-white bg-[#800000]
                        text-lg py-2.5 px-7 rounded-md">
                        Sign in with Rosefire
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;