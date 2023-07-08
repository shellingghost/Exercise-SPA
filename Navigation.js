import { Link, useNavigate } from 'react-router-dom';
import { React } from 'react';
import '../App.css';



function Navigation() {


    return (
        <>
            <Link to="/"className='button'>Home</Link>
            <Link to="/add-exercise"className='button'>Add</Link>
        </>
    );
}

export default Navigation;
