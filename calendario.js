const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
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

const tasks = [
    { texto: 'Tarea 1', fecha: '2024-09-05' },
    { texto: 'Tarea 2', fecha: '2024-09-10' }
];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

const taskDates = new Set(
    tasks.map(task => {
        const taskDate = new Date(task.fecha);
        return `${taskDate.getFullYear()}-${taskDate.getMonth() + 1}-${taskDate.getDate()+1}`;
    })
);


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

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;
}

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

const taskList = document.getElementById('taskxd');

function listTasks() {

    const currentDate = new Date();

    tasks.forEach(task => {
        const taskDate = new Date(task.fecha);
        const li = document.createElement('li');
        const taskText = document.createTextNode(task.texto);
        li.appendChild(taskText);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        
        if (taskDate < currentDate) {
            deleteButton.onclick = function () {
                li.remove();
            };
            deleteButton.style.display = 'inline';
        } else {
            deleteButton.style.display = 'none'; 
        }

        li.onclick = function () {
            li.classList.toggle('completed');
        };


        li.appendChild(deleteButton);

        taskList.appendChild(li);


    });

    
}

listTasks();