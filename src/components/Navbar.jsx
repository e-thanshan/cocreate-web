import { UserCircleIcon } from '@heroicons/react/24/outline'
import {  signOut  } from 'firebase/auth';
import { auth } from '../firebase';

const handleSignOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('signed out')
    }).catch((error) => {
        // An error happened.
        console.error(error);
    });

}

const Navbar = () => {
    return (
        <div className=" bg-white fixed w-full justify-between flex p-3 font-mono items-center">
            <div className="">Cocreate</div>
            <div className="flex gap-5 items-center">
                <div>Explore</div>
                <div>My Projects</div>
                <div className='signout' onClick={handleSignOut}>
                    <UserCircleIcon className='h-9 w-9 stroke-1' />
                </div>
            </div>
        </div>
    );
}

export default Navbar;