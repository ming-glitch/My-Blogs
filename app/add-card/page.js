import AddCard from '@/components/AddCard';

async function checkAdmin() {
    try {
        // Use relative URL - this works on both localhost and Vercel
        const response = await fetch(`/api/check-admin?t=${Date.now()}`, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache'
            }
        });

        if (!response.ok) {
            console.error('API response error:', response.status);
            return false;
        }

        const data = await response.json();
        console.log('Admin check response:', data);
        return data.isAdmin;
    } catch (error) {
        console.error('Admin check failed:', error);
        return false;
    }
}

export default async function AddCardPage() {
    const isAdmin = await checkAdmin();
    console.log('Is Admin:', isAdmin);

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
                    <p className="text-gray-600">Admin mode is currently disabled.</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Check Vercel environment variables for ADMIN_MODE.
                    </p>
                </div>
            </div>
        );
    }

    return <AddCard />;
}