/* global React, BenchStore, ApiUtil, google */

(function(root) {


  var _configureCoordinates = function (map) {
    var southWestCoords = {
      lat: map.getBounds().Pa.I,
      lng: map.getBounds().La.j
    };

    var northEastCoords = {
      lat: map.getBounds().Pa.j,
      lng: map.getBounds().La.I
    };

    var coords = { bounds: {
      northEast: northEastCoords,
      southWest: southWestCoords
    } };

    return coords;
  };

  var _includes = function (storeBenches, marker) {
    var doesInclude = false;
    storeBenches.forEach(function (bench) {
      if (bench.id === marker.benchId) {
        doesInclude = true;
      }
    });
    return doesInclude;
  };

  root.Map = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function () {
      return {markers: []};
    },



    _markerIsOnMap: function (bench) {
      var onMap = false;
      this.state.markers.forEach(function (marker) {
        if (marker.benchId === bench.id) {
          onMap = true;
        }
      });
      return onMap;
    },

    _placeMarker: function (map , bench) {

      var marker = new google.maps.Marker({
        map: map,
        position: {lat: bench.lat, lng: bench.lng}
      });

      marker.benchId = bench.id;
      this.state.markers.push(marker);
      google.maps.event.addListener(marker, 'click', function () {
        this.history.pushState(null, 'benches/' + marker.benchId);
      }.bind(this));
      return marker;

    },

    _clearBenchesOutOfScope: function (storeBenches) {

      this.state.markers.forEach(function (marker) {
        if (!_includes(storeBenches, marker)) {
          var idx = this.state.markers.indexOf(marker);
          this.state.markers.splice(idx, 1);
          marker.setMap(null);
        }
      }.bind(this));
    },

    componentWillReceiveProps: function () {
      console.log("props received");
    },

    componentDidMount: function(){
      var that = this;
      var map = React.findDOMNode(this.refs.map);
      var mapOptions = {
        center: this.props.center,
        zoom: 13
      };
      this.map = new google.maps.Map(map, mapOptions);

      BenchStore.addChangeListener(function (){
        BenchStore.all().forEach(function (bench) {
          if (!that._markerIsOnMap(bench)) {
            that._placeMarker(that.map, bench);
          }
        });

        that._clearBenchesOutOfScope(BenchStore.all());
      });



      this.map.addListener('click', function (e) {

        this.props.onClick.call(this, e.latLng);
        console.log(e.latLng);
      }.bind(this));

      this.map.addListener('idle', function () {
        var bounds = _configureCoordinates(this);
        FilterActions.receivePosBounds(bounds);
        // ApiUtil.fetchBenches(bounds);
      });

      if (typeof this.props.centerBench !== "undefined") {
        this._placeMarker(this.map, this.props.centerBench);
        this.map.setOptions({draggable: false});
        google.maps.event.clearListeners(this.map, 'click');
      }

    },

    render: function () {
      return <div className="map" ref="map"></div>;
    }
  });
}(this));
