import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class NuevoPersonaje extends Component {

  state = {
    status: false,
    series: [],
    statusSeries: false,
    personaje: {}
  }

  cajaNombre = React.createRef();
  cajaImagen = React.createRef();
  selectSerie = React.createRef();

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

  insertPersonaje = (e) => {
    e.preventDefault();
    var request = "api/personajes";
    var url = Global.apiSeriesPersonajes + request;

    var nombre = this.cajaNombre.current.value;
    var imagen = this.cajaImagen.current.value;
    var serie = parseInt(this.selectSerie.current.value);

    var personaje = {
      idPersonaje: 1,
      nombre: nombre,
      imagen: imagen,
      idSerie: serie
    }

    axios.post(url, personaje).then(response => {
      this.setState({
        status: true,
        personaje: personaje
      })
    })
  }

  componentDidMount = () => {
    this.getSeries();
  }

  render() {
    return (
      <div className='text-center'>
        {
          this.state.status &&
          (
            <Navigate to={"/personajes/" + this.state.personaje.idSerie}/>
          )
        }
        <h1 style={{color: "blue"}}>Nuevo personaje</h1>
        <form>
          <label>Nombre:</label>
          <input type='text' ref={this.cajaNombre} 
          className='form-control'/>
          <label>Imagen:</label>
          <input type='text' ref={this.cajaImagen} 
          className='form-control'/>
          <label>Serie:</label>
          <select className='form-control' ref={this.selectSerie}>
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
          <button className='btn btn-success'
          onClick={this.insertPersonaje}>Insertar personaje</button>
        </form>
      </div>
    )
  }
}
