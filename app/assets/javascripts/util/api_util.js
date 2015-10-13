/* global BenchStore, ApiActions */
var ApiUtil = {
  fetchBenches: function (bounds) {
    $.ajax({
      url: '/api/benches',
      method: 'GET',
      data: bounds,
      dataType: 'JSON',
      success: function (benches) {
        ApiActions.receiveAll(benches);
      }
    });
  },

  fetchFilteredBenches: function (filterData) {

    $.ajax({
      url: '/api/benches',
      method: 'GET',
      data: filterData,
      dataType: 'JSON',
      success: function (benches) {
        ApiActions.receiveAll(benches);
      }
    });
  },


  createBench: function (benchData) {
    $.ajax({
      url: '/api/benches',
      method: 'POST',
      data: {bench: benchData},
      dataType: 'JSON',
      success: function (benchData) {
        ApiActions.receiveSingleBench(benchData);
      }
    });
  }
};
