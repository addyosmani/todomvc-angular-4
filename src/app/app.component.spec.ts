/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';
import { By } from '@angular/platform-browser';
import { DndModule } from 'ng2-dnd';

describe('AppComponent', () => {
  let fixture;
  let app;
  let todoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DndModule.forRoot()
      ],
      declarations: [
        AppComponent
      ],
      providers: [TodoDataService]
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    todoDataService = fixture.debugElement.injector.get(TodoDataService);
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have a newTodo todo`, async(() => {
    expect(app.newTodo instanceof Todo).toBeTruthy()
  }));

  it('should display "Todos" in h1 tag', async(() => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Todos');
  }));

  it('should add a todo', async(() => {
    spyOn(todoDataService, 'addTodo');
    app.addTodo();
    expect(todoDataService.addTodo).toHaveBeenCalled();
  }));

  it('should complete a todo', async(() => {
    spyOn(todoDataService, 'toggleTodoComplete');
    app.toggleTodoComplete();
    expect(todoDataService.toggleTodoComplete).toHaveBeenCalled();
  }));

  it('should remove a todo', async(() => {
    spyOn(todoDataService, 'deleteTodoById');
    app.removeTodo(1);
    expect(todoDataService.deleteTodoById).toHaveBeenCalled();
  }));

  it('should move todo at top to bottom', (done: any) => {
    addTodo({
      id: 1,
      title: 'First Todo'
    });
    addTodo({
      id: 2,
      title: 'Second Todo'
    });
    addTodo({
      id: 3,
      title: 'Third Todo'
    });
    fixture.detectChanges();
    const todoItemEls = fixture.debugElement.queryAll(By.css('.todo-item'));
    const taskToDragEl = todoItemEls[0].nativeElement;
    const taskToDropEl = todoItemEls[2].nativeElement;
    const handleEl = fixture.debugElement.query(By.css('.handle')).nativeElement;
    triggerEvent(handleEl, 'mousedown', 'MouseEvent');
    triggerEvent(taskToDragEl, 'dragstart', 'MouseEvent');
    triggerEvent(taskToDropEl, 'dragenter', 'MouseEvent');
    triggerEvent(handleEl, 'mouseup', 'MouseEvent');
    triggerEvent(taskToDragEl, 'drop', 'MouseEvent');
    fixture.detectChanges();
    expect(app.todos.map(t => t.id)).toEqual([2, 3, 1]);
    done();
  });

  function addTodo(obj) {
    app.newTodo = new Todo(obj);
    app.addTodo();
  }

  function triggerEvent(elem: HTMLElement, eventName: string, eventType: string) {
    const event: Event = document.createEvent(eventType);
    event.initEvent(eventName, true, true);
    elem.dispatchEvent(event);
  }
});
