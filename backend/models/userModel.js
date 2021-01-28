import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },


}, {
    timestamps: true,
})

// Bcrypt to match the password with database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    // When on editing page you still want them to be logged in
    if (!this.isModified('password')) {
        next()
    }
    // We are salting and hashing the password for bcrypt
    const salt = await bcrypt.genSalt(10)
    // Setting plain text password to the hashed password.
    this.password = await bcrypt.hash(this.password, salt)
})



const User = mongoose.model('User', userSchema)

export default User