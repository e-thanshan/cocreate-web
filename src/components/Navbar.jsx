import { UserCircleIcon } from '@heroicons/react/24/outline'
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';

const handleSignOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    localStorage.removeItem('user');
    window.location.href = '/explore';
    
  }).catch((error) => {
    // An error happened.
    console.error(error);
  });

}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    if (user?.uid) {
      await getDocs(query(collection(db, "Users"), where("authUID", "==", user.uid))).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUserData(newData[0]);
      });
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className=" bg-white fixed w-full justify-between flex p-3 font-mono items-center">
      <div className="">Cocreate</div>
      <div className="flex gap-5 items-center">
        <a href='/explore'>
          Explore

        </a>
        {user && (
          <a href='/createProject'>
            Create
          </a>
        )}
        
        <div className='signout'>
          <Menu as="div" className="relative inline-block text-left">
            <div className='mt-1.5'>
              <Menu.Button className="font-semibold text-gray-900">
                <UserCircleIcon className="h-8 w-8 stroke-1" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {user && (
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href={`/user?id=${userData.id}`}
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          My Projects
                        </a>
                      )}
                    </Menu.Item>
                  )}

                  <Menu.Item>
                      {({ active }) => (
                      <button
                          className={classNames(
                            user ? 'bg-gray-100 text-red-600' : 'text-gray-700',
                          'block w-full px-4 py-2 text-left text-sm'
                          )}
                          onClick={user ? () => handleSignOut() : () => window.location.href = '/login'}
                      >
                          {user ? 'Sign out' : 'Sign in'}
                      </button>
                      )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Navbar;