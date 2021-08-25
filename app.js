//define UI vars 
const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput=document.querySelector('#task');

//to load all event listenerens
loadEventListeners();

//load all event listeners
function loadEventListeners(){
    //get tasks
    document.addEventListener('DOMContentLoaded',getTasks);
    //add task event
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click',removeTask);
    clearBtn.addEventListener('click',clearTasks);
    filter.addEventListener('keyup',filterTasks);
}
//get Tasks
function getTasks() {
    let tasks;
if(localStorage.getItem('tasks')=== null)
{
    tasks=[];
}
else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
}
tasks.forEach(function(task){
    const li = document.createElement('li');
//Add class
li.className = 'collection-item';
//create text node and append
li.appendChild(document.createTextNode(task));
//create new link element
const link=document.createElement('a');
//add class
link.className='delete-item secondary-content';
//add icon
link.innerHTML='<i class="fa fa-remove"></i>';
//append the link to li
li.appendChild(link);
//append li to ul
taskList.appendChild(li);

})

}
//Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

//create li element
const li = document.createElement('li');
//Add class
li.className = 'collection-item';
//create text node and append
li.appendChild(document.createTextNode(taskInput.value));
//create new link element
const link=document.createElement('a');
//add class
link.className='delete-item secondary-content';
//add icon
link.innerHTML='<i class="fa fa-remove"></i>';
//append the link to li
li.appendChild(link);
//append li to ul
taskList.appendChild(li);
//clear input

//set to ls
storeTaskInLocalStorage(taskInput.value);
taskInput.value='';
e.preventDefault();
}

//store to ls
function storeTaskInLocalStorage(task){
let tasks;
if(localStorage.getItem('tasks')=== null)
{
    tasks=[];
}
else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
}
tasks.push(task);
localStorage.setItem('tasks',JSON.stringify(tasks));
}
//remove task

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are You Sure?')){
        e.target.parentElement.parentElement.remove();
        }
    }
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}
//remove te task from local storage
function  removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')=== null)
{
    tasks=[];
}
else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
}
tasks.forEach(function(task,index)
{
    if(taskItem.textContent===task)
    {
        tasks.splice(index,1);
    }
})
localStorage.setItem('tasks',JSON.stringify(tasks));
}
//clear tasks
function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}
//clear all from ls
function clearTasksFromLocalStorage()
{
    localStorage.clear();
}
//filter tasks
function filterTasks(e){
    const text=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1)
        {
            task.style.display='block';
        }
        else{
task.style.display='none';
        }
    })
}
    
