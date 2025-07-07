const fs = require('fs');
const filePath = './tasks.json';

function loadTasks() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// Add task

function addTask(description) {
  const tasks = loadTasks();
  const newTask = {
    id: Date.now(), 
    description,
    completed: false
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log('Task added:', description);
}

// List all tasks

function listTasks() {
  const tasks = loadTasks();
  if (tasks.length === 0) return console.log("No tasks yet.");
  tasks.forEach(task => {
    console.log(`[${task.completed ? 'True' : 'False'}] ${task.id} - ${task.description}`);
  });
}


//Task completed

function completeTask(id) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id == id);
  if (!task) return console.log('Task not found');
  task.completed = true;
  saveTasks(tasks);
  console.log('Task marked as completed.');
}

//Remove task

function removeTask(id) {
  let tasks = loadTasks();
  tasks = tasks.filter(t => t.id != id);
  saveTasks(tasks);
  console.log('Task removed.');
}

//Handle CLI Commands 

const [,, command, ...args] = process.argv;

switch(command) {
  case 'add':
    addTask(args.join(' '));
    break;
  case 'list':
    listTasks();
    break;
  case 'complete':
    completeTask(args[0]);
    break;
  case 'remove':
    removeTask(args[0]);
    break;
  default:
    console.log('Commands: add <description>, list, complete <id>, remove <id>');
}

