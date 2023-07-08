import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css';


export const EditExercisePage = ({exerciseToEdit}) => {

    //TODO: name,reps,weight,unit,date
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate ();

    const editExercise = async () => {
        const editedExercise = {name,reps,weight,unit,date};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200){
            alert("Successfully added the exercise");
        } else{
            alert(`Failed to edit exercise, status code = ${response.status}`)
        }
        navigate("/");
    };



    //TODO: name,reps,weight,unit,date
    return (
        <div>
            <h1>Edit Exercise</h1>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(parseInt(e.target.value))} />
            <input
                type="number"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setWeight(parseInt(e.target.value))} />


            <select id="unit" value={unit} onChange={e => setUnit(e.target.value)}>
                <option value="lbs" >lbs</option>
                <option value="kgs">kgs</option>
            </select>

            <input
               type="text"
                placeholder="Enter date here"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button className='specbutton'
                onClick={editExercise}
                >Edit</button>

            <br></br>

            <Link to="/" className='button'>Home</Link>
            <br></br>
            <Link to="/add-exercise" className='button'>Add</Link>
            </div>
                );
            }

export default EditExercisePage;





