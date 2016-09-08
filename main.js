// Setup Variables so they aren't local to the methods
var player
var tag
var firstScriptTag
var id


gapi.load('client', init);

function init() {
  gapi.client.setApiKey('AIzaSyANjuSd_MNBNJhNpqI18P5sNcehXQra-Ho');
  gapi.client.load('youtube', 'v3', function () {
    getId()
  });
}

function getId () {
  var request = gapi.client.youtube.videos.list({
    part: 'id',
    chart: 'mostPopular'
  });
  request.execute(function(response) {
    var str = JSON.stringify(response.result)
    console.log(str)
  });
  setup()
}

// Get ID HERE!
function setup () {
  id = 'M7lc1UVf-VE';

  // Download Youtube iFrame API
  tag = document.createElement('script')
  tag.src = "https://www.youtube.com/iframe_api"

  firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
}
// Generate iFrame video
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '505',
    width: '853',
    videoId: id,
    events: {
      'onReady': onPlayerReady
    }
  });
}

// Auto-play video
function onPlayerReady(event) {
  event.target.playVideo()
}
