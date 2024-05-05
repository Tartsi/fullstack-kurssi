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

const Statistics = (props) => {

  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>total {props.good+props.bad+props.neutral}</p>
      <p>average {(props.goodValue+props.neutralValue+props.badValue)/(props.good+props.bad+props.neutral)}</p>
      <p>positive {props.good/(props.good+props.bad+props.neutral)*100} %</p>
    </div>
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
      <Statistics 
      good={good}
      neutral={neutral}
      bad={bad} 
      goodValue={goodValue}
      neutralValue={neutralValue}
      badValue={badValue} 
      />
    </div>
  )
}

export default App