import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

//line13 displays but no handler
    //TODO:     // todo: name,reps,weight,unit,date

function Exercise({ exercise, onDelete, onEdit }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><MdEdit onClick={() => onEdit(exercise)}/></td>
            <td><MdDeleteForever onClick = { () => onDelete(exercise._id)}/></td>
        </tr>
    );
}

export default Exercise;