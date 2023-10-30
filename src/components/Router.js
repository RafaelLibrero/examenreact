import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import MenuSeriesPersonajes from './MenuSeriesPersonajes'
import NuevoPersonaje from './NuevoPersonaje'
import DetalleSerie from './DetalleSerie';
import Personajes from './Personajes';
import HomePersonajes from './HomeSeriesPersonajes';
import ModificarPersonaje from './ModificarPersonaje';

export default class Router extends Component {
  render() {

    function DetalleSerieElement() {
        var { idserie } = useParams();
        return <DetalleSerie idserie = { idserie }/>
    }

    function PersonajesElement() {
        var { idserie } = useParams();
        return <Personajes idserie = { idserie }/>
    }

    return (
      <BrowserRouter>
        <MenuSeriesPersonajes/>
        <Routes>
            <Route path="/" element={<HomePersonajes/>}/>
            <Route path='/nuevopersonaje' element={<NuevoPersonaje/>}/>
            <Route path='/serie/:idserie' element={<DetalleSerieElement/>}/>
            <Route path='/personajes/:idserie' element={<PersonajesElement/>}/>
            <Route path='/personajesseries' element={<ModificarPersonaje/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}
