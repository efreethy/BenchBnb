/* global React, BenchStore, ApiUtil  */

(function(root) {

    root.BenchShow = React.createClass({
      render: function () {

        var bench = BenchStore.find(this.props.params.id);

        return (
          <div>
            <h2>{bench.description}</h2>
            <Map center={{lat: bench.lat, lng: bench.lng }} centerBench={bench}/>
            <p>latitude: {bench.lat}</p>
            <p>longitude: {bench.lng}</p>
          </div>
        );
      }
    });
}(this));
