//Added in Stage 5

/*| This is a Actions files basically collection of functions which can be use |*/
/*| in other components. These functions are now out of Context file so that  |*/
/*| context file can look clean and more understandable |*/ 


/*| Using Axios to make request |*/

import axios from 'axios'
const GITHUB_API = process.env.REACT_APP_GITHUB_API;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
    baseURL: GITHUB_API,
    //headers: {Authorization: `token ${GITHUB_TOKEN}`}
});


export const searchUsers = async(text) => {
    //setLoading()          //can not be used here since it is not defined in this file
    const params = new URLSearchParams({
        q: text
    })

    /*| without axios |*/
    // const response = await fetch(`${GITHUB_API}/search/users?${params}`)
    // const { items } = await response.json()

    /*| with axios |*/
    const response = await github.get(`/search/users?${params}`)
    return response.data.items;
} 

/*| Merging getUser and getUserRepos func |*/

export const getUserAndRepos = async(login) => {
    const [ user, repos ] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`)
    ])

    return { user: user.data, repos: repos.data}
} 

/*| un-collapse to see the old functions |*/
/* 
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
} */