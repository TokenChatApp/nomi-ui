import React, { Component } from "react";
import Slider from "react-slick";
import girlPhoto from "../../images/dummyGirl.png";

const imgStyle = {
  width: "100%"
};

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      accessibility: true,
      arrows: true
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <img style={imgStyle} src={girlPhoto} alt="girl" />
          </div>
        </Slider>
      </div>
    );
  }
}
