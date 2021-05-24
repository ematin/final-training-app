const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.workouts');
let items = JSON.parse(localStorage.getItem('items')) || [];
const deleteAll = document.querySelector('.delete');

//Добавление нового профиля пользователя
function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const dist = (this.querySelector('[name=item2]')).value;
  const hour = (this.querySelector('[name=item3]')).value;
  const item = {
    text,
    dist,
    hour,
    done: false
  };
  items.push(item);
  //Обновление локального хранилища
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);

  //Сброс вв значений
  this.reset();
}


//Создание нового элемента списка
function populateList(activities = [], activitiesList){
  activitiesList.innerHTML = activities.map((activity, i) => {
    let convertTime = +activity.hour+(+activity.minute/60);
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${activity.done ? "checked" : ""}></input>
        <label for="item${i}">${activity.text}</label>
        <label for="item${i}">${activity.dist} cm</label>
        <label for="item${i}">${activity.hour}kg</label> 
        <button class="erase">▼</button>
        <li2>
        <button class="collapsible">Показать тренировку</button>
        <div class="content"
        <p>
        <button onclick="test_assign()">Похудение</button>
        <button onclick="test_assign1()">Набор</button>
        <button onclick="test_assign2()">Поддержание</button>
        </p>
        </div>
      </li>
      </li2>
    `
  }).join("");
}

//Mark a workout completed
function toggleDone(e){
  if(!e.target.matches('input')) return;
  const el = e.target;
  const ind = el.dataset.index;
  items[ind].done = !items[ind].done;
  
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

//Removing the workout from the list
function removeItem(e){
  if(!e.target.matches('button')) return;//checking if it is a delete button

  li = e.target.parentElement;
  let index = Array.prototype.indexOf.call(itemsList.children, li);

  itemsList.removeChild(li);

  removeLocalStorage(index);
}


//Updating a local Storage
function removeLocalStorage(index){
  items.splice(index, 1);
  localStorage.setItem('items', JSON.stringify(items));
};
  
//EventListeners
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
itemsList.addEventListener('click', removeItem);
deleteAll.addEventListener('click', ()=> {
  window.localStorage.clear();
  populateList(items=[], itemsList);
});

populateList(items, itemsList);



let coll = document.getElementsByClassName('collapsible');
for (let i = 0; i < coll.length; i++){
coll[i].addEventListener('click', function() {
this.classList.toggle('active');
let content = this.nextElementSibling;
if (content.style.maxHeight) {
content.style.maxHeight = null;
}else{
content.style.maxHeight = content.scrollHeight + 'px'}
})
}

function test_assign() {
  document.location.assign("https://101hairtips.com/wp-content/uploads/4/3/f/43f9c5b1b96aa4226b3243675e6f9d03.jpg")
}
function test_assign1() {
  document.location.assign("https://krasunia.ru/wp-content/uploads/7/2/d/72dc08a93615db15b2c4df53be59e7a6.jpe")
}
function test_assign2() {
  document.location.assign("https://cf2.ppt-online.org/files2/slide/l/lNhiZnOa2gCEbkHFSuJQszx8meqIW0MpcK3G6tLBUw/slide-8.jpg")
}