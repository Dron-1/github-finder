/*| Hero is a component for displaying a large box or image with a title and description. |*/
import {FaHome} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="hero">
        <div className="hero-component text-center">
            <div className='w-max-lg'>
                <h1 className="text-8xl mb-8 font-bold">
                    Oops!
                </h1>
                <p className='font-bold text-5xl mb-8'>404 - Page not found!</p>
                <Link to = "/" className='btn btn-lg btn-primary'>
                    <FaHome className='mr-2'/>
                    Back to home
                </Link>
            </div>
        </div>
    </div>
  )
}

export default NotFound