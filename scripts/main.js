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
    element.addEventListener('mouseover', function () {
        element.style.border = "2px solid black"; });
    element.addEventListener('mouseout', function () {
        if (color != element.classList[1])
        element.style.border = "0"; });
    element.addEventListener('click', function () {
        element.style.border = "2px solid black";
        color = element.classList[1];
        colorItems.forEach(element => {
            if (color != element.classList[1])
            element.style.border = "0"; });
        });        
    
});

const addBut = document.querySelector('.add_block__button');
addBut.onclick = addTask;

function addTask() {
    const nav = document.querySelector('.todo__list');
    const text = document.querySelector('.add_block__input').value;
    nav.insertAdjacentHTML('afterend', 
    `<li class="todo__item">
    <input type="checkbox" class="item__check" name="item">
    <div class="item__label ${color}">${text}</div>
    </li>`);
}