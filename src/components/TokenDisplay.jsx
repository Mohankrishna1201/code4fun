import { useRef, useEffect } from 'react';
import { useFirebase } from '../context/firebase';


const TokenDisplay = ({ token, setToken }) => {
    const { getUserToken } = useFirebase()
    const tokenRef = useRef(null);
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const userDetails = await getUserToken();
                if (userDetails) {
                    setToken(userDetails);
                    // console.log('Token fetched:', userDetails);
                } else {
                    console.log('No user is logged in.');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchToken();


    }, [getUserToken]);

    const copyToken = () => {
        if (tokenRef.current) {
            navigator.clipboard.writeText(token);
            // Optionally, you can provide user feedback that the token has been copied
            // e.g., showToastMessage("Token copied to clipboard");
        }
    };

    return (


        <div className="w-full p-4 flex flex-col items-center gap-2">
            <label htmlFor="token" className="block text-sm font-bold text-[#2FB9B3] mb-1">Your Token</label>
            <div className="relative flex items-center">
                <div
                    ref={tokenRef}
                    className="p-2 bg-white rounded-md break-all cursor-pointer select-all text-[10px] pr-6"
                    onClick={copyToken}
                >
                    {token}
                </div>
                <button
                    type="button"
                    className="absolute top-1 right-1 px-2 py-1 bg-[#2FB9B3] text-white rounded-md hover:bg-[#36a7a1] focus:outline-none text-[10px]"
                    onClick={copyToken}
                >
                    Copy
                </button>
            </div>
        </div>

    );
};

export default TokenDisplay;
