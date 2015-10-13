/* global React, Map, Index  */

(function(root) {

  root.Search = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function () {
     return  { bounds: FilterParamsStore.positionBounds().bounds , seatingBounds: FilterParamsStore.seatingBounds().seating };
    },

    componentDidMount: function () {
      FilterParamsStore.addChangeListener(function () {
        this.setState({ bounds: FilterParamsStore.positionBounds().bounds , seatingBounds: FilterParamsStore.seatingBounds().seating }, function () {
          ApiUtil.fetchFilteredBenches(this.state);
        });


      }.bind(this));
    },

    handleMapClick: function (coords) {
      console.log('inside handle map click');
      this.history.pushState(null, 'benches/new', coords);

    },

    render: function () {
      return (<div>
                <FilterParams onClick={this.handleSeatBoundsClick}/>
                <Map onClick={this.handleMapClick} center={{lat: 37.7758, lng: -122.435}} />
                <Index />
              </div>);
    }
  });
}(this));
