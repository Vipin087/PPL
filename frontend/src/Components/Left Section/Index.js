// import React, { useState, useEffect } from 'react';
// import axios from 'axios'
// import TimelineLeftCheckbox from "../TimeLine/leftCheckbox/Index";
// import TimelineProfile from "../TimeLine/profile/Index";
// import TimelineProfileInfo from "../TimeLine/profileInfo/Index";
// import Buttons from "../TimeLine/activityButton/Index";
// import UserInfo from "../TimeLine/UserInfo/Index";
// import CatButton from "../TimeLine/catButton/Index";
// import Steve from "../TimeLine/Steve/Index";
// import DateAndTime from "../TimeLine/DateAndTime/Index";
// import LeftImage1 from "../TimeLine/LeftImage1/Index";
// import LikeAndComment from "../TimeLine/Like and Comment/LikeandComment/Index";
// import DogButton from "../TimeLine/DogButton/Index";
// import LeftImage2 from "../TimeLine/LeftImage2/Index";
// import Address from '../../configs/config';



// const LeftSection =()=>{
//   const [word,setWord]=useState([])
//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/getImage")
//       .then((response) => {
//         console.log(response);
//         const extraVar=response.data
//         setWord(extraVar)
//         // extraVar.map(item=>{console.log(item.imageSchema)})
//       })
//       .catch((error) => {
//         console.log("jskjkla");
//       });
//   }, []);
//   return(<div className="content_lft">
//   <div className="contnt_1">
//     <TimelineLeftCheckbox />
//     <div className="timeline_div">
//       <div className="timeline_div1">
//         <TimelineProfile />
//         <TimelineProfileInfo />
//       </div>
//       <Buttons />
//     </div>
//   </div>
//   <div className="contnt_2">
//     <div className="div_a">
//       <UserInfo />
//       <CatButton />
//       <div className="div_top">
        
//       </div>
      
//       <LeftImage1 />
//     </div>
//   </div>
//   <div className="contnt_2">
//     <div className="div_a">
//       <UserInfo />
//       <DogButton />
//       <div className="div_top">
        
//       </div>
//       <LeftImage2 />
      
//     </div></div>
    
//     {
//           word.map(item=>{
//             return(<div>
//               <div className="contnt_2">
//     <div className="div_a">
//       <UserInfo />
//       <DogButton />
//       <div className="div_top">
        
//       </div>
//               <img src={address.address[6]+ item.imageSchema  } alt=""/><LikeAndComment/></div></div></div>
//             )
//           })
//         }
  
// </div>)
// }
// export default LeftSection