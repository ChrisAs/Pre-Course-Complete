$(function () {

  $('#authorize').click(function () {
    var id = $('#client-id').val();
    location.href = 'https://www.instagram.com/oauth/authorize/?client_id=' + id +
      '&redirect_uri=http://localhost:8080/utilities/get-token.html&response_type=token&' +
      'scope=basic+public_content';
  });

  var access_token = /access_token=(.*)$/.exec(location.href)[1];
  if (access_token) $('#access-token').text('Your access token is ' + access_token);

});
