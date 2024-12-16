import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import dashboardImage from './imgs&vdos/dashboard_img.webp';

const Dashboard = ({logout, navigate, message, setMessage}) => {

    const loginEmail = localStorage.getItem('loginEmail');
    const [allTrainings, setAllTrainings] = useState([]);
    const [upcomingTrainings, setUpcomingTrainings] = useState([]);
    const [ongoingTrainings, setOngoingTrainings] = useState([]);
    const [completedTrainings, setCompletedTrainings] = useState([]);
    const currentDate = new Date();


    const fetchTrainings = async () => {
        try{
            const response = await fetch('http://localhost:5000/trainings/all');
            const data = await response.json();
            if(response.ok){
                setAllTrainings(data);
                setUpcomingTrainings((data.filter(training => new Date(training.startDate) > currentDate)));
                setOngoingTrainings((data.filter(training => new Date(training.startDate) <= currentDate && new Date(training.endDate) >= currentDate)));
                setCompletedTrainings((data.filter(training => new Date(training.endDate) < currentDate)));
            }
        }catch(error){
            console.error('Something went wrong', error);
        }
    }


    useEffect (() => {
        if(!loginEmail){
            navigate('/login')
            console.log(loginEmail);
        }else{
            fetchTrainings();
        }
    }, [loginEmail, navigate]);

    
  return (
    <section>
        <nav>
            <span className='brandName'>Training</span>
            <span className='navbarItem'>
                <span><Link className='navbarItems' to={'/add_training'}>Add Training</Link></span>
                <span><Link className='navbarItems' to={'/search'}>Search Data</Link></span>
            </span>
            <span className='logout'>
                <button onClick={logout}>LogOut</button>
            </span>
        </nav>
        <div className='dashboard'>
            <div className='dashboardText'>
                <div className='dashboardHeading'>Welcome to You!</div>
                <p><i>Hello dear, here you can manage your trainings.</i></p>
                <div className='trainingNos'>
                    <p>Total Trainings: {allTrainings.length || 'Loading...'}</p>
                    <p>Upcoming Trainings: {upcomingTrainings.length}</p>
                    <p>Ongoing Trainings: {ongoingTrainings.length}</p>
                    <p>Completed Trainings: {completedTrainings.length}</p>
                </div>
            </div>
            <div className='dashboardImage'>
                <img src={dashboardImage} alt='img'/>
            </div>
        </div>

        <hr/>

        <div className='showTrainingSection'>
            <div className='showTrainings'>
                <h1>Upcoming Trainings</h1>
                {upcomingTrainings.length === 0 && <p style={{marginTop:'40px', textAlign:'center', color:'red'}}>No such Upcoming Trainings!</p> }
                {upcomingTrainings.length > 0 && upcomingTrainings.map((training) => {
                    return(
                        <p key={training._id} className='trainings'>{`"${training.trainingName}" by ${training.vendor} from ${training.startDate.slice(-2)} to ${training.endDate.slice(-2)}/${training.endDate.slice(-5, -3)}/${training.endDate.slice(-10,-6)}`}</p>
                    )
                })}
            </div>
            <div className='showTrainings'>
                <h1>Ongoing Trainings</h1>
                {ongoingTrainings.length === 0 && <p style={{marginTop:'40px', textAlign:'center', color:'red'}}>No such Ongoing Trainings!</p> }
                {ongoingTrainings.length > 0 && ongoingTrainings.map((training) => {
                    return(
                        <p key={training._id} className='trainings'>{`"${training.trainingName}" by ${training.vendor} from ${training.startDate.slice(-2)} to ${training.endDate.slice(-2)}/${training.endDate.slice(-5, -3)}/${training.endDate.slice(-10,-6)}`}</p>
                    )
                })}
            </div>
            <div className='showTrainings'>
                <h1>Completed Trainings</h1>
                {completedTrainings.length === 0 && <p style={{marginTop:'40px', textAlign:'center', color:'red'}}>No such Completed Trainings!</p> }
                {completedTrainings.length > 0 && completedTrainings.map((training) => {
                    return(
                        <p key={training._id} className='trainings'>{`"${training.trainingName}" by ${training.vendor} from ${training.startDate.slice(-2)} to ${training.endDate.slice(-2)}/${training.endDate.slice(-5, -3)}/${training.endDate.slice(-10,-6)}`}</p>
                    )
                })}
            </div>
        </div>
    </section>
  )
}

export default Dashboard;