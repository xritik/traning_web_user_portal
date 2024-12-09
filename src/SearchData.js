import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SearchData = (logout) => {

    const [searchedText, setSearchedText] = useState('');
    const [searchedData, setSearchedData] = useState([]);
    const [message, setMessage] = useState('');
    console.log(searchedData.length)

    const handleSearch = async () => {
        if (!searchedText.trim()) {
            setSearchedData([]); // Clear data
            setMessage("");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/search/${searchedText}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({ searchedText }),
                // credentials: 'include',  // Include cookies (session)
            });
    
            const data = await response.json();
            if (response.ok) {
                setSearchedData(data.results);
            } else {
                setMessage(data.message);  // Error message
                setSearchedData([]);
                console.log('Error :- ', data.message)
            }
        } catch (error) {
            console.error("Error searching data:", error);
            setMessage('An error occurred. Please try again.');
        }
    };
  return (
    <section>
        <nav>
            <span className='brandName'>Training</span>
            <span className='navbarItem'>
                <span><Link className='navbarItems' to={'/dashboard'}>Dashboard</Link></span>
                <span><Link className='navbarItems' to={'/add_training'}>Add Training</Link></span>
            </span>
            <span className='logout'>
                <button onClick={logout}>LogOut</button>
            </span>
        </nav>
        <div className='heading'>Search Data</div>
        <div className='searchDiv'>
            <form className='searchForm' onSubmit={ (e) => {e.preventDefault(); handleSearch()}}>
                <input
                    type='text'
                    required
                    autoFocus 
                    placeholder='Search...'
                    value={searchedText}
                    onChange={(e) => setSearchedText(e.target.value)}
                />
                <span className='cross'>
                    <i className='bx bx-x'></i>
                </span>
                <span className='searchIcon'>
                    <i className='bx bx-search' onClick={handleSearch}></i>
                </span>
            </form>
        </div>
        {searchedData.length == 0 &&
            <p style={{textAlign: 'center', color:'red', paddingTop:'25px'}}>{message}</p>
        }
        {
            searchedData.length > 0 && 
            <>
                <div className='dataTable'>
                    <table>
                        <thead>
                            <tr>
                                <th>Training Name</th>
                                <th>Technology</th>
                                <th>Vendor</th>
                                <th>Company Name</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Remarks</th>
                                <th>Labs Used</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchedData.map((data) => {
                                return(
                                    <tr key={data._id}>
                                        <td>{data.trainingName}</td>
                                        <td>{data.technology}</td>
                                        <td>{data.vendor}</td>
                                        <td>{data.companyName}</td>
                                        <td>{data.email}</td>
                                        <td>{data.contact}</td>
                                        <td>{data.startDate}</td>
                                        <td>{data.endDate}</td>
                                        <td>{data.remarks}</td>
                                        <td>{data.labUsed}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        }
    </section>
  )
}

export default SearchData