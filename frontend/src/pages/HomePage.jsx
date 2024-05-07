import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Search from '../components/Search';
import SortRepos from '../components/SortRepos';
import ProfileInfo from '../components/ProfileInfo';
import Repos from '../components/Repos';
import Spinner from '../components/Spinner';

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("recent");

  const getUserProfileAndRepos = useCallback(async (username="nidhipawar5") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/profile/${username}`)
      const {repos, userProfile} = await res.json()

      repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)) //repos sorted as recent first
      setRepos(repos);
      setUserProfile(userProfile)

      // console.log("user profile: ", userProfile);
      // console.log("user repos: ", repos);

      return {userProfile, repos}

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);

  const onSearch = async (e, username) => {
    e.preventDefault()

    setLoading(true)
    setRepos([])
    setUserProfile(null)
    
    const {userProfile, repos} = await getUserProfileAndRepos(username)

    setUserProfile(userProfile)
    setRepos(repos)
    setLoading(false)

    setSortType("recent")

  }

  const onSort = (sortType) => {
    if(sortType === "recent"){
      repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)) //descending, recent will be displayed first
    }else if(sortType === "stars"){
      repos.sort((a,b) => b.stargazers_count - a.stargazers_count) //descending, most stars will be displayed first
    }else if(sortType === "forks"){
      repos.sort((a,b) => b.forks_count - a.forks_count) //descending, most forks will be displayed first)
    }
    setSortType(sortType)
    setRepos([...repos])
  }

  return (
    <div className='m-4'>
      <Search onSearch = {onSearch}/>
      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType}/>}
      <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
        {userProfile ? (
          <ProfileInfo userProfile={userProfile} />
        ) : (
          <div>Loading profile...</div>
        )}
        {!loading && <Repos repos={repos}/>}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default HomePage;
