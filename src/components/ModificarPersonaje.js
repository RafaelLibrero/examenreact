import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class ModificarPersonaje extends Component {

    state = {
        status: false,
        series: [],
        statusSeries: false,
        personajes: [],
        statusPersonajes: false,
        serie: {},
        statusSerie: false,
        personaje: {},
        statusPersonaje: false
    }

    selectSerie = React.createRef();
    selectPersonaje = React.createRef();

    getSeries = () => {
        var request = "/api/series";
        var url = Global.apiSeriesPersonajes + request
        axios.get(url).then(response => {
            this.setState({
                series: response.data,
                statusSeries: true
            })
        })
    }

    getPersonajes = () => {
        var request = "/api/personajes";
        var url = Global.apiSeriesPersonajes + request
        axios.get(url).then(response => {
            this.setState({
                personajes: response.data,
                statusPersonajes: true
            })
        })
    }

    getDetalleSerie = () => {
        var request = "api/series/" + this.selectSerie.current.value
        var url = Global.apiSeriesPersonajes + request
        axios.get(url).then(response => {
            this.setState({
                serie: response.data,
                statusSerie: true
            })
        })
    }

    getDetallePersonaje = () => {
        var request = "api/personajes/" + this.selectPersonaje.current.value
        var url = Global.apiSeriesPersonajes + request
        axios.get(url).then(response => {
            this.setState({
                personaje: response.data,
                statusPersonaje: true
            })
        })
    }

    modificarPersonaje = (e) => {
        e.preventDefault();
        var idSerie = this.selectSerie.current.value
        var idPersonaje = this.selectPersonaje.current.value
        var request = "api/personajes/" + idPersonaje + "/" + idSerie
        var url = Global.apiSeriesPersonajes + request
        axios.put(url).then(response => {
            this.setState({
                status: true
            })
        })

        console.log(url)

    }

    componentDidMount = () => {
        this.getSeries();
        this.getPersonajes();
    }

    render() {
        return (
            <div>
                {
                    this.state.status &&
                    (
                        <Navigate to={"/personajes/" + this.selectSerie.current.value}/>
                    )
                }
                <h1 style={{color: "blue"}}>Personajes y series</h1>
                <label>Seleccione una serie:</label>
                <select className='form-control' ref={this.selectSerie}
                onChange={this.getDetalleSerie}>
                    {
                        this.state.statusSeries &&
                        (
                            this.state.series.map((serie, index) => {
                                return (<option key={index} value={serie.idSerie}>
                                    {serie.nombre}</option>)
                            })
                        )
                    }
                </select>
                <label>Seleccione un personaje:</label>
                <select className='form-control' ref={this.selectPersonaje}
                onChange={this.getDetallePersonaje}>
                    {
                        this.state.statusPersonajes &&
                        (
                            this.state.personajes.map((personaje, index) => {
                                return (<option key={index} value={personaje.idPersonaje}>
                                    {personaje.nombre}</option>)
                            })
                        )
                    }
                </select>
                <button onClick={this.modificarPersonaje} className='btn btn-info'>
                    Guardar cambios
                </button>
                {
                    this.state.statusSerie &&
                    (
                        <div>
                            <h1>{this.state.serie.nombre}</h1>
                            <img src={this.state.serie.imagen}
                            style={{width: "250px", height: "180px"}}/>
                        </div>
                    )
                }
                {
                    this.state.statusPersonaje &&
                    (
                        <div>
                            <h1>{this.state.personaje.nombre}</h1>
                            <img src={this.state.personaje.imagen}
                            style={{width: "250px", height: "180px"}}/>
                        </div>
                    )
                }
            </div>
        )
    }
}
