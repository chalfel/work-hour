import type { NextPage } from 'next'
import { useState } from 'react'

const Home: NextPage = () => {
  const [ enterTime, setEnterTime ] = useState('00:00')
  const [ lunchTime, setLunchTime ] = useState('00:00')
  const [ goBackTime, setGoBackTime ] = useState('00:00')
  const [ leaveTime, setLeaveTime ] = useState('00:00')
  const [ totalTime, setTotalTime ] = useState('00:00')

  const handleCalculateTime = () => {
    if (enterTime && lunchTime && goBackTime && leaveTime) {
      const enter = parseInt(enterTime.split(':')[0]) * 60 + parseInt(enterTime.split(':')[1])
      const lunch = parseInt(lunchTime.split(':')[0]) * 60 + parseInt(lunchTime.split(':')[1])
      const goBack = parseInt(goBackTime.split(':')[0]) * 60 + parseInt(goBackTime.split(':')[1])
      const leave = parseInt(leaveTime.split(':')[0]) * 60 + parseInt(leaveTime.split(':')[1])
      const total = leave - enter - lunch - goBack
      const totalMinutes = Math.abs(total % 60)
      setTotalTime(`${24 + Math.floor(total / 60)}:${totalMinutes < 10 ? `0${totalMinutes}` : totalMinutes}`)
    }
  }
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      <p className="font-black text-8xl">Work Hour</p>
      <form className="flex flex-col p-5 items-center justify-start">
        <p className="text-2xl text-neutral-500 font-normal">Resultado </p>
        <p className="text-3xl font-bold mb-4"> {totalTime} </p>
        <label className="text-neutral-500">Hora da Entrada</label>
        <input className="text-center" type="time" value={enterTime} onChange={(e) => setEnterTime(e.target.value)}></input>
        <label className="text-neutral-500" htmlFor="lunch">Hora do Almoço</label>
        <input className="text-center" id="lunch" type="time" value={lunchTime} onChange={(e) => setLunchTime(e.target.value)}></input>
        <label className="text-neutral-500" htmlFor="goBack">Hora da Volta</label>
        <input className="text-center" id="goBack" type="time" value={goBackTime} onChange={(e) => setGoBackTime(e.target.value)}></input>
        <label className="text-neutral-500"htmlFor="leave">Hora da Saida</label>
        <input  className="text-center" id="leave" type="time" value={leaveTime} onChange={(e) => setLeaveTime(e.target.value)}></input>
        <button onClick={handleCalculateTime} type="button" className="bg-black text-white px-4 py-2 rounded-xl my-2">Calcular</button>
      </form>
    </main>
  )
}

export default Home
