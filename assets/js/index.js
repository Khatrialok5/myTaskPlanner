
// Initialize a new TaskManager with currentId set to 0
const taskManager = new TaskManager(0);
taskManager.load()
taskManager.render()

//Dispaly of today date on the index.html
const todayDate = new Date().toLocaleDateString()
var dateDisplay = document.querySelector('#dateDisplay')
let span = document.createElement("SPAN");
span.innerHTML = todayDate
dateDisplay.appendChild(span)

// Select the New Task Form
const form = document.querySelector("#newTaskForm");

// Select the inputs
const validateName = document.querySelector("#newTaskNameInput");
const validateDescription = document.querySelector("#newTaskDescription");
const validate_AssignedTo = document.querySelector("#newTask-AssignedTo");
const validateDueDate = document.querySelector("#newTaskDueDate");
const validateStatus = document.querySelector("#status");
// Add an 'onsubmit' event listener
form.addEventListener("submit", (event) => {

  // Prevent default action
  event.preventDefault();


  let validationFail = 0;


  //   event.stopPropagation();



  console.log("Task Name :" + validateName.value.length);
  console.log("Task Description :" + validateDescription.value.length);
  console.log("Task Assigned To :" + validate_AssignedTo.value.length);
  console.log("Task Due Date :" + validateDueDate.value);
  console.log("Task Status:" + validateStatus.value);

  // Form validation for Task Name Field min length 5
  if (validateName.value.length > 5) {
    validateName.classList.add("is-valid");
    validateName.classList.remove("is-invalid");
  } else {
    validateName.classList.add("is-invalid");
    validateName.classList.remove("is-valid");
    validationFail++;
  }

  // Form validation for Task Description Field min length 5
  if (validateDescription.value.length > 5) {
    validateDescription.classList.add("is-valid");
    validateDescription.classList.remove("is-invalid");
  } else {
    validateDescription.classList.add("is-invalid");
    validateDescription.classList.remove("is-valid");
    validationFail++;
  }

  // Form validation for Task Assigned Field min length 5
  if (validate_AssignedTo.value.length > 5) {
    console.log("valid" + validate_AssignedTo.value.length)
    validate_AssignedTo.classList.add("is-valid");
    validate_AssignedTo.classList.remove("is-invalid");
  } else {
    console.log("invalid" + validate_AssignedTo.value.length)
    validate_AssignedTo.classList.add("is-invalid");
    validate_AssignedTo.classList.remove("is-valid");
    validationFail++;
  }
  // Form validation for Due Date Field not empty
  // try your own validation for a date in the future
  if (Date.now() < Date.parse(validateDueDate.value)) {
    validateDueDate.classList.add("is-valid");
    validateDueDate.classList.remove("is-invalid");
  } else {
    validateDueDate.classList.add("is-invalid");
    validateDueDate.classList.remove("is-valid");
    validationFail++;
  }
  // Form validation for Task Status Field not empty
  if (validateStatus.value) {
    validateStatus.classList.add("is-valid");
    validateStatus.classList.remove("is-invalid");
  } else {
    validateStatus.classList.add("is-invalid");
    validateStatus.classList.remove("is-valid");
    validationFail++;
  }
  // If validation fails then function will not proceed further and
  // will return. The value of validationFail will also needed to be
  // reset to 0.
  // ----------------------------------------------------------------------------------
  if (validationFail > 0) {
    validationFail = 0;
    return;
  } else {
    taskManager.addTask(
      validateName.value,
      validateDescription.value,
      validate_AssignedTo.value,
      validateDueDate.value,
      validateStatus.value
    );
    clearFormFields();
    taskManager.render();
    taskManager.save();
  }
});


// Call this to clear all the form fields after the submission

const clearFormFields = () => {
  validateName.value = "";
  validateDescription.value = "";
  validate_AssignedTo.value = "";
  validateStatus.value = "IN PROGRESS";
  validateDueDate.value = "";
  validateName.classList.remove("is-valid");
  validateDescription.classList.remove("is-valid");
  validate_AssignedTo.classList.remove("is-valid");
  validateStatus.classList.remove("is-valid");
  validateDueDate.classList.remove("is-valid");
}


const tasksList = document.querySelector("#task-list")

tasksList.addEventListener('click', (event) => { // "event" here is the event parameter
  if (event.target.classList.contains("done-button")) {
    const parentTask = event.target.parentElement.parentElement.parentElement
    // console.log(parentTask)
    const taskId = (parentTask.dataset.taskId)
    // console.log("taskIID: "+taskId)
    const task = taskManager.getTaskById(taskId)
    console.log(task)
    task.status = "DONE"
    taskManager.render()
    taskManager.save()


  }
})
tasksList.addEventListener('click', (event) => { // "event" here is the event parameter
  if (event.target.classList.contains("delete-button")) {
    const parentTask = event.target.parentElement.parentElement.parentElement
    // console.log(parentTask)
    const taskId = (parentTask.dataset.taskId)
    //console.log("taskIID: " + taskId)
    const task = taskManager.getTaskById(taskId)
    //console.log(task)
    taskManager.deleteTask(taskId)
    taskManager.save()
    taskManager.render()



  }

})