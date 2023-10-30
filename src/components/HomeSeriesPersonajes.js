import React, { Component } from 'react'
import SeriesTv from "../assets/images/series-tv.jpg"

export default class HomePersonajes extends Component {
  render() {
    return (
      <div>
        <img src={SeriesTv} style={{width: "750px", height: "490px"}}/>
      </div>
    )
  }
}
