import axios from "axios";
import React from "react";
import {connect} from "react-redux"

import URL from '../../../../configs/config'
import action from "../../../../redux/action";

const TimelineRightUpperImages = (props) => {
  const updateCategories=(tag)=>{
    var obj={
      Tag:tag

    }
    axios.post(URL.url+"searchCategories",obj).then((response)=>{
      console.log(":/my categories according to tags are/:",response)
      props.dispatch(action.tagFlag(true))
      props.dispatch(action.tagImages(response.data))
    })

  }
  return (
    <div className="rght_cate">
      <div className="rght_cate_hd" id="rght_cat_bg">
        Categories
      </div>
      <div className="rght_list">
        <ul>
          <li onClick={()=>updateCategories("CATS")  }>
            <a href>
              <span className="list_icon">
                <img src="/images/icon_01.png" alt="up" />
              </span>{" "}
             <  > CATS </>
            </a>
          </li>
          <li onClick={()=>updateCategories("DOGS")}>
            <a href>
              <span className="list_icon">
                <img src="/images/icon_02.png" alt="up" />
              </span>{" "}
              Dogs
            </a>
          </li>
          <li onClick={()=>updateCategories("BIRDS")}>
            <a href>
              <span className="list_icon">
                <img src="/images/icon_03.png" alt="up" />
              </span>{" "}
              Birds
            </a>
          </li>
          <li onClick={()=>updateCategories("RABBIT")}>
            <a href>
              <span className="list_icon">
                <img src="/images/icon_04.png" alt="up" />
              </span>{" "}
              Rabbit
            </a>
          </li>
          <li onClick={()=>updateCategories("")}>
            <a href>
              <span className="list_icon">
                <img src="/images/icon_05.png" alt="up" />
              </span>{" "}
              Others
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
function mapStateToProps(state){
  return{
    imageFlag:state.imageFlag,
    tagImages:state.tagImages
  }

}
export default connect (mapStateToProps) (TimelineRightUpperImages);
