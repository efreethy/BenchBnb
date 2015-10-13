/* global AppDispatcher, FilterConstants */

var FilterActions = {
  receivePosBounds: function (posData) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.POS_BOUNDS_RECEIVED,
      data: posData
    });
  },

  receiveSeatingBounds: function (seatingData) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.SEATING_BOUNDS_RECEIVED,
      data: seatingData
    });
  }
};
