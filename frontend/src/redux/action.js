const action = {
  showImage: (Flag) => {
    return {
      type: "SHOW_IMAGE",
      payload: Flag,
    };
  },
  show: (flag) => {
    return {
      type: "SHOW",
      payload: !flag,
    };
  },
  loginTab: (flag)=>{
    return{
      type: "LoginTab",
      payload:flag
    }
  },
  allImagePost:(array)=>{
    return{
      type:"allImagePost",
      payload:array
    }
  },
  userProfileImage:(sFlag)=>{
    
    return{
      type:"userProfileImage",
      payload:sFlag
      
    }
  },
  userProfileImage2:(sFlag1)=>{
    
    return{
      type:"userProfileImage",
      payload:sFlag1
      
    }
  },
  tagImages:(imageArray)=>{
    
    return{
      type:"TAG IMAGES",
      payload:imageArray
    }
  },
  navbarImage:(navImage)=>{
    console.log("in action value is",navImage)
    return{
      type:"NAVBAR IMAGE",
      payload:navImage

    }
  }
};

export default action;
