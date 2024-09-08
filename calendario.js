const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dateee");
const navs = document.querySelectorAll("#prev, #next");



const months = [
'Enero', 
'Febrero', 
'Marzo', 
'Abril', 
'Mayo', 
'Junio',    
'Julio', 
'Agosto', 
'Septiembre', 
'Octubre', 
'Noviembre', 
'Diciembre'
];

const tasks = [];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();


const taskDates = new Set(
    tasks.map(task => {
        const taskDate = new Date(task.fecha);
        return `${taskDate.getFullYear()}-${taskDate.getMonth() + 1}-${taskDate.getDate()+1}`;
    })
);

//Calendar

function renderCalendar() {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();


  let datesHtml = "";

  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
    }

  for (let i = 1; i <= endDate; i++) {
    let className =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? 'today'
        : "";

        const currentDateStr = `${year}-${month + 1}-${i}`;
        const taskClass = taskDates.has(currentDateStr) ? ' has-task' : '';
        
        datesHtml += `<li class="${className}${taskClass}">${i}</li>`;
    }


  for (let i = end; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  dateee.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;
}



//botones del calendar

navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }

    date = new Date(year, month, new Date().getDate());
    year = date.getFullYear();
    month = date.getMonth();

    renderCalendar();
  });
});

renderCalendar();





//task list
function renderTaskList() {

const taskList = document.getElementById('taskxd');
taskList.innerHTML = '';

    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      const taskText = document.createTextNode(task.text);
      li.appendChild(taskText);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      deleteButton.classList.add('deleteButton');

      deleteButton.onclick = function () {
        tasks.splice(index, 1); 
        renderTaskList();
        renderCalendar();
      };


      li.onclick = function () {
      li.classList.toggle('completed');
      };


      li.appendChild(deleteButton);

      taskList.appendChild(li);
    });
}



//press date to get a form for taskkkkkkkkkk


document.getElementById("dateee").addEventListener("click", function(event){
  if (event.target.tagName === 'LI' && !event.target.classList.contains('inactive')) {
    const taskInput = document.getElementById('taskInput');
    taskInput.style.display = 'block';
    document.getElementById('newtaskadd').value = '';
    selectedDate = `${year}-${month + 1}-${event.target.textContent}`;

    const rect = event.target.getBoundingClientRect();

    taskInput.style.top = `${rect.top + window.scrollY}px`;
    taskInput.style.left = `${rect.right + window.scrollX + 10}px`;
  }
});







//add tasdfjskdjfks

function addnewtask(){

  let nnewtask = document.getElementById('newtaskadd');
  let takksjdflkjsalkjdflksb = nnewtask.value;

  if(takksjdflkjsalkjdflksb === '') {
    alert('Debes agregar una tarea');
    return false;
  } else {
    if (!selectedDate) {
      alert('Debes seleccionar una fecha');
      return false;
    }


    tasks.push({text: takksjdflkjsalkjdflksb, fecha: selectedDate});
    renderTaskList(); 
    nnewtask.value = '';
    renderCalendar(); 
  }

  taskInput.style.display = 'none';
}


//HELP PLEASE