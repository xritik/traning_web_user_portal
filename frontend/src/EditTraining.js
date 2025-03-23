import React, { useState, useEffect } from 'react';

const EditTraining = ({ HOST, setMessage, navigate }) => {

    const [id, setId] = useState('');
    const [trainingData, setTrainingData] = useState({
        trainingName: '',
        technology: '',
        vendor: '',
        companyName: '',
        trainerName: '',
        email: '',
        contact: '',
        labUsed: '',
        startDate: '',
        endDate: '',
        remarks: '',
        invoiceDate: '',
        releaseDate: '',
        paymentAmount: ''
    });

    useEffect(() => {
        const training = localStorage.getItem('trainingToEdit');
        if (!training) {
            navigate('/search');
        } else {
            setId(JSON.parse(training)._id);
        }
    }, []);
    
    
    const loginName = localStorage.getItem('loginName');
    useEffect(() => {
        if (!loginName) {
            navigate('/login');
        }else{
            const fetchUser = async () => {
                try {
                    const response = await fetch(`http://${HOST}:5000/user/${loginName}`);
            
                    const data = await response.json();
                    if (data.user.role === 'read') {
                        alert('You have no such permissions to edit trainings');
                        localStorage.removeItem('trainingToEdit');
                        navigate('/search');
                    }
                } catch (error) {
                    alert('Something went wrong, Please try again');
                    localStorage.removeItem('trainingToEdit');
                    navigate('/search');
                }
            }
            fetchUser();
        }
    }, [ loginName, navigate ]);


    useEffect(() => {
        if (id) {  // Ensure id is not empty before fetching
            const fetchTraining = async () => {
                try {
                    const response = await fetch(`http://${HOST}:5000/trainings/${id}`);
                    const data = await response.json();
                    if (response.ok) {
                        setTrainingData(data);
                    } else {
                        setMessage(data.message);
                    }
                } catch (error) {
                    console.error('Error fetching training data:', error);
                    setMessage('Failed to fetch training data.');
                }
            };
    
            fetchTraining();
        }
    }, [ id, setMessage ]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrainingData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const updateTraining = async () => {
        try {
            const response = await fetch(`http://${HOST}:5000/trainings/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trainingData),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                localStorage.removeItem('trainingToEdit');
                navigate('/search');
                alert('Successfully Updated!!');
            } else {
                setMessage(data.message);
                navigate('/search');
            }
        } catch (error) {
            console.error('Error updating training:', error);
            setMessage('Failed to update training.');
            navigate('/search');
        }
    };

    const cancelUpdating = () => {
        localStorage.removeItem('trainingToEdit');
        navigate('/search')
    }

    return (
        <section>
            <nav>
                <span className='brandName'>Training</span>
                <span className='navbarItem'>
                    {/* <span><Link className='navbarItems' to={'/dashboard'}>Dashboard</Link></span>
                    <span><Link className='navbarItems' to={'/search'}>Search Data</Link></span> */}
                </span>
                <span className='logout'>
                    <button onClick={() => { localStorage.clear(); navigate('/login'); }}>LogOut</button>
                </span>
            </nav>
            <div className='heading'>Edit Training</div>
            <div className='addTaining'>
                <form className='addTainingForm' onSubmit={(e) => { e.preventDefault() }}>
                    <div className='formDiv'>
                        <input
                            type='text'
                            required
                            autoFocus
                            placeholder='Training Name'
                            name='trainingName'
                            value={trainingData.trainingName}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type='text'
                            required
                            placeholder='Technology'
                            name='technology'
                            value={trainingData.technology}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='formDiv'>
                        <input
                            type='text'
                            required
                            placeholder='Vendor'
                            name='vendor'
                            value={trainingData.vendor}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type='text'
                            required
                            placeholder='Company Name'
                            name='companyName'
                            value={trainingData.companyName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='formDiv'>
                        <input
                            type='text'
                            required
                            placeholder='Trainer Name'
                            name='trainerName'
                            value={trainingData.trainerName}
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type='email'
                            required
                            placeholder='Email'
                            name='email'
                            value={trainingData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='formDiv'>
                        <input
                            type='tel'
                            required
                            placeholder='Mob. no.'
                            name='contact'
                            value={trainingData.contact}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='formDivDate'>
                        <label>Start Date:
                            <input
                                type='date'
                                required
                                name='startDate'
                                value={trainingData.startDate}
                                onChange={handleChange}
                            />
                        </label>
                        <label>End Date:
                            <input
                                type='date'
                                required
                                name='endDate'
                                value={trainingData.endDate}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className='formDiv'>
                        <textarea
                            placeholder='Remarks'
                            required
                            name='remarks'
                            value={trainingData.remarks}
                            onChange={handleChange}
                        />
                        <br />
                        <label htmlFor="yesNo" className='select'>Labs Used:
                            <select
                                required
                                name='labUsed'
                                value={trainingData.labUsed}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </label>
                    </div>
                    <div className='paymentSection'>
                        <p>Payment*</p>
                        <div className='formDivDate'>
                            <label>Invoice Date:
                                <input
                                    type='date'
                                    required
                                    name='invoiceDate'
                                    value={trainingData.invoiceDate}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>Release Date:
                                <input
                                    type='date'
                                    required
                                    name='releaseDate'
                                    value={trainingData.releaseDate}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <div className='formDiv'>
                            <input
                                type='text'
                                required
                                placeholder='Payment Amount in INR.'
                                name='paymentAmount'
                                value={trainingData.paymentAmount}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='submitButton' style={{gap:'20px'}}>
                        <button onClick={cancelUpdating} style={{backgroundColor:'red'}}>Cancel</button>
                        <button onClick={updateTraining}>Update Training</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default EditTraining;
