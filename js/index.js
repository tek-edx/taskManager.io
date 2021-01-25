const taskManager = new TaskManager();

let editTaskIndex;

let unloadDashMemory;

function unloadDashStorage() {
  unloadDashMemory = taskManager.getDashMemory("dashStorage");
}

unloadDashStorage();

//let unloadDashMemory = taskManager.getDashMemory('dashStorage');
// getting  tasks form dashboard memory

//Function to return the unload Dash Memory array

// Click handler to handle the event on card

const clickHandler = (e) => {
  //e.preventDefault();

  const indexOfItem = taskManager.getDashTaskIndex(
    e.target.parentElement.parentElement.parentElement.parentElement.id
  );

  console.log(indexOfItem);

  editTaskIndex = indexOfItem;

  if (e.target.matches(".delete-button")) {
    taskManager.dashTaskDelete(indexOfItem);
    unloadDashStorage();
    //location.reload();
    renderDash();
  }

  if (e.target.matches(".done-button")) {
    taskManager.setStatusForDone(indexOfItem);
    unloadDashStorage();

    //location.reload();
    renderDash();
  }

  if (e.target.matches(".edit-button")) {
    let returnTask = taskManager.getTask(indexOfItem);

    console.log(returnTask);

    const taskName = document.querySelector("#editTaskName");
    const taskDescription = document.querySelector("#editTaskDescription");
    const taskAssignedTo = document.querySelector("#editAssignedTo");
    const taskStatus = document.querySelector("#editStatus");
    const taskDueDate = document.querySelector("#editTaskDueDate");

    taskName.value = returnTask.name;
    taskDescription.value = returnTask.description;
    taskAssignedTo.value = returnTask.assignedTo;
    taskStatus.value = returnTask.status;
    taskDueDate.value = returnTask.dueDate;
  }
};

//Function declaration to event handle the Mark as done click to change the status

// Selecting the parent element of the list
const dashpageEvents = document.querySelector("#taskDisplayList");

// Adding event listener to the parent element which grab any event on the children by event delegation
dashpageEvents.addEventListener("click", clickHandler);

//Adding event handler to the edit submit button

const editSubmitButton = document.querySelector("#edit-submit");

// Event to handle the activites to the edit button and display the data

editSubmitButton.addEventListener("click", (e) => {
  console.log(`I am inside edit submit button`);
  console.log(e);
  const taskName = document.querySelector("#editTaskName");
  const taskDescription = document.querySelector("#editTaskDescription");
  const taskAssignedTo = document.querySelector("#editAssignedTo");
  const taskStatus = document.querySelector("#editStatus");
  const taskDueDate = document.querySelector("#editTaskDueDate");

  console.log(taskName.value);
  console.log(editTaskIndex);
  taskManager.setTaskName(taskName.value, editTaskIndex);
  taskManager.setTaskDescription(taskDescription.value, editTaskIndex);
  taskManager.setTaskAssignedTo(taskAssignedTo.value, editTaskIndex);
  taskManager.setTaskStatus(taskStatus.value, editTaskIndex);
  taskManager.setTaskDueDate(taskDueDate.value, editTaskIndex);
  //location.reload();
  unloadDashStorage();
  renderDash();
});

//function to change the list to grid display

document.querySelector(".grid-view").addEventListener("click", () => {
  gridDisplay();
});
document.querySelector(".list-view").addEventListener("click", () => {
  listDisplay();
});

function gridDisplay() {
  let inlineItems = document.querySelectorAll(".list-inline-item");

  inlineItems.forEach((item) => {
    item.classList.add("col-lg-5");
    item.classList.remove("col-lg-10");
  });
}

function listDisplay() {
  let inlineItems = document.querySelectorAll(".list-inline-item");

  inlineItems.forEach((item) => {
    item.classList.add("col-lg-10");
    item.classList.remove("col-lg-4");
  });
}
// Funtion to Render the tasks to the window
//location.reload();

function renderDash() {
  console.log(` i am inside render dash`);

  console.log(unloadDashMemory);

  const newCardPlace = document.querySelector("#taskDisplayList");
  const cardCopy = document.querySelector("#newtaskCard");
  newCardPlace.classList.remove("hidden-list");
  newCardPlace.innerHTML = "";
  //taskManager.setCartStorage();
  unloadDashMemory.forEach((task) => {
    const dueDate = task.dueDate;
    // const formattedDate = taskManager.dueDateFormate(dueDate);
    const remainingDays = taskManager.remainingDays(dueDate);
    const cardCopyClone = cardCopy.cloneNode(true);
    cardCopyClone.children[0].children[0].innerText = `Assigned To:  ${task.assignedTo} `;
    cardCopyClone.children[0].children[1];
    cardCopyClone.children[1].firstElementChild.innerText = `${task.name}`;
    cardCopyClone.children[1].children[1].innerText = `${task.description}`;
    //cardCopyClone.children[1].children[2].innerText = `Status: ${task.status}`;
    const statusBarClone = cardCopyClone.children[1].children[3].children[0];
    statusBarClone.id = `statusbar${task.id}`;
    // cardCopyClone.children[2].children[0].innerText = `Due Date: ${formattedDate} `;

    cardCopyClone.children[2].children[0].innerText = `${remainingDays}  to go`;
    let newLi = document.createElement("li");
    newLi.appendChild(cardCopyClone);
    newLi.className = "list-inline-item ";
    newLi.id = task.id;
    taskManager.setProgressBar(statusBarClone.id, task.status);
    newCardPlace.appendChild(newLi);
  });
}

renderDash();
