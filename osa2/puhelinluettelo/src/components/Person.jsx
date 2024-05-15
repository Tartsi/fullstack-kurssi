const Persons = ({persons}) => {

  return (
    <div>
        {persons.map(person =>
            <p key={person.name}>
            Name: {person.name} / Number: {person.number}
            </p>
        )}
    </div>
  )

}

export default Persons