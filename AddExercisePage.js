import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css';



//todo: chedck todo's and navigate functionality)requirement for it to be on everypage) && add css
export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    // why are these auto casted to 'string' this early?
    // i think i cannot cast them appropriately for fear of junking testing up down the line
    const navigate = useNavigate ();
    


    const addExercise = async () => {
        //const name = name
        //const reps = parseInt(reps)
        //const weight = parseInt(weight)
        //const unit = unit
        //const date = date
        const newExercise = {name, reps, weight, unit, date};
        // string as typical javascript default, must convert for own uses


        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 201){
            alert("Successfully added the exercise");
        } else{
            console.log(response.status)
            alert(`Failed to add exercise, status code = ${response.status}`)
        }
        //todo:ask about push((navigate.push("/");))???? had to remove on     const onEdit = exercise =>{ in homepage

        navigate("/");
    };

    //TODO: ISSUE WITH PRESET ~ unit/selected---> write a function & use with onchange8**|google onchange& selected togethre*
    // todo: name,reps,weight,unit,date
    return (
        <div>
            <h1>Add Exercise</h1>
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

            
            <select id="unit" onChange={e => setUnit(e.target.value)}>
                <option selected value="lbs" >lbs</option>
                <option value="kgs">kgs</option>

            </select>

            <input
                type="text"
                placeholder="Enter date here"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button className='specbutton' 
                onClick={addExercise}
                >Add</button >
        </div>
    );
}

export default AddExercisePage;