const Navbar = () => {
    return (
        <div className=" bg-white fixed w-full justify-between flex p-3 font-mono items-center">
            <div className="">Cocrate</div>
            <div className="flex gap-5 items-center">
                <div>Explore</div>
                <div>My Projects</div>
                <div>
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.9631 32.4496C28.2242 28.8349 23.8848 26.5 19 26.5C14.1152 26.5 9.77578 28.8349 7.03693 32.4496M30.9631 32.4496C34.667 29.1527 37 24.3488 37 19C37 9.05887 28.9411 1 19 1C9.05887 1 1 9.05887 1 19C1 24.3488 3.333 29.1527 7.03693 32.4496M30.9631 32.4496C27.783 35.2802 23.5923 37 19 37C14.4077 37 10.217 35.2802 7.03693 32.4496M25 14.5C25 17.8137 22.3137 20.5 19 20.5C15.6863 20.5 13 17.8137 13 14.5C13 11.1863 15.6863 8.5 19 8.5C22.3137 8.5 25 11.1863 25 14.5Z" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Navbar;