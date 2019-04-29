export default {
  canOrder: function(can_order) {
    if(!can_order) {
      alert("Sorry, you don't have permission to buy")
      return true;
    }
    return false;
  },
}
