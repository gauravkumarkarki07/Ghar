import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LandlordModel',
    required: true
  },
  content: {
    type: String,
    required: true
  }
},{timestamps:true,id:false});

const ChatSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TenantModel LandlordModel',
    required: true
  },
  messages: [MessageSchema]
}, { timestamps: true });

const ChatModel = mongoose.model('ChatModel', ChatSchema);
export default ChatModel;
