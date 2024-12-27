import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import dashboardImage from './imgs&vdos/dashboard_img.webp';

const Dashboard = ({logout, navigate, message, setMessage}) => {

    const loginName = localStorage.getItem('loginName');
    const [allTrainings, setAllTrainings] = useState([]);
    const [upcomingTrainings, setUpcomingTrainings] = useState([]);
    const [ongoingTrainings, setOngoingTrainings] = useState([]);
    const [completedTrainings, setCompletedTrainings] = useState([]);
    const [daysLeft, setDaysLeft] = useState('');
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
        if(!loginName){
            localStorage.removeItem('loginName');
            navigate('/login')
            console.log(loginName);
        }else{
            fetchTrainings();
        }
    }, [loginName, navigate]);

    useEffect(() => {
        if (upcomingTrainings.length > 0) {
            const startDate = new Date(upcomingTrainings[0].startDate);
            const today = new Date();
            setDaysLeft(parseInt((startDate - today) / (1000*60*60*24)))
        } else {
            console.log("No upcoming trainings");
        }
    }, [upcomingTrainings]);
    


    
  return (
    <section>
        <nav>
            <span className='brandName'>Training</span>
            <span className='navbarItem'>
                <span><Link className='navbarItems' to={'/add_training'}>Add Training</Link></span>
                <span><Link className='navbarItems' to={'/search'}>Search Data</Link></span>
                <span><Link className='navbarItems' to={'http://localhost:3001'}>Admin Panel</Link></span>
            </span>
            <span className='logout'>
                <button onClick={logout}>LogOut</button>
            </span>
        </nav>
        <div className='dashboard'>
            <div className='dashboardText'>
                <div className='dashboardHeading'>Welcome to You!</div>
                <p style={{padding:'5px'}}><i>Hello dear, here you can manage your trainings.</i></p>
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

        {upcomingTrainings.length > 0 && 
            <div style={{display:'flex', justifyContent:'center', paddingTop:'20px'}}>
                <div className='showUpcomingTrainings'>
                    <h1>Upcoming Trainings</h1>
                    {/* {upcomingTrainings.length === 0 && <p style={{marginTop:'40px', textAlign:'center', color:'red'}}>No such Upcoming Trainings!</p> } */}
                    <div className='dataTable'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Days left</th>
                                    <th>Training Name</th>
                                    <th>Technology</th>
                                    <th>Vendor</th>
                                    <th>Company Name</th>
                                    <th>Email</th>
                                    <th>Contact no.</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    {/* <th>Remarks</th> */}
                                    <th>Labs Used</th>
                                </tr>
                            </thead>
                            {upcomingTrainings.map((data) => {
                                return(
                                    <tbody key={data._id}>
                                        <tr>
                                            <td style={{color:'red'}}><b>{daysLeft}</b></td>
                                            <td>{data.trainingName}</td>
                                            <td>{data.technology}</td>
                                            <td>{data.vendor}</td>
                                            <td>{data.companyName}</td>
                                            <td>{data.email}</td>
                                            <td>{data.contact}</td>
                                            <td>{data.startDate}</td>
                                            <td>{data.endDate}</td>
                                            {/* <td>{data.remarks}</td> */}
                                            <td>{data.labUsed}</td>
                                            {/* <td className="editButtonDiv">
                                                <button onClick={() => handleEdit(data)} >Edit</button>
                                            </td> */}
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>
                    </div>
                </div>
            </div>
        }
        <div className='showTrainingSection'>
            <div className='showTrainings'>
                <h1>Ongoing Trainings</h1>
                {ongoingTrainings.length === 0 && <p style={{marginTop:'20px', textAlign:'center', color:'red'}}>No such Ongoing Trainings!</p> }
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