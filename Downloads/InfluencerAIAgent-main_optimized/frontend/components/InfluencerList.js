import React from 'react'
import InfluencerCard from './InfluencerCard'
function InfluencerList({ influencers }) {
if (influencers.length ==== 0) {
return <div>No influencers found.</div>
}
return (
<div>
{influencers.map((influencer) => (
<InfluencerCard key={influencer.id} influencer={influencer} />
))}
</div>
)
}
export default InfluencerList