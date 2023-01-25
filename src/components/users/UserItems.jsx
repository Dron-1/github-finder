import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

/*| {user : login, avatar_url} we are destructing the object |*/
/*| it is same as login = user.login and avatar_url = user.avatar_url |*/
function UserItems({item : {login, avatar_url} }) {
  return (
    <div className='card shadow-md compact side bg-base-100'>
        <div className='card-body flex-row items-center space-x-4'>
            <div className='avatar'>
                <div className='rounded-full shadow w-14 h-14'>
                    <img src={avatar_url} alt="Profile" />
                </div>
            </div>
        </div>
        <div>
            <h2 className='card-title'>{login}</h2>
            <Link className = "text-base-content text-opacity-40" to={`/users/${login}`} >
                Visit Profile
            </Link>
        </div>
    </div>
  )
}

UserItems.propTypes = {
    item: PropTypes.object.isRequired,
}

export default UserItems