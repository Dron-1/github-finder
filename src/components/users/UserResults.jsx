import {useEffect, useState} from 'react'
import Spinner from '../layout/Spinner'
import UserItems from './UserItems'

/*| Using personal github token  increase the request rate-limit from 10req/min to 30req/min |*/
function UserResults() {
  const [users,setUsers] = useState([])
  const [loading, setLoading] = useState(true)
    
  useEffect(()=>{
    getUsersList();
  },[])  

  const getUsersList = async () =>
  {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_API}/users`,{
        headers : {
            Authorization : `token ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
    })
    const data = await response.json()
    setUsers(data);
    setLoading(false);
  } 

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