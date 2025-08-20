import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchData } from '../redux/slices/userSlice'
import dp from '../assets/dp.webp'

let debounceTimeout;

function Search() {
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const { searchData } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleSearch = useCallback(async (searchTerm) => {
        if (!searchTerm) {
            dispatch(setSearchData([]));
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/user/search?keyWord=${searchTerm}`,
                { withCredentials: true }
            );
            dispatch(setSearchData(response.data));
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            handleSearch(input);
        }, 500); // 500ms debounce

        return () => clearTimeout(debounceTimeout);
    }, [input, handleSearch]);

    return (
        <div className="w-full min-h-screen bg-black flex flex-col items-center gap-2 md:gap-5">
            {/* Top Bar */}
            <div className="w-full h-20 flex items-center gap-5 px-5 absolute top-0">
                <MdOutlineKeyboardBackspace
                    onClick={() => navigate("/")}
                    className="text-white w-6 h-6 cursor-pointer"
                />
            </div>

            {/* Search Input */}
            <div className="w-full h-20 flex items-center justify-center mt-12">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="w-[90%] max-w-[800px] h-[80%] rounded-full bg-[#0f1414] flex items-center px-5"
                >
                    <FiSearch className="w-5 h-5 text-white" />
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="Search..."
                        className="w-full h-full outline-none rounded-full px-5 text-white text-lg bg-transparent"
                    />
                </form>
            </div>

            {/* Search Results */}
            <div className="w-full flex flex-col items-center gap-3">
                {input ? (
                    loading ? (
                        <div className="text-white text-lg mt-5"> Searching...</div>
                    ) : searchData?.length > 0 ? (
                        searchData.map((user) => (
                            <div
                                key={user._id}
                                className="w-[90vw] max-w-[700px] h-14 rounded-full bg-white flex items-center gap-5 px-3 hover:bg-gray-200 transition"
                            >
                                <div className="w-12 h-12 border-2 border-black rounded-full overflow-hidden cursor-pointer">
                                    <img
                                        src={user.profileImage || dp}
                                        alt={user.userName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-black text-lg font-semibold">
                                    <div>{user.userName}</div>
                                    <div className="text-sm text-gray-400">{user.name}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-white text-lg ">No users found.</div>
                    )
                ) : (
                    <div className="text-2xl  text-gray-700">Search Here...</div>
                )}
            </div>
        </div>
    );
}

export default Search;
