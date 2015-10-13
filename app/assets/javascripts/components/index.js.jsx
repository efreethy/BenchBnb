/* global React, BenchStore, ApiUtil  */

(function(root) {



  root.Index = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function () {
      return { benches: BenchStore.all() };
    },

    componentWillMount: function () {
      BenchStore.addChangeListener(function () {
        this.setState({ benches: BenchStore.all() });
      }.bind(this));
    },

    handleClick: function (bench) {
      this.history.pushState(null, 'benches/' + bench.id)
    },

    render: function () {
      var benches = this.state.benches.map(function (bench) {
        return <li onClick={this.handleClick.bind(this, bench)} key={bench.id} >{bench.description}, seating: {bench.seating}</li>;
      }.bind(this));


      return (
        <div>
          <h3>Nearby Benches</h3>
          {benches}
        </div>
      );
    }
  });

}(this));
