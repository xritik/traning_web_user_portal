import React from 'react'

const AddTraining = () => {
  return (
    <section>
        <nav>
            <span className='brandName'>Training</span>
            <span className='navbarItem'>
                <span>Dashboard</span>
                <span>Search Data</span>
            </span>
            <span className='logout'>
                <button>LogOut</button>
            </span>
        </nav>
        <div className='heading'>Add new Training</div>
        <div className='addTaining'>
            <form className='addTainingForm'>
                <div className='formDiv'>
                    <input type='text' required placeholder='Training Name'/> <br/>
                    <input type='text' required placeholder='Technology'/>
                </div>
                <div className='formDiv'>
                    <input type='text' required placeholder='Vender'/> <br/>
                    <input type='text' required placeholder='Company Name'/>
                </div>
                <div className='formDiv'>
                    <label>Start Date: <input type='date'required/></label>
                    <label>End Date: <input type='date'required/></label>
                </div>
                <div className='formDiv'>
                    <textarea placeholder='Remarks'required/> <br/>
                    <label for="yesNo" className='select'>Labs Used:
                        <select required>
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