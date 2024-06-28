import React, { useState } from 'react';
import { useFirebase } from '../context/firebase';

export default function EditProfile({ onClose }) {
    const [name, setName] = useState('');
    const [file, setFile] = useState();
    const firebase = useFirebase();
    const handleProfile = async (e) => {
        e.preventDefault();
        await firebase.handleUpdateProfile(name, file)
        console.log('Updating profile...');
        onClose(); // Close the modal after handling the profile update
        alert('Profile Updated Succesfuly');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-800 bg-opacity-75">
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4 text-[#1c1c1c]">Edit Profile</h3>
                <form className="space-y-4" onSubmit={handleProfile}>
                    <div>
                        <label htmlFor="name" className="block  mb-2 text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your name"
                        />
                        <label htmlFor="name" className=" mt-2 mb-2  block text-sm font-medium text-gray-700">
                            Profile Picture
                        </label>
                        <input
                            className="relative  m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                            type="file"
                            id="formFileMultiple"
                            onChange={(e) => setFile(e.target.files[0])}
                            multiple
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="px-4 py-2 text-sm text-gray-200 bg-[#252525]  hover:bg-gray-700 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="ml-2 px-4 py-2 = font-semibold bg-[#2FB9B3] hover:bg-[#46e6de] rounded text-white"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
