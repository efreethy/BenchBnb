/* global EventEmitter, AppDispatcher, FilterConstants, FilterParamsStore */

(function(root) {

  var _seatingBounds = {seating: {minSeating: 0, maxSeating:5}};
  var _positionBounds = {};

  var _resetPositionBounds = function (posBounds) {
    _positionBounds = posBounds;
  };

  var _resetSeatingBounds = function (seatingBounds) {
    _seatingBounds = {seating: seatingBounds};
  };

  var CHANGE_EVENT = 'change';

  root.FilterParamsStore = $.extend({}, EventEmitter.prototype, {
    seatingBounds: function () {
      return _seatingBounds;
    },

    positionBounds: function () {
      return _positionBounds;
    },

    addChangeListener: function(cb) {
      this.on(CHANGE_EVENT, cb);
    },

    removeChangeListener: function(cb) {
      this.removeListener(CHANGE_EVENT, cb);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case FilterConstants.POS_BOUNDS_RECEIVED:
        _resetPositionBounds(payload.data);
        FilterParamsStore.emit(CHANGE_EVENT);
        break;
        case FilterConstants.SEATING_BOUNDS_RECEIVED:
        _resetSeatingBounds(payload.data);
        FilterParamsStore.emit(CHANGE_EVENT);
        break;
      }
    })
  });

}(this));
