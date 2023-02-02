import {Link} from 'react-router-dom';
import {FaGithub} from 'react-icons/fa'
import PropTypes from 'prop-types';

function Navbar({title}) {
  return (
    <nav>
      <div className="navbar mb-12 shadow-lg bg-neutral text-neutral-content">
        <div className="container mx-auto">
          <div className="flex-none px-2 mx-2">
            <FaGithub className='inline text-3xl pr-2'/>
            <Link to="/" className='font-bold text-lg align-middle'>{title}</Link>
          </div>
          <div className="flex-1 px-2 mx-2">
            <div className="flex justify-end">
              <Link to="/" className='btn btn-ghost btn-sm rounded'>
                Home
              </Link>
              <Link to="/about" className='btn btn-ghost btn-sm rounded'>
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

Navbar.defaultProps = {
  title : 'Github Finder',
}

Navbar.propTypes = {
  title : PropTypes.string,
}
export default Navbar