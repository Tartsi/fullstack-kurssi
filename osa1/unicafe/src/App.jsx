import { useState } from 'react'

const Header = (props) => {
  return (
    <h3>{props.text}</h3>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  
  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleBadClick} text="bad" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Header text="statistics" />
      <p>good {good}</p>
      <p>bad {bad}</p>
      <p>neutral {neutral}</p>
    </div>
  )
}

export default App