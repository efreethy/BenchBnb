/* global React, BenchStore, ApiUtil  */

(function(root) {

  root.BenchForm = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function () {
      var latIdx = this.props.location.search.indexOf('?');
      var lngIdx = this.props.location.search.indexOf('M=');
      var lat = this.props.location.search.slice(3,(lngIdx-1));
      var lng = this.props.location.search.slice(lngIdx + 2);

      return {description: "", lat: lat, lng: lng, seating: 1};
    },

    handleDescriptionChange: function (e) {
      e.preventDefault();
      this.setState({description: e.currentTarget.value });
    },

    handleLatChange: function (e) {
      e.preventDefault();
      this.setState({lat: e.currentTarget.value });
    },

    handleLngChange: function (e) {
      e.preventDefault();
      this.setState({lng: e.currentTarget.value });
    },

    handleSeatingChange: function (e) {
      e.preventDefault();
      this.setState({seating: parseInt(e.currentTarget.value) });
    },


    handleSubmit: function (e) {
      ApiUtil.createBench(this.state);
      this.history.pushState(null, '/');
    },

    render: function () {
    return (<div>
              <h3>Add a bench!</h3>
              <form>
                <label> Description</label><input type="text" onChange={this.handleDescriptionChange}/>
                  <br/><br/>
                <label>Latitude</label>
                <input type="text" onChange={this.handleLatChange} value={this.state.lat}/>
                  <br/><br/>
                <label>Longitude </label>
                <input  type="text" onChange={this.handleLngChange} value={this.state.lng}/>
                  <br/><br/>
                <label>Seating </label>
                <input  onChange={this.handleSeatingChange} type="number" name="quantity" min="1" max="5" />
                <br/><br/>
                <input onClick={this.handleSubmit} type="submit" />
              </form>
            </div>);
    }
  });

}(this));
