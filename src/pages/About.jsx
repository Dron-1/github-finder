import {FaHome} from 'react-icons/fa'
import picture from '../components/layout/assets/dron_pic.jpeg'
import {Link } from 'react-router-dom'
import Home from './Home'

function About() {
  return (
    <div className="card card-side mx-auto bg-gray-800 shadow-xl">
      <figure className='w-64'>
      <img src={picture} alt="Dron Chandna" />
      </figure>
      <div className="card-body">
        <div className="card-title">
          <h2 className='text-6xl mx-auto'>
            Github Finder
          </h2>
        </div>
        <p className='text-xl'>
          Github Finder is an app that is used to search any user on github and see
          their profiles in a beautiful interface.
          <br />
          Version: <span className='text-xl text-white pl-1 font-semibold'>1.0.0</span>
          <br />
          Created By: <span className='text-xl text-white pl-1 font-semibold'>Dron Chandna</span>
          <br />
          Github Repo Link: 
          <a href = "https://github.com/Dron-1/github-finder/tree/master" target='_blank' 
          className='text-xl text-blue-600 pl-1 font-lighter'>Code</a>
        </p>
        <div className="card-actions justify-center">
          <Link to = "/" className='btn btn-lg btn-primary'>
            <FaHome className='mr-2'/>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About