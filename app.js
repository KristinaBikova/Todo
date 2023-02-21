
const todoForm = document.querySelector('#todo-form')
const todoList = document.querySelector('.todos')
const totalTasks = document.querySelector('#total-tasks')
const completedTasks = document.querySelector('#completed-tasks')
const remainingTasks = document.querySelector('#remaining-tasks')
const mainInput = document.querySelector('#todo-form input')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

if(!localStorage.getItem('tasks')){
    tasks.map((task) => {
        createTask(task)
    })
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const inputValue = mainInput.value

    if (inputValue == ''){
        return
    }

    const task = {
        id: new Date().getTime(),
        name: inputValue,
        isCompleted: false
    }

   
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))

    createTask(task)

    todoForm.reset()
    mainInput.focus()
})

todoList.addEventListener('click', (e) => {
    if(e.target.classList.contains('remove-task') || e.target.parentElement.classList.contains('remove-task') || e.targetparentElement.parentElement.classList.contains('remove-task')){
        const taskId = e.target.closest('li').id 

        removeTask(taskId)
    }
})

todoList.addEventListener('keydown', (e) =>{
    if (e.keyCode === 13) {
        e.preventDefault()

        e.target.blur()
    }

})

todoList.addEventListener('input', (e) => {
    const taskId = e.target.closest('li').id

    updateTask(taskId, e.target)
} )

function createTask(task) {
    const taskEl = document.createElement('li')

    taskEl.setAttribute('id', task.id)

    if(task.isCompleted) {
        taskEl.classList.add('complete')
    }

    const taskElMarkup = `
                    <div>
                        <input type="checkbox" name="tasks" id="${task.id}" ${task.isCompleted ? 'checked' : ''}>

                        <span ${!task.isCompleted ? 'contenteditable' : ''}>${task.name}</span>
                    </div>
                    <button title="Remove the " ${task.name}" task"  class="remove-task">
                        <svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.35714 21.3333C1.35714 22.8 2.57857 24 4.07143 24H14.9286C16.4214 24 17.6429 22.8 17.6429 21.3333V5.33333H1.35714V21.3333ZM4.07143 8H14.9286V21.3333H4.07143V8ZM14.25 1.33333L12.8929 0H6.10714L4.75 1.33333H0V4H19V1.33333H14.25Z" fill="#ACACAC"/>
                            </svg>
                    </button>
            `

            taskEl.innerHTML = taskElMarkup

            todoList.appendChild(taskEl)
            countTasks()

 
}

function countTasks() {
    const completedTasksArray = tasks.filler((task) => task.isCompleted === true)
    totalTasks.textContent = tasks.length 
    completedTasks.textContent = completedTasksArray.length
    remainingTasks.textContent = tasks.length = completedTasksArray.length
}

function removeTask(taskId){
    tasks = tasks.filter((task) => task.id !== parseInt (taskId))

    localStorage.setItem('tasks', JSON.stringify(tasks))

    document.getElementById(taskId).remove()

    countTasks()
}

function updateTask(taskId, el){
    const task = tasks.find((task) => task.id === parseInt(taskId))

    if (el.hasAttribute('contenteditable')) {

        task.name = el.textContent
    } else {
        const span = el.nextElementSibling
        const parent = el.closest('li')

        task.isCompleted = !task.isCompleted 
        if (task.isCompleted){
            span.removeAttribute('contenteditable')
            parent.classList.add('complete')
        }else{
            span.setAttribute('contenteditable', 'true')
            parent.classList.remove('complete')
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks))

    countTasks()

}