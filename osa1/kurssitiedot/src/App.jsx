const Header = (props) => {

  return (
    <h1>
      {props.course}
    </h1>
  )

}

const Part1 = (props) => {
  
  const name = props.part1
  const exercises = props.exercises1
  
  return ( 
    <>
    <h4>Part 1: {name}</h4>
    <h4>Exercise amount: {exercises}</h4>
    </>
    )
  
}

const Part2 = (props) => {
  
  const name = props.part2
  const exercises = props.exercises2
  
  return ( 
    <>
    <h4>Part 2: {name}</h4>
    <h4>Exercise amount: {exercises}</h4>
    </>
    )
  
}

const Part3 = (props) => {
  
  const name = props.part3
  const exercises = props.exercises3
  
  return ( 
    <>
    <h4>Part 3: {name}</h4>
    <h4>Exercise amount: {exercises}</h4>
    </>
    )
  
}

const Content = (props) => {
  return (
    <>
    <br />
    <h2>
      Content:
    </h2>
    <br />
    <div>
        <Part1 part1={props.part1} exercises1={props.exercises1}/>
        <br />
        <Part2 part2={props.part2} exercises2={props.exercises2}/>
        <br />
        <Part3 part3={props.part3} exercises3={props.exercises3}/>
      </div>
    </>
  )

}

const Total = (props) => {
  
  return (
    <>
    <br />
    <h3>Excercise total:</h3>
    <p>{props.exercises1+props.exercises2+props.exercises3}</p>
    </>
  )

}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content part1 = {part1} part2 = {part2} part3 = {part3}
      exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </div>
  )
}

export default App
