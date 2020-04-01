import React, { Component } from 'react';

import {
  GoogleApiWrapper,
  Map,
  Marker,
} from 'google-maps-react';

import { RouteDetailsMapContainer } from './route-details-map.style';

const mapStyles = {
  flex: 1,
    // width: '375%',
    // height: '250%',
  };
  

export class RouteDetailsMap extends Component  {

    _isMounted = false;
    markers = [];

   
  
    constructor(props){
      super(props);

      this.state={
        lat:this.props.lat,
        lng:this.props.long,
        route:this.props.route,
        isLoading: true
      }
    }
  
    componentDidMount(){
      this._isMounted = true;
     }
  
     componentWillUnmount() {
      this._isMounted = false;
    }

  

    fetchData = (lat, lng) => {
      // setTimeout(() => {
      //   this.setState({
      //     lat : this.props.lat,
      //     lng : this.props.long,
      //     route: this.props.route
      //   });
      // }, 5000);
    };
  
    componentDidUpdate(prevProps) {
      if (prevProps.lat !== this.props.lat || prevProps.lng !== this.props.long) {
        this.fetchData(this.props.lat, this.props.long);
      }
    }
    
    onReady = ({ google }, map) => {
      this.loadGeoJson(map);
    }

    loadGeoJson = async (map) => {
      if (this.props.route) {
        const geoJson = await this.props.route.getGeoJson();
        map.data.addGeoJson(geoJson);
        if (this.props.route.milestonesObject.length) {
          this.setState({
            lat : this.props.route.milestonesObject[0].latitude,
            lng : this.props.route.milestonesObject[0].longitude,
          })
        }
      }
    }

    render() {
      if (!this.props.loaded | !this._isMounted) {
        return <div>Loading...</div>
      }
  
      return (
  
  
        <div>
          <RouteDetailsMapContainer>
            <Map id="mapa"
              google={this.props.google}
              zoom={12}
              style={mapStyles}
              onReady={this.onReady}
              
              center={{
                lat: this.state.lat,
                lng: this.state.lng
              }}
              latitud = {this.getLatitude}>
              <Marker id="marcador"
                title={'Geolocation'}
                position={{
                lat:this.state.lat,
                lng:this.state.lng,
              }}
              fullscreenControl= {false}
         />
            </Map>
          </RouteDetailsMapContainer>
        </div>
       
       
      );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: ('AIzaSyDtYMYV3UcZ26brAz0A2lGGY5Iiwk6-xs0')
  })(RouteDetailsMap)
  
  