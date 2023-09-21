import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  newTask = '';
  tasksList: { title: string; completed: boolean }[] = [];


  ngOnInit() {
    this.loadTasksFromLocalStorage();
  }

  private saveTasks() {
    try {
      localStorage.setItem('tasks', JSON.stringify(this.tasksList));
    } catch (error) {
      console.error(error);
    }
  }

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasksList.push({ title: this.newTask, completed: false });
      this.newTask = '';
      this.saveTasks();
    }
  }

  removeTask(index: number) {
    if (index >= 0 && index < this.tasksList.length) {
      this.tasksList.splice(index, 1);
      this.saveTasks();
    }
  }

  toggleComplete(index: number) {
    this.tasksList[index].completed = !this.tasksList[index].completed;
    this.saveTasks();
  }

  private loadTasksFromLocalStorage() {
    try {
      const tasksStored = localStorage.getItem('tasks');
      if (tasksStored) {
        this.tasksList = JSON.parse(tasksStored);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
