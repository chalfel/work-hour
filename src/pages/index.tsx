import type { NextPage } from 'next'
import React, { useState } from 'react'
type InputProp = {
  label: string,
  type: string
  value: string,
  id: string,
  onChange: (value: string, id: string, type: string) => void
}
const Input: React.FC<InputProp> = ({ label, onChange, value, id, type }) => {
  return (
    <>
      <label className="text-neutral-500">{label} </label>
      <input className="text-center" type="time" value={value} onChange={(e) => onChange(e.target.value, id, type)}></input>
    </>
  )
}
type PeriodItem = { 
  label: string
  value: string
}
type PeriodProp = {
  id: string
  entry: PeriodItem
  leave: PeriodItem
  onChange: (value: string, id: string, type: string) => void
}
const Period: React.FC<PeriodProp> = ({id, entry, leave, onChange}) => {
  return (
    <>
      <Input label={entry.label} value={entry.value} onChange={onChange} id={id} type="enter"/>
      <Input label={leave.label} value={leave.value} onChange={onChange} id={id} type="leave"/>
    </>
  ) 
}

const Home: NextPage = () => {
  const [totalTime, setTotalTime] = useState('00:00')
  const [timeState, setTimeState] = useState([
    {
      enter: {
        label: 'Hora da Entrada',
        value: '00:00',
      },
      leave: {
        label: 'Hora do Almoço',
        value: '00:00',
      },
      id: '0'
    },
    {
      enter: {
        label: 'Hora da Volta',
        value: '00:00',
      },
      leave: {
        label: 'Hora da Saída',
        value: '00:00',
      },
      id: '1'
    },
  ])


  const handleCalculateTime = () => {
    const total = timeState.reduce((acc, curr) => {
      const enter = parseInt(curr.enter.value.split(':')[0]) * 60 + parseInt(curr.enter.value.split(':')[1])
      const leave = parseInt(curr.leave.value.split(':')[0]) * 60 + parseInt(curr.leave.value.split(':')[1])
      return acc + (leave - enter)
    }, 0)
    const totalMinutes = Math.floor(total % 60)
    setTotalTime(`${Math.floor(total / 60)}:${totalMinutes < 10 ? `0${totalMinutes}` : totalMinutes}`)
  }
  const handleAddField = () => {
    setTimeState((prev) => [...prev, 
    {
      enter: {
        label: 'Entrada Opcional',
        value: '00:00',
      },
      leave: {
        label: 'Saída Opcional',
        value: '00:00',
      },
      id: `${prev.length}`
    },
  ]
    )
  }

  const handleOnStateChange = (value: string, id: string, type: string) => {
    const newArray = timeState.map(item => {
      if(id === item.id) {
        return {
          ...item,
          [type]: {
            ...item[type],
            value,
          }
        }
      }
      return item
    })      

      setTimeState(newArray)
}
return (
  <main className="w-screen h-screen flex flex-col items-center justify-center">
    <p className="font-black text-6xl lg:text-8xl">Work Hour</p>
    <form className="flex flex-col p-5 items-center justify-start">
      <p className="text-2xl text-neutral-500 font-normal">Resultado </p>
      <p className="text-3xl font-bold mb-4"> {totalTime} </p>
      {timeState.map((time) => (<Period key={time.id} entry={time.enter} leave={time.leave} id={time.id} onChange={handleOnStateChange} />))}
      <button onClick={handleCalculateTime} type="button" className="bg-black text-white px-4 py-2 rounded-xl my-2">Calcular</button>
      <button onClick={handleAddField} type="button" className="bg-black text-white px-4 py-2 rounded-xl my-2">Adicionar Campo</button>

    </form>
  </main>
)
}

export default Home
