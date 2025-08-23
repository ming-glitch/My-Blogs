// app/api/check-admin/route.js
export async function GET() {
    try {
        const isAdmin = process.env.ADMIN_MODE === 'true';

        return Response.json({
            isAdmin,
            message: isAdmin ? 'Admin mode enabled' : 'Admin mode disabled'
        }, {
            // ADD these headers to prevent caching
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });

    } catch (error) {
        return Response.json({
            isAdmin: false,
            error: 'Internal server error'
        }, { status: 500 });
    }
}