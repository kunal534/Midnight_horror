// lib/database.ts
import mongoose from 'mongoose';
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI is not set in .env.local');
}

const MONGODB_URI: string = uri;
declare global {
  // eslint-disable-next-line no-var
  var mongooseConn: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not set in .env.local');
}

// ensure global.mongooseConn exists
if (!global.mongooseConn) {
  global.mongooseConn = {
    conn: null,
    promise: null,
  };
}

const cached = global.mongooseConn;

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
