// method to create task card
const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  const html = `
                <ul class="list-group" id="${id}">
                  <li class="list-group-item">
                    <div class=" d-flex w-100 mt-2 justify-content-between align-items-center " >
                      <h5>${name}</h5>
                      <span class="badge text-dark ">${status}</span>
                    </div>
                    <div class="d-flex w-100 mb-3 justify-content-between">
                      <small>Assigned To: ${assignedTo}</small>
                      <small>Due: ${dueDate}</small>
                    </div>
                    <p>Description: ${description}</p>
                    <p>
                      <button class="edit btn btn-info btn-sm" name="edit">
                        EDIT
                      </button>
                      <button class="delete btn btn-danger btn-sm" name="delete">
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


  render() {
    let tasksHtmlList = [];


    for (let i in this.tasks) {
      let task = this.tasks[i]
      console.log(task)


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
      console.log(taskHtml)
      tasksHtmlList.push(taskHtml);
    }
    //const tasksHtml = tasksHtmlList.join("\n");

    const tasksList = document.querySelector("#task-list");
    tasksList.innerHTML = tasksHtmlList;
  }

}