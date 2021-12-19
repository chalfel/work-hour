import type { NextPage } from 'next'
import React, { useState } from 'react'
type InputProp = {
  label: string,
  value: string,
  id: string,
  onChange: (value: string, id: string) => void
}
const Input: React.FC<InputProp> = ({ label, onChange, value, id }) => {
  return (
    <>
      <label className="text-neutral-500">{label} </label>
      <input className="text-center" type="time" value={value} onChange={(e) => onChange(e.target.value, id)}></input>
    </>
  )
}

const Home: NextPage = () => {
  const [totalTime, setTotalTime] = useState('00:00')
  const [timeState, setTimeState] = useState([
    {
      label: 'Hora da Entrada',
      value: '00:00',
      id: '0'
    },
    {
      label: 'Hora do Almoço',
      value: '00:00',
      id: '1'
    },
    {
      label: 'Hora da Volta',
      value: '00:00',
      id: '2'
    },
    {
      label: 'Hora da Saída',
      value: '00:00',
      id: '3'
    },
  ])


  const handleCalculateTime = () => {
    const test = timeState.reduce((acc, curr) => {
      return [...acc, curr.value]
    }, [] as string[])
      .map(arg => parseInt(arg.split(':')[0]) * 60 + parseInt(arg.split(':')[1]))
    const total2 = (test[1] - test[0]) + (test[3] - test[2])
    const totalMinutes = Math.floor(total2 % 60)
    setTotalTime(`${Math.floor(total2 / 60)}:${totalMinutes < 10 ? `0${totalMinutes}` : totalMinutes}`)
  }
  const handleAddField = () => {
    setTimeState((prev) => [...prev, 
    {
      label: 'Entrada Opcional',
      value: '00:00',
      id: `${prev.length}`
    },
    {
      label: 'Saida Opcional',
      value: '00:00',
      id: `${prev.length + 1}`
    }
  ]
    )
  }

  const handleOnStateChange = (value: string, id: string) => {
    const newArray = timeState.map(item => {
      if(id === item.id) {
        return {
          ...item,
          value,
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
      {timeState.map((time) => (<Input key={time.id} value={time.value} label={time.label} id={time.id} onChange={handleOnStateChange} />))}
      <button onClick={handleCalculateTime} type="button" className="bg-black text-white px-4 py-2 rounded-xl my-2">Calcular</button>
      <button onClick={handleAddField} type="button" className="bg-black text-white px-4 py-2 rounded-xl my-2">Adicionar Campo</button>

    </form>
  </main>
)
}

export default Home
