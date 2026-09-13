const calendar = document.querySelector('#calendar');
const yearMonth = document.querySelector('#yearMonth');
const days = document.querySelector('#days');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const right = document.querySelector('#right');
const calendarmemo = document.querySelector('#calendarmemo');

const onedays = [];
let currentDate = new Date();

function showCalendar() {

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  yearMonth.textContent = `${year}年${month + 1}月`;

  days.innerHTML = '';

  // １日の曜日を受け取る
  const firstday = new Date(year, month, 1).getDay();

  //月末の数字を受け取る
  const lastDate = new Date(year, month + 1, 0).getDate();

  // １日前の空欄を作る
  for(let i = 0; i < firstday; i++){
    const empty = document.createElement('div');
    days.appendChild(empty);
  };

  for(let date = 1; date <= lastDate; date++){
    const day = document.createElement('div');
    day.textContent = date;

    day.addEventListener('click', () => {
      
      calendarmemo.innerHTML = '';

      calendar.classList.add('flex');
      const closeButton = document.createElement('button')
      closeButton.textContent = '×';
      

      closeButton.addEventListener('click', () => {
        calendarmemo.innerHTML = '';
        calendar.classList.remove('flex');
      });

      

      const id = `${year}-${month + 1}-${date}`;

      const savedMemo = onedays.find(item => item.id === id);

      calendarmemo.innerHTML = '';

      const calendartext = document.createElement('textarea');
      if(savedMemo){
        calendartext.value = savedMemo.text;
      };

      calendartext.addEventListener('input', () => {
        const memo = onedays.find(item => item.id === id);

        if(memo){
          memo.text = calendartext.value;
        }else {
          onedays.push({
            id:id,
            text:calendartext.value,
          });
        }

        savecalendar();
      });

      calendarmemo.prepend(closeButton);
      calendarmemo.appendChild(calendartext);
      calendartext.focus();
    });

    
    const dateOfweek = new Date(year, month, date).getDay();
    if(dateOfweek === 0){
      day.classList.add('sunday');
    };
    days.appendChild(day);
  };
};

prev.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  showCalendar();
});

next.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  showCalendar();
});

function savecalendar(){
  localStorage.setItem('onedays', JSON.stringify(onedays));
};

showCalendar();

