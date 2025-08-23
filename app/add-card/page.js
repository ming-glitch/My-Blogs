import AddCard from '@/components/AddCard';

async function checkAdmin() {
    try {
        const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/check-admin`, {
            cache: 'no-store'
        });

        if (!response.ok) return false;

        const data = await response.json();
        return data.isAdmin;
    } catch {
        return false;
    }
}

export default async function AddCardPage() {
    const isAdmin = await checkAdmin();

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
                    <p className="text-gray-600">Admin mode is currently disabled.</p>
                </div>
            </div>
        );
    }

    return <AddCard />;
}