import React from 'react'

const SearchData = () => {
  return (
    <section>
        <nav>
            <span className='brandName'>Training</span>
            <span className='navbarItem'>
                <span>Dashboard</span>
                <span>Add Training</span>
            </span>
            <span className='logout'>
                <button>LogOut</button>
            </span>
        </nav>
        <div className='heading'>Search Data</div>
        <div className='searchDiv'>
            <form className='searchForm'>
                <input type='text' autoFocus placeholder='Search...'/>
                <span className='cross'>
                    <i className='bx bx-x'></i>
                </span>
                <span className='searchIcon'>
                    <i className='bx bx-search'></i>
                </span>
            </form>
        </div>
        <div className='dataTable'>
            <table>
                <thead>
                    <tr>
                        <th>Training Name</th>
                        <th>Technology</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Vendor</th>
                        <th>Company Name</th>
                        <th>Remarks</th>
                        <th>Labs Used</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Python</td>
                        <td>IT</td>
                        <td>2024-11-11</td>
                        <td>2024-11-16</td>
                        <td>Someone</td>
                        <td>Google</td>
                        <td>Very good</td>
                        <td>Yes</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
  )
}

export default SearchData