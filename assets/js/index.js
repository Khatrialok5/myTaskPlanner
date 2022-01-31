// const newTaskNameInput = document.querySelector('#newTaskForm')
// const nameValidation=document.querySelector('#newTaskNameInput')
// const descriptionValidation=document.querySelector('#newTaskDescription')
// const assignedToValidation=document.querySelector('#newTaskAssignedTo')
// const dueDateValidation=document.querySelector('#newTaskDueDate')
// const statusValidation=document.querySelector('#status')
// const submitButton=document.querySelector('#submitBtn')




// submitButton.addEventListener('click', validFormFieldInput)
// // function to validate input in the form

// function validFormFieldInput(){
//     //let title=nameValidation.value
// if(nameValidation.value === "" || nameValidation.value.length < 5){
//     return false
// }else if(descriptionValidation.value === "" || descriptionValidation.value.length < 5){
//     return false
// }else if(assignedToValidation.value === "" || assignedToValidation.value.length < 5){
//     return false
// }else if(!dueDateValidation.value){    //check it once again 
//     return false
// }else if(!statusValidation){
//     return false
// }else{
//     return true
// }


// }



// // reset function
// // const resetBtn=document.querySelector('#resetBtn')
// // resetBtn.addEventListener('click',resetAllInput)
// // function resetAllInput(){
// //     nameValidation.value=""
// //     descriptionValidation.value=""
// //     assignedToValidation.value=""

// // }


// Initialize a new TaskManager with currentId set to 0
const taskManager = new TaskManager(0);


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
const validateAssignedTo = document.querySelector("#newTaskAssignedTo");
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
  console.log("Task Assigned To :" + validateAssignedTo.value.length);
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
  if (validateAssignedTo.value.length > 5) {
    validateAssignedTo.classList.add("is-valid");
    validateAssignedTo.classList.remove("is-invalid");
  } else {
    validateAssignedTo.classList.add("is-invalid");
    validateAssignedTo.classList.remove("is-valid");
    validationFail++;
  }
  // Form validation for Due Date Field not empty
  // try your own validation for a date in the future
  if (validateDueDate.value) {
    validateDueDate.classList.add("is-valid");
    validateDueDate.classList.remove("is-invalid");
  } else {
    validateDueDate.classList.add("is-invalid");
    validateDueDate.classList.remove("is-valid");
    validationFail++;
  }
  // Form validation for Task Status Field not empty
  if (validateAssignedTo.value) {
    validateAssignedTo.classList.add("is-valid");
    validateAssignedTo.classList.remove("is-invalid");
  } else {
    validateAssignedTo.classList.add("is-invalid");
    validateAssignedTo.classList.remove("is-valid");
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
      validateAssignedTo.value,
      validateDueDate.value,
      validateStatus.value
    );
    clearFormFields();
    taskManager.render();
  }
});


  // Call this to clear all the form fields after the submission

const clearFormFields = () => {
  validateName.value = "";
  validateDescription.value = "";
  validateAssignedTo.value = "";
  validateStatus.value = "TO DO";
  validateDueDate.value = "";
  validateName.classList.remove("is-valid");
  validateDescription.classList.remove("is-valid");
  validateAssignedTo.classList.remove("is-valid");
  validateStatus.classList.remove("is-valid");
  validateDueDate.classList.remove("is-valid");
}