
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({})
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState({anecdote: '', votes: 0})

  const nextAnectode = () => {
    setSelected(Math.floor(Math.random()*props.anecdotes.length))
  }

  const addPOintToCurrentAnectode = () => {
    const newPoints = { ...points };
    if(!newPoints[selected]) newPoints[selected] = 0;
    newPoints[selected] += 1
    console.log(newPoints)

    if(newPoints[selected] > mostVotedAnecdote.votes) {
      const newMostVotedAnecdote = {...mostVotedAnecdote}
      newMostVotedAnecdote.votes = newPoints[selected]
      newMostVotedAnecdote.anecdote = props.anecdotes[selected]
      setMostVotedAnecdote(newMostVotedAnecdote)
    }
    setPoints(newPoints)
  }
  return (
    <div>
      <Header text='Anecdote of the day' />
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected] | 0} votes</p>
      <p>
        <Button handleClick={addPOintToCurrentAnectode} text='Vote' />
        <Button handleClick={nextAnectode} text='Next anecdote' />
      </p>
      <Header text='Anecdote with most votes' />
      <p>{mostVotedAnecdote.anecdote}</p>
      <p>{mostVotedAnecdote.votes > 0 ? 'Has ' + mostVotedAnecdote.votes + ' votes' : ''}</p>
    </div>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
