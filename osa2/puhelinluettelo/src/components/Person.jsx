const Persons = ({persons, onClick}) => {

  return (
    <div>
        {persons.map(person =>
            <p key={person.id}>
            Name: {person.name} / Number: {person.number} / <button onClick={() => onClick(person.id)}>delete</button>
            </p>
        )}
    </div>
  )

}

export default Persons