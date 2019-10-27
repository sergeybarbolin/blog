import  mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema(
    {
        title: String,
        text: String
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Post', PostSchema);