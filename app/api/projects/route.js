// app/api/projects/route.js
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
let cachedClient = null;

async function connectToDatabase() {
    if (cachedClient) return cachedClient;
    const client = await MongoClient.connect(uri);
    cachedClient = client;
    return client;
}

// GET with Pagination
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 6; // Default 6 projects per page

    try {
        const client = await connectToDatabase();
        const collection = client.db().collection('projects');

        const total = await collection.countDocuments();
        const totalPages = Math.ceil(total / limit);

        const projects = await collection.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray();

        return Response.json({
            data: projects,
            pagination: {
                page,
                limit,
                total,
                totalPages
            }
        });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

// POST (Create)
export async function POST(request) {
    try {
        const data = await request.json();
        const client = await connectToDatabase();
        const result = await client.db()
            .collection('projects')
            .insertOne({
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
            });

        return Response.json(result);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

// PUT (Update)
export async function PUT(request) {
    try {
        const { id, ...updateData } = await request.json();
        const client = await connectToDatabase();
        const result = await client.db()
            .collection('projects')
            .updateOne(
                { _id: new ObjectId(id) },
                { $set: { ...updateData, updatedAt: new Date() } }
            );

        return Response.json(result);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

// DELETE
export async function DELETE(request) {
    try {
        const { id } = await request.json();
        const client = await connectToDatabase();
        const result = await client.db()
            .collection('projects')
            .deleteOne({ _id: new ObjectId(id) });

        return Response.json(result);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}