import './App.css';
import React, { useState } from 'react'
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';

const App = () => {
  const [expenses, setExpenses] = useState([    
      {id:1, charge:'렌트비',amount: 1600},
      {id:2, charge:'교통비',amount: 400},
      {id:3, charge:'식비',amount: 1200}
    ])

  const [charge, setCharge] = useState("")
  const [amount, setAmount] = useState(0)
  const [alert, setAlert] = useState({show: false, type:'', text:''})

  const [edit, setEdit] = useState(false)  
  const [id, setId] = useState('')

  const clearItems = () => {
    setExpenses([])
  }

  const handleEdit = id => {
    const { charge, amount } = expenses.find(expense=> expense.id === id)
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
  }

  const handleAlert = ({ type, text }) => {
    setAlert({show:true, type, text})
    setTimeout(()=>{
      setAlert({show:false, type:'', text:''})
    },5000)
  }

  const handleSubmit = event => {
    event.preventDefault()
    
    if(charge && (amount > 0)){
      // expenses state에 새로운 객체를 만들어 추가해주기 : state update
      // state update 시에는 항상 불변성을 지켜줘야함 
      // 불변성을 지킨다는 말은 이전에 있던 값을 건드리지 않고, 새로운 값을 만들어서 교체를 해줘야 함
      if(edit){
        const newExpenses = expenses.map(expense => {
          return expense.id === id ? {
            ...expense,
            charge,
            amount
          } 
          : expense
        })
        setExpenses(newExpenses)
        setEdit(false)
        setId('')
        handleAlert({type:'success',text:'아이템이 수정되었습니다.'})

      }else{
        // 새로운 객체 생성
        const newExpenses = [...expenses, {id: crypto.randomUUID(), charge, amount}]
        setExpenses(newExpenses)
        handleAlert({type:'success',text:'아이템이 생성되었습니다.'})
      }
      
      setCharge("")
      setAmount(0)

    }else{
      console.log('먼저 입력해주세요.')
      handleAlert({type:'danger',text:'charge는 빈 값일 수 없으며 amount는 0보다 커야 합니다.'})
    }
  }

  const handleCharge = event => {
    setCharge(event.target.value)
  }

  const handleAmount = event => {
    // event.target.value 의 type 은 string이다! => number로 변환이 필요하다
    setAmount(event.target.valueAsNumber)
  }

  const handleDelete = id => {
    const newExpenses = expenses.filter(expense => expense.id !==  id)
    setExpenses(newExpenses)
  }

  return(
    <main className='main-container'>
      {alert.show? <Alert type={alert.type} text={alert.text}/> : null}

      <h1>예산 계산기</h1>

{/* 바깥 {}은 style 을 위한, 안의 {}은 style 객체를 위한 중괄호*/}
      <div style={{ width: '100%', backgroundColor:'white', padding: '1rem' }}>
        <ExpenseForm 
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          charge={charge}
          amount={amount}
          handleSubmit={handleSubmit}
          edit={edit}
          />
      </div>

      <div style={{ width: '100%', backgroundColor:'white', padding: '1rem' }}>
        <ExpenseList 
          expenses = {expenses} 
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
          />
      </div>
      
      <div style={{ display: 'flex', justifyContent:'end', marginTop: '1rem'}}>
        <p style={{fontSize:'2rem'}}>
          총지출 : 
          <span>{expenses.reduce((acc,cur)=>{
            return acc+cur.amount}, 0)}원</span>
        </p>     
      </div>
    </main>
  )

}

export default App