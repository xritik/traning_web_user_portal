import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';

const Dashboard = ({logout, navigate, message, setMessage}) => {

    const loginEmail = localStorage.getItem('loginEmail');
    useEffect (() => {
        if(!loginEmail){
            navigate('/login')
            console.log(loginEmail);
        }
    },);
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
        <div className='dashboardText'>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent gravida lorem non ex efficitur, sed ultricies nulla fringilla. Duis feugiat, mauris vel tempor tempor, velit erat euismod libero, ut condimentum felis eros ac arcu. Vivamus vitae tortor eu nisi pellentesque luctus nec a magna. Integer id nulla non purus cursus fermentum. Pellentesque quis dapibus nibh. Maecenas et vehicula neque, nec lacinia eros. Sed faucibus, nulla sit amet sollicitudin scelerisque, ipsum mi volutpat neque, eget volutpat erat metus ut arcu. Nam id luctus sem. Nulla in turpis in sem rhoncus ultrices at sed neque. Aenean sagittis, neque non lacinia euismod, magna lacus laoreet eros, id sagittis mi magna ac elit. Suspendisse a dolor sit amet metus volutpat vestibulum. Aliquam efficitur justo nec velit eleifend porttitor. Proin at fermentum purus. Integer quis ligula luctus, porttitor velit non, fermentum risus. Vivamus tincidunt justo in libero aliquet posuere. Nulla ut arcu dapibus, condimentum elit non, cursus felis. Pellentesque malesuada, mauris eget scelerisque tincidunt, urna mauris venenatis velit, nec vestibulum turpis enim vel urna. Donec quis scelerisque ex. Cras blandit dictum dolor, at pharetra orci hendrerit eget. Nam aliquam arcu quis libero pharetra, ut gravida justo faucibus.
            </p>
        </div>
    </section>
  )
}

export default Dashboard;