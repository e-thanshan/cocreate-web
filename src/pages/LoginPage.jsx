const LoginPage = () => {
    return (

        // rose fire api key: dd13ef46-548d-4cc9-9673-0809f9616340
        <div className="flex justify-center items-center h-screen">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                <div className="px-4 py-5 sm:p-6">
                    <div className="text-center text-xl">Login</div>
                    <button id="rosefireButton" type="button" 
                        className="block my-15 mx-auto text-white bg-[#800000]
                        text-lg py-2.5 px-7 rounded-md">
                        Sign in with Rosefire
                    </button>
                    <div id="firebaseui-auth-container"></div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;