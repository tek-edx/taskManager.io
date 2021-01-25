class TaskManager {
  constructor() {
    this.tasks = [];
    // this.currentId  ;
  }
  // the addTask method

  addTask(tId, tName, tAssignedTo, tDescription, tDueDate, tStatus) {
    const task = {
      // the currentId property

      id: tId,
      name: tName,
      dueDate: tDueDate,
      assignedTo: tAssignedTo,
      description: tDescription,
      status: tStatus,
    };
    this.tasks.push(task);
  }

  /*  All the function inside the block are working for the  this.task array */
  //
  //
  // Function to return the index number for the "this.tasks " array
  getCartTaskIndex(taskId) {
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id == taskId) {
        return i;
      }
    }
  }

  // Function to  remove the the task from the "this.tasks array"

  getCartDelete(index) {
    console.log(`i am inside deltele`);
    this.tasks.splice(index, 1);
    if (this.tasks.length < 1) {
      document.location.reload(true);
    }
  }

  // Function to unload the local storage tasks previous task

  unloadCartStorage() {
    let oldTasks = [];
    oldTasks = JSON.parse(localStorage.getItem("cartStorage")) || [];
    //localStorage.removeItem('cartStorage');
    this.loadTask(oldTasks);

    oldTasks = [];
  }

  // Function to push new tasks to oldTasks array

  loadTask(oldTasks) {
    console.log(`i am inside settime out`);
    console.log(oldTasks);

    oldTasks.forEach((task) => {
      this.tasks.push(task);
    });
    console.log(`i am inside laod task`);

    console.log(this.tasks);
  }

  //Function to save tasks to the local storage for tasks array

  setCartStorage() {
    localStorage.setItem("cartStorage", JSON.stringify(this.tasks));

    console.log(localStorage);
  }

  //////////////////////////////* Block of function working on this.task or cart storgae ended */////////////////

  ////////////////////* Block for the functions working with  dash storage  started *//////////////////////////

  //
  //

  // Function to get task index in the dash memory

  //function to return  the dash memory array

  getDashMemory() {
    let unloadDashMemory = JSON.parse(localStorage.getItem("dashStorage"));
    return unloadDashMemory;
  }

  //Function to load the task into dash memory

  setDashMemory() {
    localStorage.setItem("dashStorage", JSON.stringify(unloadDashMemory));
  }

  getDashTaskIndex(taskId) {
    console.log(`This is dashTask id ${taskId}`);
    let unloadDashMemory = JSON.parse(localStorage.getItem("dashStorage"));
    for (let i = 0; i < unloadDashMemory.length; i++) {
      const task = unloadDashMemory[i];
      if (task.id == taskId) {
        return i;
      }
    }
  }

  // Function to return the object from the dashstorage

  getTask(index) {
    let unloadDashMemory = this.getDashMemory();
    return unloadDashMemory[index];
  }

  /*  function to edit the task properties start */

  setTaskName(editName, index) {
    let unloadDashMemory = this.getDashMemory();
    
    unloadDashMemory[index].name = editName;
    
    localStorage.setItem('dashStorage',JSON.stringify(unloadDashMemory));
    
  }

  setTaskDescription(editTaskDescription, index) {
    let unloadDashMemory = this.getDashMemory();
    unloadDashMemory[index].description = editTaskDescription;
    localStorage.setItem('dashStorage', JSON.stringify(unloadDashMemory));
  }
  setTaskAssignedTo(editAssignee, index) {
    let unloadDashMemory = this.getDashMemory();
    unloadDashMemory[index].assignedTo = editAssignee;
    localStorage.setItem('dashStorage', JSON.stringify(unloadDashMemory));
  }
  setTaskStatus(editStatus, index) {
    let unloadDashMemory = this.getDashMemory();
     
    unloadDashMemory[index].status = editStatus;
    localStorage.setItem('dashStorage', JSON.stringify(unloadDashMemory));
  }
  setTaskDueDate(editDate, index) {
    let unloadDashMemory = this.getDashMemory();
    unloadDashMemory[index].dueDate = editDate;
    localStorage.setItem('dashStorage',JSON.stringify(unloadDashMemory));
  }

  //Function to delete the task from the Dash board

  dashTaskDelete(index) {
    let unloadDashMemory = this.getDashMemory();

    unloadDashMemory.splice(index, 1);

    localStorage.setItem("dashStorage", JSON.stringify(unloadDashMemory));
  }

  /*  function to edit the task properties end */

  // function to edit the task properties end

  setStatusForDone(objectIndex) {
    let unloadDashMemory = this.getDashMemory();
    const objectSelect = unloadDashMemory[objectIndex];
    objectSelect.status = "DONE";
    localStorage.setItem("dashStorage", JSON.stringify(unloadDashMemory));
   
    
  }

  //
  //

  // Function to set the status bar for the tasks

  setProgressBar(progressBarId, statusInput) {
    console.log(progressBarId);
    console.log(statusInput);

    const progressBarIdTimeout = progressBarId;
    const statusTimeout = statusInput;
    setTimeout(() => {
      console.log(progressBarIdTimeout);
      console.log(statusTimeout);

      const progressBar = document.querySelector("#" + progressBarIdTimeout);

      if (statusTimeout == "TO DO") {
        progressBar.classList.remove("bg-success", "bg-warning", "bg-info");

        progressBar.classList.add("bg-danger");
        progressBar.style.width = "25%";
      }

      if (statusTimeout == "PROGRESS") {
        progressBar.classList.remove("bg-danger", "bg-success", "bg-info");

        progressBar.classList.add("bg-warning");
        progressBar.style.width = "50%";
      }

      if (statusTimeout == "REVIEW") {
        progressBar.classList.remove("bg-danger", "bg-success", "bg-warning");
        progressBar.classList.add("bg-info");
        progressBar.style.width = "70%";
      }

      if (statusTimeout == "DONE") {
        progressBar.classList.remove("bg-danger", "bg-info", "bg-warning");
        progressBar.classList.add("bg-success");
        progressBar.style.width = "100%";
      }
    }, 0);
  }

  // Function to formate the date

  dueDateFormate(dueDate) {
    const taskdueDate = new Date(dueDate);
    // Format date to be dd/mm/yyyy
    const formattedDate =
      taskdueDate.getDate() +
      "/" +
      (taskdueDate.getMonth() + 1) +
      "/" +
      taskdueDate.getFullYear();

    return formattedDate;
  }

  // function to return the remaining days

  remainingDays(dueDate) {
    let currentDate = new Date();
    const currentDateDay = currentDate.getDate();
    const currentDateMonth = currentDate.getMonth() + 1;
    const currentDateYear = currentDate.getFullYear();
    // }

    // due Date data

    const taskdueDate = new Date(dueDate);

    const dueDateDay = taskdueDate.getDate();
    const dueDateMonth = taskdueDate.getMonth() + 1;
    const dueDateYear = taskdueDate.getFullYear();

    return `${dueDateDay - currentDateDay} Days ${
      dueDateMonth - currentDateMonth
    } Months ${dueDateYear - currentDateYear} Years Remaining`;
  }

  //////////////////////////* Block for the functions working with  dash storage  started */////////////////////////

  setIdToTask() {
    if (localStorage.key("currentIdStore") == null) {
      localStorage.setItem("currentIdStore", JSON.stringify(0));
      return 0;
    } else {
      let nextId = Number(JSON.parse(localStorage.getItem("currentIdStore")));
      nextId++;

      localStorage.setItem("currentIdStore", JSON.stringify(nextId));
      return nextId;
    }
  }

  // Move to dashboard memorty

  moveToDash(itemIndex) {
    let tempDashStore = JSON.parse(localStorage.getItem("dashStorage")) || [];
    console.log(`i am inside move to dash`);
    console.log(this.tasks);
    console.log(itemIndex);

    const dashArray = [];

    console.log(this.tasks[itemIndex]);

    let movedItem = this.tasks[itemIndex];
    // this.getDelete(itemIndex);
    console.log(movedItem);
    tempDashStore.forEach((task) => {
      dashArray.push(task);
    });

    dashArray.push(movedItem);

    localStorage.setItem("dashStorage", JSON.stringify(dashArray));
  }


  priorityToggle() {

    document.querySelector(".priority-div").classList.toggle('.priority-hide');
  }

  render() {
    this.setCartStorage();

    document.querySelector("#task-badge").innerText = JSON.parse(
      localStorage.getItem("cartStorage")
    ).length;

    const cartDisplay = document.querySelector("#cartlist-display");
    let cartHtml;
    cartDisplay.innerHTML = "";

    this.tasks.forEach((task) => {
      cartHtml = "";

      cartHtml = `<li id=${task.id} class= "list-id">
      <div class= "list-inline-item col-9 cart-items-list">  ${task.description}   <button  class="move-to-dash">Move</button> </div>
      
      <button  class = "priority-setting">Priority</button>
      <button  class="delete-cart" >Delete</button>
     
      <div id="priority-div" class="priority-div${task.id}"> this is priority div </div>
     
      
      
       </li>`;

      cartDisplay.innerHTML += cartHtml;
    });
  }
}
