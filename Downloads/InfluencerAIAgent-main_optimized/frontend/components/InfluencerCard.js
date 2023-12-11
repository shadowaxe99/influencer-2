import React from 'react'
function InfluencerCard({ influencer, error }) {
  if (error) {
    return <div className='error-message'>Error loading influencer data: {error.message}</div>
  }
  return (
    <div className="card">
      <div className="card-header">
        <h3>{influencer.name}</h3>
      </div>
      <div className="card-content">
        <img src={influencer.profilePicture} alt='Profile' className='profile-image' />
        <p>{influencer.description}</p>
        <p>Followers: {influencer.followers}</p>
        <div className='social-links'>
          <p>Connect with {influencer.name}:</p>
          <ul>
            {influencer.twitter && (<li>Twitter: <a href={influencer.twitter}>@{influencer.twitter}</a></li>)}
            {influencer.instagram && (<li>Instagram: <a href={influencer.instagram}>@{influencer.instagram}</a></li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default InfluencerCard
