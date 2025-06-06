import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

// --- IMPORTANT: Handle your secret key for jose ---
// jose requires the secret to be a Uint8Array.
// process.env.JWT_SECRET comes as a string.
// Ensure process.env.JWT_SECRET is actually set in your .env file
const JWT_SECRET_KEY = process.env.JWT_SECRET || 'your_super_long_and_secret_key_fallback_please_change_me'; // Use a strong fallback for development
const encoder = new TextEncoder();
const ENCODED_JWT_SECRET = encoder.encode(JWT_SECRET_KEY);

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const comparePasswords = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

// Refactored generateToken using jose
export const generateToken = async (user) => { // Make this async
    try {
        const token = await new SignJWT({
            id: user._id,
            email: user.email,
            role: user.role
        })
        .setProtectedHeader({ alg: 'HS256' }) // Use HS256 algorithm
        .setIssuedAt()
        .setExpirationTime('1d') // '1d' for 1 day
        .sign(ENCODED_JWT_SECRET); // Use the encoded secret
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Failed to generate token.");
    }
};



// Refactored verifyToken using jose
export const verifyToken = async (token) => { // Make this async
    console.log('🔑 Token received for verification:', token); // add this line

    try {
        console.log("Token to verify:", token);
        const { payload } = await jwtVerify(token, ENCODED_JWT_SECRET, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        // Log the actual error for debugging
        console.error("Token verification failed:", error);
        // Handle specific JOSE errors
        if (error.code === 'ERR_JWT_EXPIRED') {
            throw new Error('Token expired');
        }
        if (error.code === 'ERR_JWS_INVALID') {
            throw new Error('Invalid token signature');
        }
        throw new Error('Invalid token'); // Generic error for other issues
    }
};

export const generateVerificationToken = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};