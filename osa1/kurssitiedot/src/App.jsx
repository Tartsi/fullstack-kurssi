const Header = (props) => {

  return (
    <>
    <h1>
      {props.text}
    </h1>
    </>
  )

}

const Part = (props) => {
  
  const partName = props.name
  const exerciseAmount = props.excercise
  
  return ( 
    <>
    <p>{partName} {exerciseAmount}</p>
    </>
    )
  
}

const Total = (props) => {

  const { parts } = props
  const total = parts.reduce((sum, part) => sum + part[2], 0)

  return (
    <div>
      <h4>total of {total} excercises</h4>
    </div>
  )

}

const Content = (props) => {
  
  const courseParts = props.coursePart.map(part => [part.id, part.name, part.exercises])

  return (
    <>
    <div>
      <h2>{props.courseHeader}</h2>
      {courseParts.map(part =>
        <Part key={part[0]} name={part[1]} excercise={part[2]}/>
      )}
      <Total parts={courseParts}/>
    </div>
    </>
  )

}

const Course = (props) => {

  return (
    <div>
      <Header text={'Web development curriculum'}/>
      {props.course.map(course => 
        <Content key={course.id} courseHeader={course.name} coursePart={course.parts}/>
      )}
    </div>
  )

}

const App = () => {

  const courses = [
    {
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course course={courses} />
    </div>
  )
}

export default App