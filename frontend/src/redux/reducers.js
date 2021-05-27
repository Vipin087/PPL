const initialState = {
  Flags: false,
  show: false,
  tagFlag:false,
  tagFlag2:false,
  navbarImage:""
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SHOW_IMAGE":
      return {
        ...state,
        Flags: action.payload,
      };
    case "SHOW":
      return {
        ...state,
        show: action.payload,
      };
      case "LoginTab":
      return {
        ...state,
        Flags:action.payload
      };
      case "userProfileImage":
        return{
          ...state,
          tagFlag:action.payload
        };
        case "userProfileImage2":
        return{
          ...state,
          tagFlag2:action.payload
        };
        case "TAG ARRAY":
        return{
          ...state,
          tagImages:[...state.tagImages,action.payload]
        };
        case "NAVBAR IMAGE":
          console.log("in action value is",action.payload)
          return{
            ...state,
            navbarImage:action.payload
            
          };
    default:
      return state;
  }
}
