import React from 'react';
import Share from '../share';
import Flag from '../flag'
import Like from './like'
import Comment from '../comment'



const LikeandComment =()=>{
  return(<div className="div_btm">
  <div className="btm_list">
    <ul>
      <Share/>
      <Flag/>
      <Like/>
      <Comment/>
    </ul>
  </div>
</div>)
}

export default LikeandComment