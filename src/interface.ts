
export interface Todo {
 id: number;
 title: string;
 completed: boolean; 
}

export class TodoList {
     todolist:Todo[] = [];
     itemID:number = 0;

     addTodoItem(title:string, renderCallback : (todos:Todo[]) => void ) : void {
         let curTodo:Todo = { id: ++this.itemID, title: title, completed: false  }
         this.todolist.push(curTodo);
         renderCallback(this.todolist);
    }
    
    updateTodoItem(id:number, title: string) {
        let i:number = this.todolist.findIndex(listItem => listItem.id === id);
        this.todolist[i].title =  title;
    }

    completeTask(id:number, state:boolean) :void {
        let i:number = this.todolist.findIndex(listItem => listItem.id === id);
        this.todolist[i].completed = state;
    }

     removeTodoItem(id:number, renderCallback : (todos:Todo[]) => void ): void {
         let i:number = this.todolist.findIndex((item:Todo) => item.id == id );
         this.todolist.splice(i, 1);
         renderCallback(this.todolist);
    }
    
    getCompleted() : Todo[] {
        let currList:Todo[] = this.todolist;
        let completed = currList.filter( (currList) => currList.completed );
        return completed;
    }

     getActiveTasks() : Todo[] {
        let currList:Todo[] = this.todolist;
        let active = currList.filter( (currList) => !currList.completed );
        return active;
    }
    
}





