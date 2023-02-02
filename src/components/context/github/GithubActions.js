//Added in Stage 5

/*| This is a Actions files basically collection of functions which can be use |*/
/*| in other components. These functions are now out of Context file so that  |*/
/*| context file can look clean and more understandable |*/
const GITHUB_API = process.env.REACT_APP_GITHUB_API;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

//function to search users based on text
//export keyword must be added now.
export const searchUsers = async(text) => {
    //setLoading()          //can not be used here since it is not defined in this file
    const params = new URLSearchParams({
        q: text
    })

    const response = await fetch(`${GITHUB_API}/search/users?${params}`)

    /*| response is an object now, which has property items that contains list of matching users |*/
    /*| destructuring items from response object |*/
    const { items } = await response.json()

    /*| can not be used here because it is not defined here, is defined in context file. |*/
    // dispatch({
    //     type: 'GET_USERS',
    //     payload : items
    // })

    return items;
} 

//function to show details of single User
export const getUser = async(login) => {
    //setLoading();

    const response = await fetch(`${GITHUB_API}/users/${login}`) ;

    if(response.status === 404)
    {
      window.location = '/notfound';
    }
    else
    {
      const data = await response.json();

    //   dispatch({
    //     type: 'GET-USER',
    //     payload: data,
    //   })
    return data;
    }
}

  // function to get array of user repos
export const getUserRepos = async (login) => {
    // setLoading();

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10
    })

    const response = await fetch(`${GITHUB_API}/users/${login}/repos?${params}`);
    const data = await response.json();
    
    // dispatch({
    //   type: 'GET-USER-REPOS',
    //   payload: data,
    // })
    return data;
}