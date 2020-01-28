const express = require('express');
const server = express();

server.use(express.json());

const projects =[];

//Middleware para verificar se o projeto existe 
function checkProjectExist(req,res,next){
  const { id } = req.params;
  const project = projects.find(c=>c.id == id);

  if(!project){
    return res.status(400).json({erro:'Project not found'});
  }

  return next();
}

  //Middleware que da log no numero de requisições
function logRequest(req,res,next){
    console.count("Numero de requisições");
    return next();
  }


//LISTA TODOS
server.get('/projects',(req,res)=>{
  return res.json(projects);
});

//CREATE
server.post('/projects',(req,res)=>{
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

//Edit
server.put('/projects/:id', checkProjectExist, (req,res)=>{
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

//Delete
server.delete('/projects/:id', checkProjectExist, (req,res)=>{
  const { id } = req.params;
  const projectIndex = projects.findIndex(c=>c.id == id);
  projects.splice(projectIndex, 1);
  return res.send();
});

server.post('/project/:id/task', checkProjectExist, (req,res)=>{
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(c=> c.id == id);
  project.tasks.push(title);
  return res.json(project);
})



server.listen(8080);