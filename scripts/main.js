function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const openAddBlockButton = document.querySelector('.header__button');
openAddBlockButton.onclick = function () {
    const addBlock = document.querySelector('.add_block');
    const plusBut = document.querySelector('.header__button');
    const todoList = document.querySelector('.todo');

    if (addBlock.classList.contains('hidden')){
        plusBut.classList.remove('rotare_close');  
        todoList.classList.remove('close_animation_todo');
        todoList.classList.remove('close_animation');
        addBlock.classList.remove('close_animation');
        addBlock.classList.remove('hidden');
        todoList.classList.add('open_animation');   
        addBlock.classList.add('open_animation');     
        plusBut.classList.add('rotare_plus');
        sleep(500).then(() => { addBlock.classList.remove('pos_rel');});
    }
    else {            
        addBlock.classList.add('pos_rel');
        plusBut.classList.remove('rotare_plus');
        addBlock.classList.remove('open_animation');
        todoList.classList.remove('open_animation');
        plusBut.classList.add('rotare_close');  
        addBlock.classList.add('close_animation');
        todoList.classList.add('close_animation');
        todoList.classList.add('close_animation_todo');
        todoList.classList.remove('close_animation');
        sleep(1000).then(() => { addBlock.classList.add('hidden');});
    }    
}

let color;

const colorItems = document.querySelectorAll('.color_item');
colorItems.forEach(element => {
    element.addEventListener('click', () => {
        element.style.border = "2px solid black";
        color = element.classList[1];
        colorItems.forEach(element => {
            if (color != element.classList[1])
            element.style.border = "0"; });
        });        
    
});

//основная логика

todo = []; //array with tasks
const nav = document.querySelector('.todo__list');

const newTask = () => {
    const text = document.querySelector('.add_block__input').value;
    if (text != "" && color != undefined) {
        const newTask = {
            taskName: text,
            checked: false,
            color: color
        };

        todo.push(newTask);
        localStorage.setItem('todo', JSON.stringify(todo));
        getTasks();
    }
    else {
        alert("Write a name & choose color");
    }
}

const addBut = document.querySelector('.add_block__button');
addBut.onclick = newTask;

const getTasks = () => {
    if (localStorage.getItem('todo')) {
        todo = JSON.parse(localStorage.getItem('todo'));
        let mes = '';
        todo.forEach((task, i) => {        
            mes += `
            <li class="todo__item">
                <input type="checkbox" class="item__check" id="item_${i}" ${task.checked ? 'checked' : ''}>
                <div class="item__label ${task.color}">${task.taskName}</div>
            </li>
            `;
            nav.innerHTML = mes;
        });
    }
};

document.querySelector('body').onload = getTasks;

nav.onchange = () => {
    const obj = event.target; 
    const id = obj.getAttribute('id').at(5);
    todo[id].checked = obj.checked;
};