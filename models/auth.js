import mongoose from "mongoose";
mongoose.set('strictQuery', false)

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    tags: {type: [String]},
    about: {type: String},
    joinedOn: {type: Date, default: Date.now()}
})

export default mongoose.model("User", userSchema)