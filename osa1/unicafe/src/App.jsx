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
  const [goodValue, setGoodValue] = useState(0);
  const [badValue, setBadValue] = useState(0);
  const [neutralValue, setNeutralValue] = useState(0);
  
  const handleGoodClick = () => {
    setGood(good + 1)
    setGoodValue(goodValue + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setBadValue(badValue - 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setNeutralValue(neutralValue)
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header text="statistics" />
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>total {good+bad+neutral}</p>
      <p>average {(goodValue+neutralValue+badValue)/(good+bad+neutral)}</p>
      <p>positive {good/(good+bad+neutral)*100} %</p>
    </div>
  )
}

export default App