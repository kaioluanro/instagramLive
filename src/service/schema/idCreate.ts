import {Schema,model} from "mongoose";

const idData = new Schema({
    name:{type:String, required:true},
    id:{type:String, required:true}
},)

export const Idgenerate = model('Users', idData)