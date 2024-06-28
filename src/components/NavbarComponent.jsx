import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { whiteC, greenC } from '../Colors';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';
import PopupModal from './PopupModal';
import EditProfile from '../pages/EditProfile';





function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function NavbarComponent({ photo, dname }) {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const { isLoggedIn, currentUser } = useFirebase();
    const [navigation, setNavigation] = useState([]);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [profileUrl, setProfileUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        name: 'code4fun',
        email: 'Code4fun@gmail.com',
        imageUrl: 'https://cdn.dribbble.com/userupload/15281012/file/original-18b6e4ae4469cb15d8c5dad00faa4430.png?resize=400x397',
    });
    useEffect(() => {
        setLoading(true);

        if (isLoggedIn && currentUser) {


            setNavigation([
                { name: 'CodeForces', href: '/codeforces', current: false },
                { name: 'Online Compiler', href: '/oc', current: false },
            ]);
            const userUID = currentUser.uid;
            const initialUser = [];

            firebase.getUser().then((users) => {
                const BigParent = users.docs;

                for (let snapshot of BigParent) {
                    // Extract data from QueryDocumentSnapshot objects
                    const user = snapshot.data();

                    // Check if the user has the specified userID
                    if (user.userID === userUID) {
                        console.log(user);
                        initialUser.push(user);
                        break; // Exit the loop once the user is found
                    }
                }

                // Check if the user was found
                if (initialUser.length > 0) {
                    firebase.getImageUrl(initialUser[0].coverPic).then(url => setProfileUrl(url));

                    setUser({
                        name: initialUser[0].userName || currentUser.displayName,
                        email: initialUser[0].userEmail || currentUser.email,
                        imageUrl: `${profileUrl}` || currentUser.photoURL,
                    });
                    console.log(initialUser)
                } else {
                    setUser({
                        name: currentUser.displayName,
                        email: currentUser.email,
                        imageUrl: currentUser.photoURL,
                    });
                    console.log(currentUser.uid)
                }
                setLoading(false);
            });


        } else {
            // Handle when user is not logged in
            setNavigation([]);
        }
    }, [isLoggedIn, currentUser, profileUrl]);

    const handleNavigationClick = (index) => {
        navigation.map((item, idx) => ({
            ...item,
            current: idx === index,
        }));

    };
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await firebase.UserLogout();
            alert('Logged out successfully');
        } catch (error) {
            console.error('Logout failed', error);
        }
        navigate('/');

    };
    const handleProfile = async (e) => {
        e.preventDefault();

    };

    const userNavigation = [
        { name: 'Settings', href: '#' },
    ];


    const openProfileModal = () => {
        setShowProfileModal(true);
    };

    const closeProfileModal = () => {
        setShowProfileModal(false);
    };


    return (
        <div className="min-h-full bg-[#1C1C1C] text-gray-200  border-[#2FB9B3]  border-b-2">
            <Disclosure as="nav">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-12 w-[fit-content]"
                                            src="https://cdn.dribbble.com/userupload/15279276/file/original-0a23bb91b957055e3c02660a504d1785.png?resize=752x295"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item, index) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-[#333333ff] text-white'
                                                            : 'text-gray-300 hover:bg-[#333333ff] hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium',
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                    onClick={() => handleNavigationClick(index)}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <button
                                            type="button"
                                            className="relative rounded-full bg-[#333333ff] p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <MenuButton className="relative flex max-w-xs items-center rounded-full bg-[#333333ff] text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="sr-only">Open user menu</span>
                                                    <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                                                </MenuButton>
                                            </div>
                                            <MenuItems
                                                transition
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#333333ff] py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                                            > <div className="block px-4 py-2 text-sm font-medium leading-none text-white">{user.name}</div>
                                                {userNavigation.map((item) => (
                                                    <MenuItem key={item.name}>
                                                        {({ active }) => (
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    active ? 'bg-[#333333ff]' : '',
                                                                    'block px-4 py-2 text-sm text-gray-200',
                                                                )}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </MenuItem>
                                                ))}
                                                <button
                                                    className="px-4 py-2 text-sm text-gray-200 bg-transparent hover:bg-gray-800 rounded"
                                                    onClick={openProfileModal}
                                                >
                                                    Edit Profile
                                                </button>
                                                {/* Profile Edit Modal */}
                                                {showProfileModal && (
                                                    <EditProfile onClose={closeProfileModal} />
                                                )}
                                                <button className='block px-4 py-2 text-sm text-gray-200'
                                                    onClick={handleLogout}> Log Out</button>


                                            </MenuItems>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-[#333333ff] p-2 text-gray-400 hover:bg-[#333333ff] hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </DisclosureButton>
                                </div>
                            </div>
                        </div>

                        <DisclosurePanel className="md:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                {navigation.map((item, index) => (
                                    <DisclosureButton
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-[#333333ff] text-white' : 'text-gray-300 hover:bg-[#333333ff] hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium',
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                        onClick={() => handleNavigationClick(index)}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                            <div className="border-t border-gray-700 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full object-cover" src={user.imageUrl} alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                        <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                    </div>
                                    <button
                                        type="button"
                                        className="relative ml-auto flex-shrink-0 rounded-full bg-[#333333ff] p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    {userNavigation.map((item) => (
                                        <DisclosureButton
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-[#333333ff] hover:text-white"
                                        >
                                            {item.name}
                                        </DisclosureButton>
                                    ))}
                                </div>
                            </div>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
        </div>
    );
}
