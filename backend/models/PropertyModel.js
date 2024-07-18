import mongoose from "mongoose";

const GeoLocationSchema=new mongoose.Schema({
    latitude:{
        type:String
    },
    longitude:{
        type:String
    }
},{_id:false})

const HouseRulesSchema=new mongoose.Schema({
    smokingAllowed:{
        type:Boolean,
        required:true,
        default:false
    },
    petAllowed:{
        type:Boolean,
        required:true,
        default:false
    }
},{_id:false})

const FacilitiesSchema=new mongoose.Schema({
    balcony:{
        type:Boolean,
        required:true,
        default:false
    },
    furnished:{
        type:Boolean,
        required:true,
        default:false
    }
},{_id:false})

const PropertySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:false,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    bedRooms:{
        type:Number,
        required:true,
        trim:true
    },
    bathRooms:{
        type:Number,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    propertyType:{
        type:String,
        required:true,
        enum:['house','apartment'],
        default:'house'
    },
    rentType:{
        type:String,
        required:true,
        enum:['whole','sharing','room'],
        default:'room'
    },
    geoLocation:GeoLocationSchema,
    houseRules:HouseRulesSchema,
    facilities:FacilitiesSchema,
    propertyImage:{
        type:[String],
        required:true,
        default:['https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg']
    },
    landlord:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'LandlordModel',
        required:true
    }

},{timestamps:true})

const PropertyModel =mongoose.model('PropertyModel',PropertySchema);

export default PropertyModel;