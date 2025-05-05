import React from 'react'
import {SearchIcon} from 'lucide-react'

const SearchBar = () => {
    return (
        <div className="bg-white shadow-md p-4 mb-6">
            <div className="container mx-auto">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search events, artists, venues..."
                        className="w-full p-3 rounded-l border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <button className="bg-blue-600 text-white p-3 rounded-r">
                        <SearchIcon className="w-5 h-5" />
                    </button>
                </div>
                {/* Filter options */}
            </div>
        </div>
    )
}

export default SearchBar