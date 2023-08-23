import React from 'react'
import './ExpenseItem.css'
import { MdEdit, MdDelete } from 'react-icons/md'

const ExpenseForm = ({ expense, handleDelete, handleEdit }) => {
    return (
      <li className='item'>
        <div className='info'>
          <span className="expense">{expense.charge}</span>
          <span className="amount">{expense.amount}원</span>
        </div>
        <div>
          <button 
            className='edit-btn'
            onClick={()=>
              handleEdit(expense.id)}
            >
            <MdEdit/>
          </button>
          <button 
            className='clear-btn'
            onClick={() => 
              handleDelete(expense.id)
            }
            >
            <MdDelete/>
          </button>
        </div>
      </li>
    )
}

export default ExpenseForm
