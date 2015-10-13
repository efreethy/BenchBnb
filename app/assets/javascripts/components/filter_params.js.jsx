/* global React, BenchStore, ApiUtil, google */

(function(root) {


  root.FilterParams = React.createClass({
    getInitialState: function () {
      return {minSeating: 1, maxSeating: 5};
    },


    handleMinSeatingChange: function (e) {
      e.preventDefault();

      FilterActions.receiveSeatingBounds({minSeating: parseInt(e.currentTarget.value), maxSeating: this.state.maxSeating});
      this.setState({minSeating: parseInt(e.currentTarget.value)});

    },

    handleMaxSeatingChange: function (e) {
      e.preventDefault();

      FilterActions.receiveSeatingBounds({minSeating: this.state.minSeating, maxSeating: parseInt(e.currentTarget.value)});
      this.setState({maxSeating: parseInt(e.currentTarget.value)});
    },

    render: function () {
      return (
        <div>
          <h3>Filter Seating</h3>
            <form onClick={this.handleClick}>
              <label> Minimum Seating </label>
              <input  onChange={this.handleMinSeatingChange} type="number" name="quantity"  value={this.state.minSeating}/>

              <label> MaximumSeating </label>
              <input  onChange={this.handleMaxSeatingChange} type="number" name="quantity"  value={this.state.maxSeating}/>

            </form>
        </div>
      );
    }
  });

}(this));
