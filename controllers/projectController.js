const projects = require('../models/projectModel')

//add project
exports.addProjectController = async (req, res) => {
    console.log("Inside Add project function");
    const { title, languages, overview, github, website } = req.body
    const userId = req.payload
    const projectImg = req.file.filename
    console.log(title, languages, overview, github, website, userId, projectImg);
    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(406).json("Project already exist in our database...Add another one!!")
        } else {
            const newProject = new projects({
                title, languages, overview, github, website, projectImg, userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

//home project
exports.getHomeProjects = async (req, res) => {
    console.log("Inside getHomeProjects");
    try {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

//all projects
exports.allProjectsController = async (req, res) => {
    console.log("Inside allProjects");
    try {
        const allProjects = await projects.find()
        res.status(200).json(allProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

//user projects
exports.getuserProjectsController = async (req, res) => {
    console.log("Inside getuserProjectsController");
    const userId = req.payload
    try {
        const userProjects = await projects.find(userId)
        res.status(200).json(userProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}