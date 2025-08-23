export async function GET() {
    return Response.json({
        adminMode: process.env.ADMIN_MODE,
        nodeEnv: process.env.NODE_ENV,
        vercelUrl: process.env.VERCEL_URL,
        allEnv: Object.keys(process.env).filter(key => key.includes('ADMIN') || key.includes('MODE')),
        timestamp: new Date().toISOString()
    });
}