// Your app here

import {TodoList} from './interface';
import {renderList} from './view';


const ENTER_KEY:number = 13;

let myTodoList = new TodoList();
const newTodoInput = document.querySelector('.new-todo') as HTMLInputElement;
const listContainer = document.querySelector('.todo-list') as HTMLUListElement;
const mainUI = document.querySelector('.main') as HTMLElement;
const footerUI = document.querySelector('.footer') as HTMLElement;


export function updateUI(): void {

   let displayMode:string = (myTodoList.todolist.length)? 'block': 'none';
        mainUI.style.display = displayMode;
        footerUI.style.display = displayMode;

    const countContainer = document.querySelector('.todo-count') as HTMLSpanElement;

    let count:number = myTodoList.getActiveTasks().length;
    let item:string = (count == 0 || count > 1) ? 'items': 'item'; 

    countContainer.innerHTML = `<strong>${count}<strong> ${item} left`;
} 


export function completeEdit() : void {
    let listItem = document.querySelector('.editing') as HTMLElement;
    if(listItem){
        listItem.classList.remove('editing');        
    }
}

listContainer.addEventListener('focusout', (e) => {

    let element = e.target as  HTMLInputElement || HTMLElement;
    if(element.tagName == "INPUT" && element.type == 'text') {

        let inputText:string = element.value;
        let p = element.previousElementSibling as HTMLElement;
        let inputLabel = p.querySelector("label");

        if(inputLabel) inputLabel.innerHTML = inputText;

        if(element.parentNode) {
         let listItem = element.parentNode as HTMLElement;
          if(listItem.dataset.id) {
              myTodoList.updateTodoItem(Number(listItem.dataset.id), inputText)
          }

        }
            
    }
  
    completeEdit();
});


export function completeAll() :void {
    let checkboxes = document.querySelectorAll('.toggle') as NodeList;
    let checkboxesArray = Array.from(checkboxes);
    checkboxesArray.forEach( (checkbox:HTMLInputElement)  => checkbox.setAttribute('checked', "checked"));
}


document.addEventListener('keydown', (event) => {
    if(event.keyCode === ENTER_KEY && newTodoInput.value !== "" ) {
        myTodoList.addTodoItem(newTodoInput.value.trim(), renderList );
      updateUI();
      newTodoInput.value = "";       
    }
    else if (event.keyCode === ENTER_KEY) {
        completeEdit();
    }
});


listContainer.addEventListener('dblclick', function(e: MouseEvent){
    let element = e.target as  HTMLInputElement || HTMLElement;
    if(element.tagName == "LABEL") {

         if(element.parentNode) {
           let listItem = element.parentNode.parentNode as HTMLElement;
           listItem.classList.toggle('editing');
        }

        let p = element.parentNode as HTMLElement;
        let q = p.nextElementSibling as HTMLInputElement;

        q.focus()
        q.setSelectionRange(0,0);
    }
});



listContainer.addEventListener('change', (e)=> {
    let element = e.target as  HTMLInputElement;

    if (element.tagName == "INPUT") {
         if(element.parentNode) {
           let listItem = element.parentNode.parentNode as HTMLElement;
             if(listItem.dataset.id) {
                listItem.classList.toggle('completed');
                myTodoList.completeTask(Number(listItem.dataset.id), element.checked);
                updateUI();
            }
          }
     }
});


listContainer.addEventListener('click', function(e: MouseEvent){
    let element = e.target as HTMLElement || HTMLInputElement;

    if(element.tagName == "BUTTON") {
        if(element.parentNode) {
           let listItem = element.parentNode.parentNode as HTMLElement;
            if(listItem.dataset.id) {
                myTodoList.removeTodoItem( Number(listItem.dataset.id) , renderList)
            }            
           
        }
        updateUI();
    }

    
});


// myTodoList.addTodoItem('test items', renderList);
// myTodoList.addTodoItem('test items2', renderList);
// myTodoList.addTodoItem('test items3', renderList);

// myTodoList.updateTodoItem(2, 'Hello World');

// completeAll();
// console.log(myTodoList.todolist);





updateUI();



