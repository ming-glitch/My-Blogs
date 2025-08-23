export async function GET() {
    try {
        // Simple environment variable check
        const isAdmin = process.env.ADMIN_MODE === 'true';

        return Response.json({
            isAdmin,
            message: isAdmin ? 'Admin mode enabled' : 'Admin mode disabled'
        });

    } catch (error) {
        return Response.json({
            isAdmin: false,
            error: 'Internal server error'
        }, { status: 500 });
    }
}