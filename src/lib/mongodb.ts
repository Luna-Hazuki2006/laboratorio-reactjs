
import mongoose from "mongoose";
declare global {
    var mongoose: any;
}

// ¿Qué le parece todo?
// Ok
// Gracias :3

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}
// Aquí
// Si, el mío, y también estoy también usamos las variables de entorno
// Para más seguridad
async function dbConnect() {
    const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI!;
    
    if (!MONGODB_URI) {
        throw new Error(
            "Please define the MONGODB_URI environment variable inside .env.local",
        );
    }

    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    try {
        console.log(cached);
        
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;