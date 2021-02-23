import React from 'react';
import Share from '../share/Index';
import Flag from '../Flag/Index'
import Like from './Like/Index'
import Comment from '../Comment/Index'



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