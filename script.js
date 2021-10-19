window.addEventListener("unload", function () {
    updateList();
})

function Task(title, isChecked) {
    this.title = title;
    this.isChecked = isChecked;
}

let taskList = document.getElementsByTagName("li");
let taskObjects = [];


function updateList() {
    taskList = document.getElementsByTagName("li");
    for (let i = 0; i < taskList.length; i++) {
        let title = taskList[i].getElementsByTagName("span").item(0).innerText;
        let isChecked = taskList[i].getElementsByTagName("span").item(0).classList.contains("complete");
        taskObjects[i] = new Task(title, isChecked);
    }
    localStorage.clear();
    localStorage.setItem("tasks", JSON.stringify(taskObjects));
    taskObjects = [];
}

function loadFromLocalStorage() {
    taskObjects = JSON.parse(localStorage.getItem("tasks")) || [];
    for (let i = 0; i < taskObjects.length; i++) {
        let li = document.createElement("li");
        let labelElement = document.createElement("label");
        let checkboxElement = document.createElement("input");
        let taskName = document.createElement("span");
        let closeBtn = document.createElement("button");
        li.setAttribute("onchange", "checkTask()");
        checkboxElement.type = "checkbox";
        taskName.className = "task";
        taskName.innerText = taskObjects[i].title;
        closeBtn.className = "delete-btn";
        closeBtn.setAttribute("onclick", "removeTask(this)");
        if (taskObjects[i].isChecked) {
            checkboxElement.checked = true;
            taskName.classList.add("complete");
        }
        labelElement.appendChild(checkboxElement);
        labelElement.appendChild(taskName);
        li.appendChild(labelElement);
        li.appendChild(closeBtn);
        document.getElementById("task-list").appendChild(li);
    }
}

function addTask() {
    let li = document.createElement("li");
    li.setAttribute("onchange", "checkTask()");
    let labelElement = document.createElement("label");
    let taskName = document.createElement("span");
    taskName.className = "task";
    let checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    let inputValue = document.getElementById("input-task").value;
    let closeBtn = document.createElement("button");
    closeBtn.className = "delete-btn";
    closeBtn.setAttribute("onclick", "removeTask(this)");
    let t = document.createTextNode(inputValue);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        taskName.appendChild(t);
        labelElement.appendChild(checkboxElement);
        labelElement.appendChild(taskName);
        li.appendChild(labelElement);
        li.appendChild(closeBtn);
        document.getElementById("task-list").appendChild(li);
        document.getElementById("input-task").value = "";
    }
    updateList();

}

function checkTask() {
    for (let i = 0; i < taskList.length; i++) {
        let inputElement = taskList[i].getElementsByTagName("input");
        let taskContainer = taskList[i].getElementsByTagName("span");
        if (inputElement[0].checked) {
            taskContainer[0].classList.add("complete");
        } else if (!inputElement[0].checked) {
            taskContainer[0].classList.remove("complete");
        }
    }
    updateList();

}

function removeTask(task) {
    task.parentElement.remove();
    updateList();
}








