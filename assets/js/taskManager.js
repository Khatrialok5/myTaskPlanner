// method to create task card
const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
let statustag
  if (status === "DONE")
  {
    statustag= `<span class="badge badge-success" style="background-color:green">  ${status}</span>`
    document.querySelector("#done-button").style.display="none"
   
  }else{
      statustag = `<span class="badge text-dark " style="background-color:yellow">${status}</span>`
    
  }

  const html = `
                <ul class="list-group" data-task-id="${id}">
                  <li class="list-group-item">
                    <div class=" d-flex w-100 mt-2 justify-content-between align-items-center " >
                      <h5>${name}</h5>
                      ${statustag}

                    </div>
                    <div class="d-flex w-100 mb-3 justify-content-between">
                      <small>Assigned To: ${assignedTo}</small>
                      <small>Due: ${dueDate}</small>
                    </div>
                    <p>Description: ${description}</p>
                    <p>
                      <button class="done btn btn-info btn-sm done-button" id ="done-button" name="done">
                        DONE
                      </button>
                      <button class="delete btn btn-danger btn-sm delete-button" name="delete">
                        DELETE
                      </button>
                    </p>
                  </li>
                </ul>
              `


  return html;
}


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
    this.tasks.push({
      task
    })
    console.table(this.tasks)
  }

  getTaskById(taskId){
    console.log(taskId)

    // Create a variable to store the found task
    let foundTask
    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      console.log("task in get id:" +task)
      // Check if its the right task by comparing the task's id to the id passed as a parameter
      if (task.task.id === taskId) {
        console.log("taskid in get id:" +task.task.id)
        // Store the task in the foundTask variable
        foundTask = task;
      }
    }
    // Return the found task
    return foundTask;

  }


  render() {
    let tasksHtmlList = [];


    for (let i in this.tasks) {
      let task = this.tasks[i]


      const date = new Date(task.task.dueDate);
      const formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      let taskHtml = createTaskHtml(
        task.task.id,
        task.task.name,
        task.task.description,
        task.task.assignedTo,
        formattedDate,
        task.task.status
      );
      tasksHtmlList.push(taskHtml);
    }
    //const tasksHtml = tasksHtmlList.join("\n");

    const tasksList = document.querySelector("#task-list");
    tasksList.innerHTML = tasksHtmlList;
  }

}