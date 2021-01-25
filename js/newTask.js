const taskManager = new TaskManager();

let editTaskIndex;
const newtaskForm = document.querySelector("#formId");
const msgDisplay = document.querySelector("#alertmessage");
msgDisplay.style.display = "none";

const taskName = document.querySelector("#newTaskName");
const taskDescription = document.querySelector("#newTaskDescription");
const taskAssignedTo = document.querySelector("#assignedTo");
const taskStatus = document.querySelector("#status");
const taskDueDate = document.querySelector("#taskDueDate");


// Event handler to listen the submit event from the newwtask html page
newtaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    

    msgDisplay.innerHTML = "";

    let vnc = validateInputs(taskName);
    let vddc = validateInputs(taskDueDate);
    let vac = validateInputs(taskAssignedTo);
    let vsc = validateInputs(taskStatus);
    let vdc = validateInputs(taskDescription);

    let taskFilterResult = taskFilterPush(vnc, vddc, vac, vdc);

    if (!(taskFilterResult == false)) {
        msgDisplay.style.display = "none";
        taskInputRefresh(taskName, taskDescription, taskAssignedTo, taskDueDate);

        location.reload();
        taskManager.render();
    }
});

// function to check the data for empty string and null value and return false if it is

function validateInputs(data) {
    let dataValue = data.value;
    let errorMsg;

    if (dataValue.trim() == "" || dataValue == null) {
        msgDisplay.style.display = "block";
        errorMsg = document.createElement("div");
        errorMsg.innerHTML = `${data.name.toUpperCase()} CANNOT BE EMPTY`;
        msgDisplay.appendChild(errorMsg);
        return false;
    }
}

// Function to add the task to the task array ( in taskManager js )
function taskFilterPush(vnc, vddc, vac, vdc) {
    let tId = taskManager.setIdToTask();

    console.log(` I am new ${tId}`);
    if (
        !(vnc == false) &&
        !(vddc == false) &&
        !(vac == false) &&
        !(vdc == false)
    ) {
        taskManager.addTask(
            tId,
            taskName.value,
            taskAssignedTo.value,
            taskDescription.value,
            taskDueDate.value,
            taskStatus.value
        );
    } else {
        return false;
    }
}

// Function to clear the input field after the submit button is pressed

function taskInputRefresh(
    taskName,
    taskDescription,
    taskAssignedTo,
    taskDueDate
) {
    taskName.value = "";
    taskDescription.value = "";
    taskAssignedTo.value = "";
    taskDueDate.value = "";
}


const taskList = document.querySelector('#carttask-list');

taskList.addEventListener('click',() => {
  taskManager.render();
})




//Click handler function to handle the cart list items 

    

let cartItemHandler = (e) => {

     e.preventDefault();
    console.log(e.target.parentElement.parentElement)
  
        const taskId = e.target.parentElement.id;
        console.log(taskId);
       //  e.stopPropagation();
        const indexOfItem = taskManager.getCartTaskIndex(taskId);
        console.log(indexOfItem);
    
   
    
    
    if(e.target.matches('.priority-setting'+taskId)){
        const priorityElement = document.querySelector('#priority-div'+taskId);
        priorityElement.classList.toggle('priority-div');
       
       
    };

    if(e.target.matches('.delete-cart')){
        
        
        console.log(`Inside Delete ${indexOfItem}`);

        taskManager.getCartDelete(indexOfItem);
        taskManager.render();

    }

    if(e.target.matches('.move-to-dash')){

        console.log(e.target.parentElement.parentElement.id);
        let movedItemId = e.target.parentElement.parentElement.id;

        let movedItemIndex = taskManager.getCartTaskIndex(movedItemId);

        taskManager.moveToDash(movedItemIndex);
        taskManager.getCartDelete(movedItemIndex)
        taskManager.render();

    }

   }

const cartList = document.querySelector('#cartlist-display');

cartList.addEventListener("click", cartItemHandler);


// const idAttach = document.querySelector(".list-id");
// idAttach.addEventListener('click',(e) => {
//     console.log(e);
// })

//Function to toggle the priority div 
setInterval(() => {

 //  document.querySelector("#priority-setting").addEventListener('click', () => {
        
        taskManager.priorityToggle();
    
});
}, 0);



window.addEventListener('load', () => {
    taskManager.unloadCartStorage();

    // taskManager.setCartStorage();
    taskManager.render();
});