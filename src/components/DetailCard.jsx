import React from 'react'
import { GoLocation } from 'react-icons/go'
import { AiOutlineLink, AiOutlineTwitter } from "react-icons/ai"
import { MdOtherHouses } from 'react-icons/md';

import { useQuery } from 'react-query';
import EmptyCard from './EmptyCard';

const getUser = async (user) => {
  const response = await fetch(`https://api.github.com/users/${user}`);
  return await response.json();
}

const DetailCard = ({ user }) => {

  const {data, isLoading, isError, isSuccess, error} = useQuery(['getUser', user], () => getUser(user));

  console.log(data);

  if (isLoading) {
    return <EmptyCard text="Loading..."/>
    
  }

  if (isError) {
    return <EmptyCard text="Error. Please try again."/>
  }

  if (data.message === "Not Found") {
    return <EmptyCard text="The user you search does not exist."/>
  }

  return (
    <div className='detail-container'>
      <div className='detail-left'>
        <img
          className="avatar" 
          src={data.avatar_url}
          alt="avatar-user" 
        />
      </div>
      <div className='detail-right'>
        <h5 className="detail-name">{data.name}</h5>
        <span className="detail-username">#{data.login}</span>
        <div className='detail-user-info'>
          <div className='detail-user-data'>
            <span>Repos</span>
            <small>{data.public_repos}</small>
          </div>
          <div className='detail-user-data'>
            <span>Followers</span>
            <small>{data.followers}</small>
          </div>
          <div className='detail-user-data'>
            <span>Following</span>
            <small>{data.following}</small>
          </div>
        </div>
        <div className='detail-user-links'>
          <div className='detail-user-links-block'>
            <a href="#"><GoLocation/> {data.location ?? 'Not available'}</a>
            <a href="#"><AiOutlineLink/> {data.blog ?? 'Not available'}</a>
          </div>
          <div className='detail-user-links-block'>
            <a href="#"><AiOutlineTwitter/> {data.twitter_username ?? 'Not available'}</a>
            <a href="#"><MdOtherHouses/> {data.company ?? 'Not available'}</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailCard