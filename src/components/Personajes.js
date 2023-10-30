import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class Personajes extends Component {

    state = {
        personajes: [],
        status: false
    }

    getPersonajes = () => {
        var request = "api/series/personajesserie/" + this.props.idserie;
        var url = Global.apiSeriesPersonajes + request
        axios.get(url).then(response => {
            this.setState({
                personajes: response.data,
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.getPersonajes();
    }

  render() {
    return (
        <div>
            <NavLink to={"/serie/" + this.props.idserie} 
            className="btn btn-danger">Volver</NavLink>
            {
                this.state.status &&
                (
                    <table className='table table-dark'>
                        <thead>
                            <tr>
                                <th>Personaje</th>
                                <th>Imagen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.personajes.map((personaje, index) => {
                                    return (<tr key={index}>
                                        <td>{personaje.nombre}</td>
                                        <td><img src={personaje.imagen}
                                        style={{width: "150px", height: "120px"}}/></td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
  }
}
