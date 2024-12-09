import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const AddTraining = ({ logout, setMessage, navigate }) => {
    const [trainingName, setTrainingName] = useState('');
    const [technology, setTechnology] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [vendor, setVendor] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [remarks, setRemarks] = useState('');
    const [labUsed, setLabUsed] = useState('')

    const addTraining = async () => {
        try {
            const response = await fetch('http://localhost:5000/add_training', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ trainingName, technology, vendor, companyName, email, contact, startDate, endDate, remarks, labUsed }),
                // credentials: 'include',  // Include cookies (session)
            });
    
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);  // Success message
                navigate('/add_training')
            } else {
                setMessage(data.message);  // Error message
            }
        } catch (error) {
            console.error("Error on adding a new training:", error);
            setMessage('An error occurred. Please try again.');
        }
    };


  return (
    <section>
        <nav>
            <span className='brandName'>Training</span>
            <span className='navbarItem'>
            <span><Link className='navbarItems' to={'/dashboard'}>Dashboard</Link></span>
            <span><Link className='navbarItems' to={'/search'}>Search Data</Link></span>
            </span>
            <span className='logout'>
            <button onClick={logout}>LogOut</button>
            </span>
        </nav>
        <div className='heading'>Add new Training</div>
        <div className='addTaining'>
            <form className='addTainingForm' onSubmit={(e) => {e.preventDefault(); addTraining()}}>
                <div className='formDiv'>
                    <input 
                        type='text' 
                        required 
                        autoFocus
                        placeholder='Training Name'
                        value={trainingName}
                        onChange={(e) => setTrainingName(e.target.value)}
                    />
                     <br/>
                    <input 
                        type='text'
                        required 
                        placeholder='Technology'
                        value={technology}
                        onChange={(e) => setTechnology(e.target.value)}
                    />
                </div>
                <div className='formDiv'>
                    <input 
                        type='text' 
                        required 
                        placeholder='Vendor'
                        value={vendor}
                        onChange={(e) => setVendor(e.target.value)}
                    /> 
                    <br/>
                    <input 
                        type='text' 
                        required 
                        placeholder='Company Name'
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>
                <div className='formDiv'>
                    <input 
                        type='email' 
                        required 
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /> 
                    <br/>
                    <input 
                        type='tel' 
                        required 
                        placeholder='Mob. no.'
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>
                <div className='formDivDate'>
                    <label>Start Date: 
                        <input 
                            type='date'
                            required
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        </label>
                    <label>End Date: 
                        <input 
                            type='date'
                            required
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        </label>
                </div>
                <div className='formDiv'>
                    <textarea 
                        placeholder='Remarks'
                        required
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                    /> 
                    <br/>
                    <label for="yesNo" className='select'>Labs Used:
                        <select 
                            required
                            value={labUsed}
                            onChange={(e) => setLabUsed(e.target.value)}
                        >
                            <option>Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </label>
                </div>
                <div className='submitButton'>
                    <button>Add Training</button>
                </div>
            </form>
        </div>
    </section>
  )
}

export default AddTraining;