import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StyledApp from './App.style';

interface Todo {
  id: number;
  text: string;
  // status는 '미시작','진행중','완료
  status: string;
  date: Date;
}




function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');
  // 작업 생성
  const handleClickAddBtn = () => {
    addTodo();
  }
  // 작업 삭제
  const handleClickDeleteBtn = (id: number) => {
    deleteTodo(id);
  }

  const handleClickStatueCompleted = (id: number) => {
    setTodoList((prevTodolist) => prevTodolist.map((list, index) => {
      return list.id === id ? { ...list, status: '완료' } : list;
    }))
  }

  const handleClickSort = () => {

  }

  const addTodo = () => {
    let today = new Date();
    setTodoList([...todoList, { id: todoList.length, text: input, status: '미시작', date: today }]);
    setInput('');
  }

  const deleteTodo = (id: number) => {
    setTodoList((prevTodo) => prevTodo.filter((todo) => todo.id !== id))
  }



  useEffect(() => {
    console.log(todoList)
  }, [todoList])

  return (
    <StyledApp>
      <h1>Todo List</h1>
      <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='입력 필드'></input>
        <button onClick={handleClickAddBtn}>작업 추가</button>
        <button onClick={handleClickSort} >정렬</button>
        <div>----------------------</div>
        {
          todoList && todoList.map((list, index) => {
            let { id, text, status, date } = list;
            return (
              <div key={index} style={{ display: 'flex', gap: '20px' }} className={list.status === '완료' ? 'cancel' : ''} >
                <p>{text}</p>
                <button onClick={() => { handleClickStatueCompleted(id) }}>완료</button>
                <p>{status}</p>
                <button onClick={() => handleClickDeleteBtn(id)}>제거</button>
              </div>
            )
          })
        }
      </div>

    </StyledApp>
  );
}

export default App;
