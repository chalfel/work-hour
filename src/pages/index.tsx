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
      <form className="flex flex-col p-5">
        <label>Hora da Entrada</label>
        <input value={enterTime} onChange={(e) => setEnterTime(e.target.value)}></input>
        <label htmlFor="lunch">Hora do Almoço</label>
        <input id="lunch" value={lunchTime} onChange={(e) => setLunchTime(e.target.value)}></input>
        <label htmlFor="goBack">Hora da Volta</label>
        <input id="goBack" value={goBackTime} onChange={(e) => setGoBackTime(e.target.value)}></input>
        <label htmlFor="leave">Hora da Saida</label>
        <input id="leave" value={leaveTime} onChange={(e) => setLeaveTime(e.target.value)}></input>
        <button onClick={handleCalculateTime} type="button">Calcular</button>
        <p> {totalTime} </p>
      </form>
    </main>
  )
}

export default Home
