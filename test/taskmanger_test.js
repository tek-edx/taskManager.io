// mocha.setup('bdd');
const TaskManager = require('../js/taskManager');
const assert = require('assert');



/* code for testing the add task feature  */
describe("taskManager", () => {
  it("should add a task", function () {
  const taskManager = new TaskManager(0);
  //setup
  let len = taskManager.tasks.length;
  
    //Exercise
    taskManager.addTask();
  
    //Verify
    assert.ok(len < taskManager.tasks.length);
  });


/* code for testing the deleting task  */

  it("should delete a task", function () {
    //Setup
    const taskManager = new TaskManager(0);
    taskManager.tasks[0] = {
      id: 0,
      name: "Make Website",
      description: "task description",
      assignedTo: "Max",
      dueDate: "2021-01-20",
      status: "TODO",
    };
    len = taskManager.tasks.length;
    console.log(len);
    //Exercise
    taskManager.deleteTask(0);
    console.log(taskManager.tasks.length);
    //Verify
    assert.ok(len > taskManager.tasks.length);
  });

/* code for testing the getTaskId() function  */
  it("will check for the task id", () => {
    //setup
    const taskManager = new TaskManager(0);
    taskManager.tasks[0] = { 
      id: 0,
      name: "Make Website",
      description: "task description",
      assignedTo: "Max",
      dueDate: "2021-01-20",
      status: "TODO",
    };
    const taskId = Number(taskManager.currentId);
    //exercise
    const task = taskManager.getTaskId(taskId);

    //verify
    assert.strictEqual(task.id, taskId);

  })



  it("will check for save()", () => {
    //setup
    const taskManager = new TaskManager(0);
    taskManager.tasks[0] = {
      id: 0,
      name: "Make Website",
      description: "task description",
      assignedTo: "Max",
      dueDate: "2021-01-20",
      status: "TODO",

    };
   
    taskManager.save();
    
    let task0 = JSON.parse(localStorage.getItem('tasks'));
    console.log(task0);
    assert.strictEqual(task0[0],taskManager.tasks[0]);
    
    

  })




})
