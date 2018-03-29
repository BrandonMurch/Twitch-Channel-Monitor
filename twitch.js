/*
@description - A monitor for a few twitch channels. Dims the box when the user
               is offline. Displays the status when they're online.
@author - Brandon - Brandon.Murch@protonmail.com
*/

$(document).ready(function() {
  let streamers = [];
  let twitchStreamer = function(name, status, logo, url){
    this.name = name;
    this.status = status;
    this.logo= logo;
    this.url = url;
  };
  getTwitch('freecodecamp');
  getTwitch('storbeck');
  getTwitch('ESL_SC2');
  getTwitch('OgamingSC2');
  getTwitch('cretetion');
  getTwitch('habathcx');
  getTwitch('RobotCaleb');
  getTwitch('noobs2ninjas');
  getTwitch('netmux');
  getTwitch('247OnLoL');

  function getTwitch(user) {
    $.get('https://wind-bow.glitch.me/twitch-api/channels/' + user, function(data) {
      streamers[user] = new twitchStreamer(data.display_name, data.status, data.logo, data.url)
      let statusText = '.profile__status--' + user;
      let userOffline = '.profile__offlineDim--' + user;
      if (data.status === null) {
        $(userOffline).css('z-index', '10');
        $(statusText).css('z-index', '-10');
      } else {
        $(userOffline).css('z-index', '-10');
        $(statusText).css('z-index', '10');
        $(statusText).html('<p>' + data.status + '</p>');
      }
    }, 'jsonp');
  }
});
