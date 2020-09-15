let newTaskInput = document.getElementById('task-input'),
  addbtn = document.querySelector('.add-btn'),
  taskList = document.getElementById('tasklist'),
  data = localStorage.getItem("data")

data = data ? JSON.parse(data): []

var Task = function({id, item, completed}) {
  this.id = id
  this.item = item
  this.completed = completed || false

  this._deleteTask = (e)=> {
    let listitem = document.getElementById(this.id)
    e.target.parentElement.parentElement.removeChild(listitem)

    data = data.filter(task => task.id!= this.id)
    localStorage.setItem('data', JSON.stringify(data))
  }

  this._completeTask = (e) => {
    e.target.classList.toggle('completed-task')
    data = data.map(task => {
      if(task.id===this.id)
        task.completed = !task.completed
      return task
    })
    localStorage.setItem('data', JSON.stringify(data))
  }
}

_addListItem = (item) => {
  let taskName = document.createElement('p'),
    closeBtn = document.createElement('button'),
    listItem = document.createElement('div')

  taskName.innerText = item.item
  taskName.onclick = item._completeTask
  item.completed && taskName.classList.add('completed-task')

  closeBtn.innerText = 'X'
  closeBtn.onclick = item._deleteTask
  closeBtn.classList.add('cross-btn')

  listItem.classList.add('list-item')
  listItem.setAttribute('id', item.id)
  listItem.appendChild(taskName)
  listItem.appendChild(closeBtn)

  taskList.appendChild(listItem)
}

_addTask = () => {
  let item = newTaskInput.value
  if (item!='') {
    let id = data.length > 0 ? data[data.length-1].id+1 : 0

    let newTask = new Task({id, item})

    data.push(newTask)
    _addListItem(newTask)

    localStorage.setItem('data', JSON.stringify(data))
    newTaskInput.value=''
  } else 
    alert('Please write some task!')
}

function renderList() {
  data.map(task => {
    let newTask = new Task(task)
    _addListItem(newTask)
  })
}


addbtn.addEventListener('click', _addTask)
newTaskInput.addEventListener('keypress', (event)=> {
  if (event.keyCode === 13) {
    _addTask()
  }
})

renderList()
