export async function GET() {
    // SIMPLE HARDCODED SOLUTION - always return true for now
    const isAdmin = true;

    return Response.json({
        isAdmin,
        message: 'Admin mode enabled (hardcoded)'
    });
}