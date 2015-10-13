/* global EventEmitter, AppDispatcher, BenchConstants, BenchStore */

(function(root) {
  'use strict';
  var _benches = [];

  var resetBenches = function(benches) {
    _benches = benches;
  };

  var addBench =  function (benchData) {
    _benches.push(benchData);
  };

  var CHANGE_EVENT = 'change';

  root.BenchStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _benches.slice(0);
    },

    find: function(id) {
      var idInt = parseInt(id);
      var foundBench;
      for (var i = 0; i < _benches.length; i++ ) {

        if (idInt === _benches[i].id ) {
          foundBench = _benches[i];
        }
      }

      return foundBench;
    },

    addChangeListener: function(cb) {
      this.on(CHANGE_EVENT, cb);
    },

    removeChangeListener: function(cb) {
      this.removeListener(CHANGE_EVENT, cb);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case BenchConstants.BENCHES_RECEIVED:
        resetBenches(payload.data);
        BenchStore.emit(CHANGE_EVENT);
        break;
        case BenchConstants.CREATED:
        addBench(payload.data);
        BenchStore.emit(CHANGE_EVENT);
        break;
      }
    })
  });

}(this));
