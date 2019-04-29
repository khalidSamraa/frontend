import Model from './model.js';

export default {
  Read: function(params) {
    Model.Read(params)
  },
  ReadDetail: function(params) {
    Model.ReadDetail(params)
  },
  ReadCartDetails: function(params) {
    Model.ReadCartDetails(params)
  },
  Checkout: function(params) {
    Model.Checkout(params)
  }
}