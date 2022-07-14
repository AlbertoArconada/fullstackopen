import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistic = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const GiveFeedback = ({handleClickGood, handleClickNeutral, handleClickBad}) => {
  return (
    <>
      <Header text='Give feedback'/>
      <Button handleClick={handleClickGood} text='Good' />
      <Button handleClick={handleClickNeutral} text='Neutral' />
      <Button handleClick={handleClickBad} text='Bad' />
    </>
  )
}

const Statistics = ({ good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all 
  const positive = ((good / all) * 100) + '%' 
  if (all === 0) return (
    <>
      <Header text="Statistics" />
      <p>No feedback given</p>
    </>
  )

  return (
    <>
      <Header text="Statistics" />
      <table>
        <tbody>
          <Statistic text='Good' value={good} />
          <Statistic text='Neutral' value={neutral} />
          <Statistic text='Bad' value={bad} />
          <Statistic text='All' value={all} />
          <Statistic text='Average' value={average} />
          <Statistic text='Positive' value={positive} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGoodFeedback = () => {
    setGood(good + 1)
  }

  const addNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const addBadFeedback = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <GiveFeedback 
        handleClickGood={addGoodFeedback} 
        handleClickNeutral={addNeutralFeedback}
        handleClickBad={addBadFeedback}
        />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)