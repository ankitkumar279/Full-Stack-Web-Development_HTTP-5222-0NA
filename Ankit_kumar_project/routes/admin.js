const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Skill = require('../models/Skill');

router.get('/', async (req, res) => {
  const projectCount = await Project.countDocuments();
  const skillCount = await Skill.countDocuments();
  res.render('admin_home', { projectCount, skillCount });
});

router.get('/projects', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.render('admin_projects', { projects });
});

router.get('/projects/new', (req, res) => {
  res.render('form_project', { project: {} });
});

router.get('/projects/:id/edit', async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.render('form_project', { project });
});

router.post('/projects', async (req, res) => {
  const { title, description, tech, link, image } = req.body;
  const techArr = tech ? tech.split(',').map((s) => s.trim()) : [];
  await Project.create({ title, description, tech: techArr, link, image });
  res.redirect('/admin/projects');
});

router.put('/projects/:id', async (req, res) => {
  const { title, description, tech, link, image } = req.body;
  const techArr = tech ? tech.split(',').map((s) => s.trim()) : [];
  await Project.findByIdAndUpdate(req.params.id, {
    title,
    description,
    tech: techArr,
    link,
    image,
  });
  res.redirect('/admin/projects');
});

router.delete('/projects/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/admin/projects');
});

router.get('/skills', async (req, res) => {
  const skills = await Skill.find().sort({ createdAt: -1 });
  res.render('admin_skills', { skills });
});

router.get('/skills/new', (req, res) => {
  res.render('form_skill', { skill: {} });
});


router.get('/skills/:id/edit', async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  res.render('form_skill', { skill });
});

router.post('/skills', async (req, res) => {
  const { name, level, category } = req.body;
  await Skill.create({ name, level, category });
  res.redirect('/admin/skills');
});

router.put('/skills/:id', async (req, res) => {
  const { name, level, category } = req.body;
  await Skill.findByIdAndUpdate(req.params.id, { name, level, category });
  res.redirect('/admin/skills');
});

router.delete('/skills/:id', async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.redirect('/admin/skills');
});

module.exports = router;
