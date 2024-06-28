import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import EditProfile from '../pages/EditProfile'
import App from '../App'

export default function PopupModal() {
    const [open, setOpen] = useState(true)
    const [name, setName] = useState('');

    const LoginFunction = () => {

    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    };


    return (
        <>
            <Dialog className="relative z-10" open={open} onClose={setOpen}>


                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="mb-3 w-96">
                                    <form className="space-y-6" onSubmit={LoginFunction}>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-[#1c1c1c]">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    type="name"
                                                    required
                                                    className=' pl-2 h-10 block w-full rounded-md border-0 py-1.5 text-[#fefefe] ring-inset bg-[#252525]   placeholder: text-gray-50 focus:ring-2 focus:ring-inset focus:ring-[#2FB9B3] sm:text-sm sm:leading-6'
                                                    value={name}
                                                    onChange={handleNameChange}
                                                    placeholder='Enter your name'
                                                />
                                            </div>
                                        </div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-[#1c1c1c]">
                                            Profile Pic
                                        </label>
                                        <input
                                            className=" relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-black transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-black file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary "
                                            type="file"
                                            id="formFileMultiple"
                                            multiple
                                        />
                                    </form>

                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={() => setOpen(false)}
                                    data-autofocus
                                >
                                    Update
                                </button>
                            </div>
                        </DialogPanel>
                    </div>

                </div>

            </Dialog>

        </>
    )
}
