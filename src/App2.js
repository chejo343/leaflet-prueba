import React, { useState, useEffect, useRef } from 'react';
import './App2.css'

const App2 = () => {
  const mapa = useRef(null);
  const drawTools = useRef(null);
  const init = () => {
    if (mapa.current) {
      return;
    }
    var esri = window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      id: 'mapbox.streets',
      maxZoom: 24,
      maxNativeZoom: 18,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      // noWrap: true
    });
    // var osm = window.L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 24,
    //   maxNativeZoom: 19,
    //   attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //   // noWrap: true
    // });
    mapa.current = window.L.map('map', {
      center: [55, 10],
      zoom: 2,
      layers: [esri],
      zoomAnimation: false,
      rotate: true,
      rotateControl: {
        closeOnZeroBearing: false,
      },
      bearing: 30,
      compassBearing: true,
      touchRotate: true,
    });
    const editableLayers = new window.L.FeatureGroup();
      mapa.current.addLayer(editableLayers);
      const drawOptions = {
        position: 'topleft',
        draw: {
          polyline: false,
          circle: false,
          circlemarker: false,
          marker: false,
          polygon: true,
          rectangle: true,
          buttons: {
            polygon: 'Dibujar un polígono',
            rectangle: 'Dibujar un rectángulo'
          }
        },
        edit: {
          featureGroup: editableLayers,
          remove: true
        }
      }
      drawTools.current = new window.L.Control.Draw(drawOptions);
      mapa.current.addLayer(editableLayers);
    // window.L.control.layers({
    //   'Empty': window.L.tileLayer(''),
    //   'Streets': osm,
    //   'Satellite': esri,
    // }, null, {
    //   collapsed: false
    // }).addTo(mapa);
  }
  useEffect(() => {
    init()
  }, [])

  return <div id="map"></div>
}

export default App2;
