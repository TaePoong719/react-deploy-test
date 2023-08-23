import React from 'react'
import './ExpenseList.css'
import ExpenseItem from './ExpenseItem'

const ExpenseList = ({ expenses, handleDelete, handleEdit, clearItems }) => {

  return (
    <>
      <ul className='list'>
        {expenses.map(expense =>{
          return <ExpenseItem 
            key= {expense.id}  
            handleDelete = {handleDelete}
            expense = {expense}  
            handleEdit={handleEdit}
            />
        })}
        
      </ul>
      {expenses.length ?
        <button 
          className='btn'
          onClick={clearItems}>
            목록 지우기
        </button>:null}

    </>
  )
}

export default ExpenseList