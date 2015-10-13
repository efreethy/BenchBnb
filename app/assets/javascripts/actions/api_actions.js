/* global AppDispatcher, BenchConstants */

var ApiActions = {
  receiveAll: function (benches) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCHES_RECEIVED,
      data: benches
    });
  },

  receiveSingleBench: function (benchData) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCH_CREATED,
      data: benchData
    });
  }
};
