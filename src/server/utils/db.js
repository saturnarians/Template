import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  try {
    if (cached.conn) {
      console.log('Using cached database connection');
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        retryWrites: true,
        ssl: true,
        tls: true,
        family: 4,
      };

      // Remove the 'directConnection' option as it's not supported with SRV URI
      console.log('Establishing new database connection...');
      cached.promise = mongoose.connect(MONGODB_URI, opts)
        .then((mongoose) => {
          console.log('Successfully connected to MongoDB');
          return mongoose;
        })
        .catch((err) => {
          console.error('MongoDB connection error:', err);
          cached.promise = null;
          throw err;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error('Database connection failed:', error);
    cached.promise = null;
    throw error;
  }
}

export default connectDB;
