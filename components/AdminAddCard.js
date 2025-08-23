'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminAddCard() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/check-admin');

                if (!response.ok) {
                    throw new Error('Failed to check admin status');
                }

                const data = await response.json();
                setIsAdmin(data.isAdmin);

            } catch (error) {
                console.error('Error checking admin status:', error);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, []);

    // Show loading state
    if (loading) {
        return (
            <div className="relative group rounded-lg overflow-hidden shadow-md border-2 border-dashed border-gray-300 w-78 opacity-50">
                <div className="relative h-full min-h-[12rem] bg-gray-50 flex flex-col items-center justify-center gap-2 p-4">
                    <div className="animate-pulse bg-gray-200 w-16 h-16 rounded-full"></div>
                    <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
                </div>
            </div>
        );
    }

    // Show nothing if not admin
    if (!isAdmin) return null;

    // Show admin card if admin mode is enabled
    return (
        <div className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-2 border-dashed border-gray-300 w-78 hover:border-blue-400">
            <Link
                href="/add-card"
                className="block w-full h-full"
            >
                <div className="relative h-full min-h-[12rem] bg-gray-50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-50 transition-colors duration-300 p-4">
                    <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 group-hover:scale-110">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <span className="text-gray-600 group-hover:text-blue-600 font-medium">
                        Add New Project
                    </span>
                </div>
            </Link>
        </div>
    );
}