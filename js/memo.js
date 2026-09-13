const addmemo = document.getElementById("addmemo");
const memolist = document.getElementById("memolist");
const memotext = document.getElementById("memotext");

const memos = [];

let currentMemo = null;
let currentMemoButton = null;

const selectedMemoId = Number(localStorage.getItem("selectedMemoId"));

const savedMemos = localStorage.getItem("memos");
if (savedMemos) {
  const parsedMemos = JSON.parse(savedMemos);
  parsedMemos.forEach((memo) => {
    memos.push(memo);
    loadMemos(memo);
  });
};


  


addmemo.addEventListener("click", () => {

  addMemo();

});

function addMemo() {

  

  const memo = {
    id: Date.now(),
    text: "newmemo",
  };
  memos.push(memo);

    

  memotext.focus();
 
  
loadMemos(memo);

  saveMemo();
};


memotext.addEventListener("input", () => {

  if (currentMemo === null){
    return;
  };

  currentMemo.text = memotext.value;
  currentMemoButton.textContent = currentMemo.text;
  
  saveMemo();
});

function loadMemos(memo) {
  const li = document.createElement("li");
  const memoButton = document.createElement('button');
  memoButton.textContent = memo.text;
  memoButton.classList.add('memo-button');
  memoButton.dataset.id = memo.id;

  memoButton.addEventListener('click', () => {

     // 今まで選択されていたボタンのactiveを外す
    if (currentMemoButton !== null) {
      currentMemoButton.classList.remove('active');
    };

    currentMemo = memo;
    currentMemoButton = memoButton;
    memotext.value = memo.text;
    
    memoButton.classList.add('active');

    memotext.focus();

    localStorage.setItem("selectedMemoId", memo.id);
  });

  
  


  const deleteButton = document.createElement("button");
  deleteButton.textContent = "削除";
  deleteButton.addEventListener("click", () => {
    if (currentMemoButton !== null) {
      currentMemoButton.classList.remove('active');
    };

    li.remove();

    const index = memos.findIndex(m => m.id === memo.id);
    memos.splice(index, 1);
    
    

      if(memos.length > 0){

        // 画面の一番上にactive
        const lastmemo = memos[memos.length -1];
        //画面の一番下にactive
        // const lastmemo = memos[0];

        currentMemo = lastmemo;


        currentMemoButton = null;
        
        

        const buttons = memolist.querySelectorAll('.memo-button');

        buttons.forEach(button => {
          if(Number(button.dataset.id) === lastmemo.id){
            currentMemoButton = button;
            button.classList.add('active');
          };
        });
      

        
        memotext.value = lastmemo.text;

        localStorage.setItem('selectedMemoId', lastmemo.id);
      }else {
        currentMemo = null;
        currentMemoButton = null;
        memotext.value = '';

        

        localStorage.removeItem('selectedMemoId');
      };
      memotext.focus();
      
      saveMemo();
    });
  

 
  li.appendChild(memoButton);
  li.appendChild(deleteButton);
  memolist.prepend(li);

  if(memo.id === selectedMemoId){
    currentMemo = memo;
    currentMemoButton = memoButton;
    memotext.value = memo.text;
    memoButton.classList.add('active');
  };
};

function saveMemo() {
  localStorage.setItem("memos", JSON.stringify(memos));
};

