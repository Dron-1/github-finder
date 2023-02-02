import {useState,useContext} from 'react'
import GithubContext from '../context/github/GithubContext';
import AlertContext from '../context/alert/AlertContext';
import {searchUsers} from '../context/github/GithubActions';

function UserSearch() {
  const [text,setText] = useState('');
//  const { users, searchUsers, clearUsers } = useContext(GithubContext);
  const {users, dispatch} = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);


  const handleChange = (e) => {
    setText(e.target.value);
  }

/*| has to add "async" coz await is used with searchUsers() fun |*/
  const handleSubmit = async (e) => {
    e.preventDefault();                                                                 
    if(text === '')
    {
        setAlert("Please enter something!","error")
    }
    else{
        //searchUsers(text)  
        /*| this above statement is changed by below dispatch,searchUsers, dispatch func |*/

        dispatch({type: 'SET-LOADING'})
        const users = await searchUsers(text);
        dispatch({
            type: 'GET_USERS',
            payload: users,
        });

        setText('')
    }
  }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'  >
        {/* divison for search */}
        <div>
            <form onSubmit={handleSubmit} >
                <div className="form-control">
                    <div className="relative">
                        {/* adding padding to right of input so that we can place button there */}
                        <input 
                            type="text" 
                            className='input input-lg w-full bg-gray-200 pr-40 text-black'
                            placeholder='Search Users'
                            value = {text}
                            onChange={handleChange}
                        />
                        <button 
                            type = 'submit'
                            className="btn btn-lg w-36 rounded-l-none absolute top-0 right-0"   
                        >
                            Go
                        </button>
                    </div>
                </div>
            </form>
        </div>
        {/* division for clear button */}
        {users.length !== 0 && (
            <div>
            <button 
                className='btn btn-ghost btn-lg'
                onClick={() => dispatch({type:'CLEAR-USERS'})}    
            >
                Clear
            </button>
        </div>
        )}
    </div>
  )
}

export default UserSearch