import { useContext } from 'react'
import Spinner from '../layout/Spinner'
import UserItems from './UserItems';
import GithubContext from '../context/github/GithubContext'

/*| Using personal github token  increase the request rate-limit from 10req/min to 30req/min |*/
function UserResults() {
  // const {users, loading, getUsersList} = useContext(GithubContext);

  /*| Deleting this useEffect coz we have getUsersList only for testing purpose |*/
  // useEffect(()=>{
  //   getUsersList();
  // }, [])  

  const { users, loading } = useContext(GithubContext);

  if(!loading)
  {
    return (
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
            {
                users.map((user)=>(
                    <UserItems key={user.id} item = {user}/>
                ))
            }
        </div>
    )
  }
  else{
    return <Spinner />
  }
  
}

export default UserResults