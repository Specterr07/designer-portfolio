import express from "express";
import Project from "../models/Projects.js";
import authMiddleware from '../middleware/authMiddleware.js'; // <--- Import Guard


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', authMiddleware, async (req, res) => {

    const newProject = new Project({
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image,
        gallery: req.body.gallery,
        liveLink: req.body.liveLink,
        githubLink: req.body.githubLink,
    });

    try {
        const saveProject = await newProject.save();
        res.status(201).json(saveProject);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});


router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            await project.deleteOne();
            res.json({message: "Project removed"});
        } else {
            res.status(404).json({message: "Project not found"});
        }
    } catch(error) {
        res.status(500).json({message: error.message});
    } 
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id); //storing the project from DB here using the id.

        if (project) {
            project.title = req.body.title || project.title;
            project.shortDescription = req.body.shortDescription || project.shortDescription;
            project.description = req.body.description || project.description;
            project.gallery = req.body.gallery || project.gallery;
            project.category = req.body.category || project.category;
            project.image = req.body.image || project.image;
            project.liveLink = req.body.liveLink || project.liveLink;
            project.githubLink = req.body.githubLink || project.githubLink;

            const updatedProject = await project.save();
            res.json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;