import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  author: String,
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
