const input = document.getElementById("taskInput")
const button = document.getElementById("addBtn")
const taskList = document.getElementById("taskList")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []
const totalTasks = document.getElementById("totalTasks")
const completedTasks = document.getElementById("completedTasks")
const pendingTasks = document.getElementById("pendingTasks")
const clearCompletedBtn = document.getElementById("clearCompletedBtn")

//carregar tarefas ao abrir a página
window.onload = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"))

    if(savedTasks){
        tasks = savedTasks 
        tasks.forEach(task => {
            createTask(task)
        })
    }
    updateCounter()
}

button.addEventListener("click", addTask)
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask()
    }
})

clearCompletedBtn.addEventListener("click",clearCompleted)

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

    updateCounter()

    createTask(task)

    input.value = ""
}

    function createTask(task){
        
    const li = document.createElement("li")

        li.innerHTML = `
        ${task.text}
        <button class="deleteBtn">Excluir</button>
    `
        li.addEventListener("dblclick", () => {
        const novoTexto = prompt("Editar tarefa:", task.text)
        if(novoTexto === null || novoTexto.trim() === ""){
            return
        }
        task.text = novoTexto.trim()

        tasks = tasks.map(t => {
            if(t.id === task.id){
                return task
            }
            return t
        })
        localStorage.setItem("tasks", JSON.stringify(tasks))
        li.childNodes[0].textContent = `${task.text}`
    })
    
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
        updateCounter()
    })

    const deleteBtn = li.querySelector(".deleteBtn")

deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    li.remove()

    //remove do array pelo ID (CORRETO)
    tasks = tasks.filter(t => t.id !== task.id)
    localStorage.setItem("tasks", JSON.stringify(tasks))

    updateCounter()
})

    taskList.appendChild(li)
}

function updateCounter() {
    const total = tasks.length
    const completed = tasks.filter(task => task.completed).length
    const pending = total - completed

    totalTasks.textContent = total
    completedTasks.textContent = completed
    pendingTasks.textContent = pending
}

function clearCompleted(){
    tasks = tasks.filter(task => !task.completed)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    taskList.innerHTML = ""
    tasks.forEach(task => {
        createTask(task)
    })
    updateCounter()
}