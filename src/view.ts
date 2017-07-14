
import {Todo} from './interface'

const listContainer = document.querySelector('.todo-list') as HTMLUListElement;


export function renderList(items:Todo[]) :void {
   let renderedList:string = items.map(
     
        item => `<li class="${item.completed ||''}" data-id="${item.id}"><div class="view">
                        <input class="toggle" type="checkbox">
                        <label>${item.title}</label>
                        <button class="destroy"></button>
                    </div>
                <input class="edit" value="${item.title}">
                </li>`
   ).join('');

   updateList(renderedList);
}

export function updateList(markup:string): void {
    listContainer.innerHTML = markup;
}

