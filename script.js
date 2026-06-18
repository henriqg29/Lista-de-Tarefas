const input = document.getElementById("taskInput")
const button = document.getElementById("addBtn")
const taskList = document.getElementById("taskList")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

//carregar tarefas ao abrir a página
window.onload = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"))

    if(savedTasks){
        tasks = savedTasks 
        tasks.forEach(task => {
            createTask(task)
        })
    }
}

button.addEventListener("click", addTask)

function addTask() {

    const taskText = input.value.trim()

    if (taskText === "") {
        alert("Digite uma tarefa!")
        return
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    }

    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks))

    createTask(task)

    input.value = ""
}

    function createTask(task){
    const li = document.createElement("li")

        li.innerHTML = `
        ${task.text}
        <button class="deleteBtn">Excluir</button>
    `
    //se já estiver concluída, aplica visual
    if(task.completed){
        li.classList.add("completed")
    }

    // marcar como concluída + salvar estado
    li.addEventListener("click", () => {
        li.classList.toggle("completed")

        tasks = tasks.map(t => {
            if(t.id === task.id){
                return{...t, completed: !t.completed}
            }
            return t
        })
        localStorage.setItem("tasks", JSON.stringify(tasks))
    })

    const deleteBtn = li.querySelector(".deleteBtn")

deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    li.remove()

    //remove do array pelo ID (CORRETO)
    tasks = tasks.filter(t => t.id !== task.id)
    localStorage.setItem("tasks", JSON.stringify(tasks))
})

    taskList.appendChild(li)
}