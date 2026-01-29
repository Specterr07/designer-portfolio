import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
    title: { type: String, required: [true, 'Please add a project title'], trim: true },
    shortDescription: {type: String,required: true, maxLength: 150 },
    description: { type: String, required: [true, 'Please add a description'] },
    category: { type: String, required: true, enum: ['Editorial', 'Portrait', 'Commercial', 'Film/Video', 'Runway'], default: 'Portrait'},
    image: {type: String, required: [true, 'Please add an image']},
    gallery: {type: [String], default: []},
    liveLink: {type: String},
    githubLink: {type: String},},
    {
        timestamps: true
    }
);

export default mongoose.model('Project', projectSchema);