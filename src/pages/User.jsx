import {FaUserFriends, FaCodepen, FaStore, FaUsers} from 'react-icons/fa'
import {useContext, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import Spinner from '../components/layout/Spinner';
import GithubContext from '../components/context/github/GithubContext'
import RepoList from '../components/repos/RepoList';

function User() {
  const {user, repos, getUser, loading, getUserRepos} = useContext(GithubContext);
  const params = useParams()

  useEffect(()=>{
    getUser(params.login);
    getUserRepos(params.login);
  },[])

  /*| Destructuring |*/
  const {
    name, type, avatar_url, location, bio, blog, twitter_username, login, html_url, followers,
    following, public_repos, public_gists, hireable,
  } = user;
  /*| --------------------------------------------------------------------------------------- |*/
  
  if(loading)
    return <Spinner />
    
  return (
    <>
        <div className="w-full mx-auto lg:w-10/12">
          <div className="mb-4">
            <Link to = "/" className='btn btn-ghost'>
              Back to Search
            </Link>
          </div>
          
          {/* grid-cols-1 = grid-template-columns: repeat(1,1fr) property through which we tells the size of each column in grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
            <div className="custom-card-image mb-6 md:mb-0">
              {/* image-full means grid-column-start: 1; grid-row-start: 1; - try to play with this  */}
              <div className="card rounded-lg shadow-xl image-full">
                <figure>
                  <img src={avatar_url} alt= {login} />
                </figure>
                <div className="card-body justify-end">
                  <h2 className="card-title mb-0">
                    {name}
                  </h2>
                  <span>{login}</span>
                </div>
              </div>
            </div> {/* end of card */}
            
            <div className="col-span-2">
              <div className="mb-6">
                <h1 className='text-3xl card-title'>
                  {name}
                  <div className="badge badge-success ml-2 mr-1">
                    {type}
                  </div>

                  {/* show hireable badge only if hireable is true */}
                  {hireable && (
                    <div className="badge badge-info mx-1">
                      Hireable
                    </div>
                  )}
                </h1>
                
                <p>{bio}</p>
                
                <div className="card-actions mt-4">
                  <a 
                    href={html_url} 
                    target = '_blank'
                    rel='noreferrer'
                    className='btn btn-outline' 
                  >
                    Visit Github Profile
                  </a>
                </div>
              </div>
              
              {/* showing stats */}
              <div className="w-full stats rounded-lg shadow-md bg-base-100">
                    {/* showing location only if it is available */}
                    {location && (
                      <div className="stat">
                        <div className="stat-title text-md">Location</div>
                        <div className="stat-value text-lg">{location}</div>
                      </div>
                    )}
                    {/* showing webiste only if it is available */}
                    {blog && (
                      <div className="stat">
                        <div className="stat-title text-md">Website/Blog</div>
                        <div className="stat-value text-lg">
                          <a href={`https://${blog}`} target="_blank" rel='noreferrer'>{blog}</a>
                        </div>
                      </div>
                    )}
                    {/* showing webiste only if it is available */}
                    {twitter_username && (
                      <div className="stat">
                        <div className="stat-title text-md">Twitter</div>
                        <div className="stat-value text-lg">
                          <a href={`https://twitter.com/${twitter_username}`} target="_blank" rel='noreferrer'>{twitter_username}</a>
                        </div>
                      </div>
                    )}
              </div>
            </div>   
          </div>
          <div className="w-full stats py-5 mb-6 rounded-lg shadow-md bg-base-100">
            {/* ....................Followers Stats................... */}
            <div className="stat">
              {/* followers icon */}
              <div className="stat-figure text-secondary">
                <FaUsers className='text-3xl md:text-5xl'/>
              </div>
              {/* followers label */}
              <div className="stat-title pr-5">
                Followers
              </div>
              {/* followers actual value */}
              <div className="stat-value pr-5 text-3xl md:text-4xl">
                {followers}
              </div>
            </div>
            {/* ....................Following Stats................... */}
            <div className="stat">
              {/* followings icon */}
              <div className="stat-figure text-secondary">
                <FaUserFriends className='text-3xl md:text-5xl'/>
              </div>
              {/* followings label */}
              <div className="stat-title pr-5">
                Following
              </div>
              {/* following actual value */}
              <div className="stat-value pr-5 text-3xl md:text-4xl">
                {following}
              </div>
            </div>
            {/* ....................Public Repos Stats................... */}
            <div className="stat">
              {/* Public Repos icon */}
              <div className="stat-figure text-secondary">
                <FaCodepen className='text-3xl md:text-5xl'/>
              </div>
              {/* Public Repos label */}
              <div className="stat-title pr-5">
              Public Repos
              </div>
              {/* Public Repos actual value */}
              <div className="stat-value pr-5 text-3xl md:text-4xl">
                {public_repos}
              </div>
            </div>
            {/* ....................Public Gists Stats................... */}
            <div className="stat">
              {/* Public Gists icon */}
              <div className="stat-figure text-secondary">
                <FaStore className='text-3xl md:text-5xl'/>
              </div>
              {/* Public Gists label */}
              <div className="stat-title pr-5">
              Public Gists
              </div>
              {/* Public Gists actual value */}
              <div className="stat-value pr-5 text-3xl md:text-4xl">
                {public_gists}
              </div>
            </div>
          </div>
          <RepoList repos = {repos}/>
        </div>
    </>
  )
}

export default User