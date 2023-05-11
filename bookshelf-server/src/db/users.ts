import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
    library: [
        {
            id: { type: String, required: true, unique: true },
            title: { type: String, required: true },
            author: { type: String, required: true },
            description: { type: String },
            imageUrl: { type: String },
            publicationYear: { type: Number },
            rating: {type: Number}
        }
    ]
})

export const UserModel = mongoose.model('User', UserSchema)

// user actions 
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({email})
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
export const addBookToLibrary = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);