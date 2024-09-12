import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useFirebase } from '../context/firebase';
import NavbarComponent from '../components/NavbarComponent';

export default function Login({ onLogIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [img, setImg] = useState('');
    const firebase = useFirebase();
    const navigate = useNavigate()
    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate('/codeforces')
        }

    }, [firebase, navigate])

    const LoginFunction = async (e) => {
        e.preventDefault();
        try {
            const result = await firebase.UserLoginwithEmailandPassword(email, password);
            console.log(result);

            alert(`Logged in with ${email}`);
        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    };
    const LoginGoogleFunction = async (e) => {
        e.preventDefault();
        try {
            const result = await firebase.UserLoginGoogle();
            console.log(result);
            onLogIn(result);
            alert(`Welcome ${result.user.displayName}`);
        } catch (error) {
            console.log(error);

        }
    };
    const ForgotPasswordFunction = async () => {
        if (!email) {
            alert('Please enter your email address.');
            return;
        }
        try {
            await firebase.sendPasswordReset(email);
            alert(`Password reset email sent to ${email}`);
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };

    const LoginFacebookFunction = async (e) => {
        e.preventDefault();
        try {
            const result = await firebase.UserLoginFacebook();
            console.log(result);
            alert(`Welcome ${result.user.displayName}`);
        } catch (error) {
            console.log(error);

        }
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);

    };

    const handlePasswordBlur = () => {
        // Check if the password is less than 8 characters when the user finishes typing
        if (password.length > 0 && password.length < 6) {
            alert('Password must contain at least 6 characters');
        }
    };

    return (
        <>

            <div className="flex min-h-screen bg-[#1c1c1c] h-[fit-content]  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-20 w-auto"
                        src="https://cdn.dribbble.com/userupload/15279276/file/original-0a23bb91b957055e3c02660a504d1785.png?resize=752x295"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#fefefe]">
                        Log in for an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={LoginFunction}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-[#fefefe]">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className=' pl-2 h-10 block w-full rounded-md border-0 py-1.5 text-[#fefefe] ring-inset bg-[#252525]   placeholder: text-gray-50 focus:ring-2 focus:ring-inset focus:ring-[#2FB9B3] sm:text-sm sm:leading-6'
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder='Enter your email'
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-[#fefefe]">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <button onClick={() => ForgotPasswordFunction()} className="font-semibold text-[#2FB9B3] hover:text-[#46e6de]">
                                        Forgot password?
                                    </button>

                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className=' pl-2 h-10 block w-full rounded-md border-0 py-1.5 text-[#fefefe] ring-inset bg-[#252525]   placeholder: text-gray-50 focus:ring-2 focus:ring-inset focus:ring-[#2FB9B3] sm:text-sm sm:leading-6'
                                    placeholder='Enter your password'
                                    value={password}
                                    onChange={handlePasswordChange}
                                    onBlur={handlePasswordBlur}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#2FB9B3] hover:bg-[#46e6de] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={LoginGoogleFunction}
                                className="flex mt-2 w-full items-center justify-center rounded-md bg-[#252525]   hover:bg-[#3c3c3c]   px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                            >
                                <FcGoogle className="mr-2 h-5 w-5" />
                                Login with Google
                            </button>
                        </div>
                    </form>

                    <p className="mt-2 text-center text-sm text-gray-500">
                        Not a Member?{' '}
                        <a href="/" className="font-semibold leading-6 text-[#2FB9B3] hover:text-[#46e6de]">
                            Signup
                        </a>
                    </p>
                    {/* <div className="w-full h-auto py-8 flex items-center justify-center gap-4 flex-wrap">
                        <button onClick={LoginFacebookFunction} className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#252525]  shadow-md  group transition-all duration-300">
                            <svg className="transition-all duration-300 group-hover:scale-110"
                                xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 72 72" fill="none">
                                <path d="M46.4927 38.6403L47.7973 30.3588H39.7611V24.9759C39.7611 22.7114 40.883 20.4987 44.4706 20.4987H48.1756V13.4465C46.018 13.1028 43.8378 12.9168 41.6527 12.8901C35.0385 12.8901 30.7204 16.8626 30.7204 24.0442V30.3588H23.3887V38.6403H30.7204V58.671H39.7611V38.6403H46.4927Z" fill="#337FFF" />
                            </svg>
                        </button>

                        <button onClick={LoginGoogleFunction} className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#252525]  shadow-md  group transition-all duration-300">
                            <svg className="transition-all duration-300 group-hover:scale-110" width="25" height="25" viewBox="0 0 20 20" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill="#4285F4"></path><path d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" fill="#34A853"></path><path d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" fill="#FBBC05"></path><path d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" fill="#EA4335"></path></svg>
                        </button>


                        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#252525]  shadow-md  group transition-all duration-300">
                            <img className="transition-all duration-300 group-hover:scale-110" width="25" height="25" src="//www.gstatic.com/mobilesdk/230906_mobilesdk/github-mark-white.svg" />
                        </button>

                        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#252525]  shadow-md  group transition-all duration-300">
                            <svg className="transition-all duration-300 group-hover:scale-110" width="25" height="25" viewBox="0 0 20 20" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M20 3.924a8.212 8.212 0 01-2.357.646 4.111 4.111 0 001.804-2.27c-.792.47-1.67.812-2.605.996A4.103 4.103 0 009.85 7.038a11.645 11.645 0 01-8.458-4.287 4.118 4.118 0 00-.555 2.066 4.1 4.1 0 001.825 3.415 4.074 4.074 0 01-1.858-.513v.052a4.105 4.105 0 003.29 4.022 4.01 4.01 0 01-1.852.072 4.106 4.106 0 003.833 2.85A8.268 8.268 0 010 16.411a11.602 11.602 0 006.29 1.846c7.547 0 11.674-6.253 11.674-11.675 0-.18-.004-.355-.01-.53.8-.58 1.496-1.3 2.046-2.125" fill="#55ACEE" fill-rule="evenodd"></path></svg>
                        </button>
                    </div> */}
                </div>
            </div>



        </>
    );
}
