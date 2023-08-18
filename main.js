let taskinp = document.querySelector(".taskinp");
let taskcontainer = document.querySelector(".task-container");
let taskcountshower = document.querySelector(".counter");
let tabs = document.querySelectorAll(".tab");
let clearcomp = document.querySelector(".clear-com");
let toggletheme = document.querySelector(".theme-toggle");
let header = document.querySelector(".header");
let taskCon = document.querySelector(".task-container");
let contentFrom = document.querySelector(".content-form");





let counter = 0;
let taskcounter = "0 items left";

toggletheme.onclick = () => {
    body.classList.toggle("bg-light");
    header.classList.toggle("light-header");
    taskCon.classList.toggle("light-bg");
    contentFrom.classList.toggle("light-bg");
    taskinp.classList.toggle("light-bg");
    let taskincon = document.querySelectorAll(".task-title");
    let tasksincon = document.querySelectorAll(".task");
    taskincon.forEach((e) => { e.classList.toggle("task-light-title") })
    tasksincon.forEach((i) => { i.classList.toggle("task-border-light") })
}

clearcomp.onclick = () => {
    let taskstoremove = document.querySelectorAll(".task");
    taskstoremove.forEach((t) => {
        if (t.classList.contains("completed")) {
            t.remove();
        }
    })
}

tabs.forEach((e) => {
    e.addEventListener("click", function () {
        let taskstoremove = document.querySelectorAll(".task");
        tabs.forEach((y) => { y.classList.remove("active") })
        switch (e.innerHTML) {
            case "Completed":
                e.classList.add("active");
                taskstoremove.forEach((i) => {
                    if (!i.classList.contains("completed")) {
                        i.style.display = "none";
                    }
                })
                break;
            case "All":
                e.classList.add("active");
                taskstoremove.forEach((t) => {
                    t.classList.add("show-task");
                })
            case "Active":
                e.classList.add("active");
                taskstoremove.forEach((t) => {
                    if (t.classList.contains("completed")) {
                        t.style.display = "none";
                    }
                })

            default:
                break;
        }
    })
})

updateCounter = () => {
    const tasks = document.querySelectorAll(".task");
    taskcounter = `${tasks.length} items left`;
    taskcountshower.innerHTML = taskcounter;
}

cancelTask = () => {
    let cancelbtns = document.querySelectorAll(".cancel");
    cancelbtns.forEach((e) => {
        e.addEventListener("click", () => {
            let tasktoremove = document.querySelector(`#task-${e.id}`);
            tasktoremove.style.display = "none";
            tasktoremove = "";
            updateCounter();
        })
    })
};

getradiosbtns = () => {
    let radiobtns = document.querySelectorAll(".cus-radio");

    radiobtns.forEach((e) => {
        e.addEventListener("click", function () {
            let tasktocancel = document.querySelector(`#task-${e.id}-title`);
            tasktocancel.style.textDecoration = "line-through";
            tasktocancel.parentElement.classList.add("completed");
        });
    })
}

taskinp.addEventListener("keyup", function (event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.id = `task-${counter}`;

        const radioElement = document.createElement('input');
        radioElement.type = "radio"
        radioElement.classList.add('cus-radio');
        radioElement.id = `${counter}`


        const titleElement = document.createElement('div');
        titleElement.classList.add('task-title');
        titleElement.innerHTML = taskinp.value;
        titleElement.id = `task-${counter}-title`

        const cancelElement = document.createElement('div');
        cancelElement.id = counter
        const imgelement = document.createElement('img');
        imgelement.src = "./images/icon-cross.svg";
        cancelElement.classList.add('cancel');
        cancelElement.appendChild(imgelement);
        taskElement.appendChild(radioElement);
        taskElement.appendChild(titleElement);
        taskElement.appendChild(cancelElement);
        taskcontainer.appendChild(taskElement);
        taskinp.value = "";
        cancelTask();
        counter += 1;
        updateCounter();
        getradiosbtns();
    }
})
