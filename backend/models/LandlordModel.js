import mongoose from "mongoose";

const LandlordSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    profilePicture:{
        type:String,
        required:true,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4qdBAfjlSTjoaOGeV22tf8jgUjl_0KvJcTbOBMPWDNNX3r2MetzGgSapJFR0SpCDhCcM&usqp=CAU'
    },
    properties:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'PropertyModel',
    }],

},{timestamps:true})

const LandlordModel=mongoose.model('LandlordModel',LandlordSchema);
export default LandlordModel;