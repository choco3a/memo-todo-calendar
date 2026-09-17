"use strict";
const calendar = document.querySelector('#calendar');
const days = document.querySelector('#days');
const yearMonth = document.querySelector('#yearMonth');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const right = document.querySelector('#right');
const calendarmemo = document.querySelector('#calendarmemo');
console.log("calendar.ts 読み込み成功");
const onedays = [];
let currentDate = new Date();
const savedOnedays = localStorage.getItem("onedays");
if (savedOnedays) {
    const parsedOnedays = JSON.parse(savedOnedays);
    parsedOnedays.forEach((oneday) => {
        onedays.push(oneday);
    });
}
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
    for (let i = 0; i < firstday; i++) {
        const empty = document.createElement('div');
        days.appendChild(empty);
    }
    ;
    for (let date = 1; date <= lastDate; date++) {
        const day = document.createElement('div');
        day.textContent = String(date);
        day.addEventListener('click', () => {
            calendarmemo.innerHTML = '';
            calendar.classList.add('flex');
            const closeButton = document.createElement('button');
            closeButton.textContent = '×';
            closeButton.addEventListener('click', () => {
                calendarmemo.innerHTML = '';
                calendar.classList.remove('flex');
            });
            const id = `${year}-${month + 1}-${date}`;
            console.log("クリックしたID:", id);
            console.log("保存されているデータ:", onedays);
            const savedMemo = onedays.find(item => String(item.id) === id);
            console.log("見つかったメモ:", savedMemo);
            calendarmemo.innerHTML = '';
            const calendartext = document.createElement('textarea');
            if (savedMemo) {
                calendartext.value = String(savedMemo.text);
            }
            ;
            calendartext.addEventListener('input', () => {
                const memo = onedays.find(item => String(item.id) === id);
                if (memo) {
                    memo.text = calendartext.value;
                }
                else {
                    onedays.push({
                        id: id,
                        text: calendartext.value,
                    });
                }
                savecalendar();
            });
            calendarmemo.prepend(closeButton);
            calendarmemo.appendChild(calendartext);
            calendartext.focus();
        });
        const dateOfweek = new Date(year, month, date).getDay();
        if (dateOfweek === 0) {
            day.classList.add('sunday');
        }
        ;
        days.appendChild(day);
    }
    ;
}
;
prev.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    showCalendar();
});
next.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    showCalendar();
});
function savecalendar() {
    localStorage.setItem('onedays', JSON.stringify(onedays));
}
;
showCalendar();
//# sourceMappingURL=calendar.js.map