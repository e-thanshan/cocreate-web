import { UserCircleIcon } from '@heroicons/react/24/outline'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

const handleSignOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('signed out')
  }).catch((error) => {
    // An error happened.
    console.error(error);
  });

}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
  return (
    <div className=" bg-white fixed w-full justify-between flex p-3 font-mono items-center">
      <div className="">Cocreate</div>
      <div className="flex gap-5 items-center">
        <a href='/explore'>
          Explore

        </a>
        <a href='/project'>My Projects</a>
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
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Account settings
                      </a>
                    )}
                  </Menu.Item>

                    <Menu.Item>
                        {({ active }) => (
                        <button
                            className={classNames(
                            active ? 'bg-gray-100 text-red-600' : 'text-red-600',
                            'block w-full px-4 py-2 text-left text-sm'
                            )}
                            onClick={handleSignOut}
                        >
                            Sign out
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