// Due to changes to the Instagram API, this library no longer queries
// the actual API. Instead it returns mock data stored in a .json object,
// which exactly simulates a real API response.

window.Instagram = new function () {

  /**
   * Gets detailed information of a user
   * @param  {String}   id the id of the user
   * @param  {Function} cb handler of the result
   * @return {undefined}
   */
  this.getUser = function (id, cb) {
    $.getJSON(
      'lib/user.json',
      function (response) {
        cb(response.data);
      }
    );
  };

  /**
   * Gets the recent pictures of a user in order of creation
   * @param  {String}   id the id of the user
   * @param  {Function} cb handler of the result
   * @return {undefined}
   */
  this.getUserRecentMedia = function (id, cb) {
    $.getJSON(
      'lib/userRecentMedia.json',
      function (response) {
        cb(response.data);
      }
    );
  };

};
