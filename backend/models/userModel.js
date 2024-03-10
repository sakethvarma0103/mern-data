
import mongoose from "mongoose";

const userschema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,requied:true,unique:true},
    age:{type:Number,required:true}
}
,
{
    timestamps: true  // Saves createdAt and updatedAt as dates. Creates them in ISO 8601 format yyyy-mm-ddTHH:MM
}
);
const User=mongoose.model("User",userschema);

export default User;
