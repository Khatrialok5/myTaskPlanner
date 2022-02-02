// method to create html task card
const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  let statusTag
  let buttonTag
  if (status === "DONE") {
    statusTag = `<span class="badge badge-success" style="background-color:green">  ${status}</span>`
    //document.querySelector("#done-button").style.display = "none"
    buttonTag = `<button class="done btn btn-info btn-sm done-button" style="display:none"">
    DONE
  </button>`

  } else {
    statusTag = `<span class="badge text-dark " style="background-color:yellow">${status}</span>`
    buttonTag = `<button class="done btn btn-info btn-sm done-button" id ="done-button" name="done">
    DONE
  </button>`
  }
// html tag
  const html = `
                <ul class="list-group" data-task-id="${id}">
                  <li class="list-group-item">
                    <div class=" d-flex w-100 mt-2 justify-content-between align-items-center " >
                      <h5>${name}</h5>
                      ${statusTag}

                    </div>
                    <div class="d-flex w-100 mb-3 justify-content-between">
                      <small>Assigned To: ${assignedTo}</small>
                      <small >Due: <span style="color:red">${dueDate}</span></small>
                    </div>
                    <p>Description: ${description}</p>
                    <p>
                      ${buttonTag}
                      <button class="delete btn btn-danger btn-sm delete-button" name="delete">
                        DELETE
                      </button>
                    </p>
                  </li>
                </ul>
              `


  return html;
}

//class Task Manager

class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [],
      this.currentId = crypto.randomUUID()
  }
  // method to add new task
  addTask(name, description, assignedTo, dueDate, status) {

    const task = {
      id: crypto.randomUUID(),
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status
    }
    this.tasks.push(
      task
    )
    console.table(this.tasks)
  }


  // to get the task id
  getTaskById(taskId) {
    console.log(taskId)

    // Create a variable to store the found task
    let foundTask
    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      console.log("task in get id:" + task)
      // Check if its the right task by comparing the task's id to the id passed as a parameter
      if (task.id === taskId) {
        console.log("taskid in get id:" + task.id)
        // Store the task in the foundTask variable
        foundTask = task;
      }
    }
    // Return the found task
    return foundTask;

  }


  //saving data in local storage
  save() {
    const tasksJson = JSON.stringify(this.tasks)
    localStorage.setItem("tasks", tasksJson)
    // const currentId = JSON.stringify(this.currentId)
    // localStorage.setItem("currentId", currentId)

  }

  //Loading data from local storage
  load() {
    if (localStorage.getItem("tasks")) {
      const taskJson = localStorage.getItem("tasks")
      this.tasks = JSON.parse(taskJson)
    }
    // if(localStorage.getItem("currentId")){
    //   const currentId = localStorage.getItem("currentId")
    //   this.currentId=Number(currentId)
    // }
  }

  //deleteing a task 

  deleteTask(taskId) {
    const newTasks = []
    for (let i = 0; i < this.tasks.length; i++) {

      const task = this.tasks[i]

      if (task.id !== taskId) {

        newTasks.push(task)

      }

    }
    this.tasks = newTasks
    console.log(this.tasks)

  }

//render function
  render() {
    let tasksHtmlList = [];

    for (let i in this.tasks) {
      let task = this.tasks[i]
      console.log(task)

      const date = new Date(task.dueDate);
      const formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      let taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status
      );
      tasksHtmlList.push(taskHtml);
    }
    const tasksHtml = tasksHtmlList.join("\n<br>");

    const tasksList = document.querySelector("#task-list");
    tasksList.innerHTML = tasksHtml;
  }

}