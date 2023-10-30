import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default class DetalleSerie extends Component {

    state = {
        serie: {},
        status: false
    }

    getSerieId = () => {
        var request = "api/series/" + this.props.idserie
        var url = Global.apiSeriesPersonajes + request
        axios.get(url).then(response => {
            this.setState({
                serie: response.data,
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.getSerieId();
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.idserie != this.props.idserie){
            this.getSerieId();
        }
    }
  render() {
    return (
        <div>
            {
                this.state.status &&
                (
                  <div className='card' style={{width: "400px", height: "450px"}}>
                    <div className='card-body'>
                        <img src={this.state.serie.imagen}
                        style={{width: "400px", height: "300px"}}/>
                        <h4>{this.state.serie.nombre}</h4>
                        <p className='card-text'>IMBD: {this.state.serie.puntuacion}</p>
                        <NavLink className="btn btn-success" 
                        to={"/personajes/" + this.state.serie.idSerie}>Personajes</NavLink>  
                    </div>
                  </div>
                )
            }
        </div>
     
    )
  }
}
