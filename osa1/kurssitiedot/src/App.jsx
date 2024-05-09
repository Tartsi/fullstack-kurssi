import { useEffect, useState } from "react"

const Header = (props) => {

  return (
    <>
    <h1>
      {props.course}
    </h1>
    </>
  )

}

const Part = (props) => {
  
  const partName = props.name
  const exerciseAmount = props.excercise
  
  return ( 
    <>
    <h4>Part: {partName}</h4>
    <h4>Exercise amount: {exerciseAmount}</h4>
    </>
    )
  
}

const Total = (props) => {

  const { parts } = props
  const total = parts.reduce((sum, part) => sum + part[2], 0)

  return (
    <div>
      total of {total} excercises
    </div>
  )

}

const Content = (props) => {

  const { parts } = props

  return (
    <>
    <h2>
      Content:
    </h2>
    <div>
      {parts.map(part =>
        <Part key={part[0]} name={part[1]} excercise={part[2]}/>
      )}
      <Total parts={parts}/>
    </div>
    </>
  )

}

const Course = (props) => {

  const { course } = props
  const courseName = course.name
  const courseParts = course.parts.map(part => [part.id, part.name, part.exercises])

  
  return (
    <div>
      <Header course={courseName}/>
      <Content parts={courseParts}/>
    </div>
  )

}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App