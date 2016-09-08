// Setup Variables so they aren't local to the methods
var player
var tag
var firstScriptTag
var videoID


gapi.load('client', init);

function init() {
  gapi.client.setApiKey('AIzaSyANjuSd_MNBNJhNpqI18P5sNcehXQra-Ho');
  gapi.client.load('youtube', 'v3', function () {
    getId()
  });
}

function getId () {
  // Get Video ID
  var request = gapi.client.youtube.videos.list({
    part: 'statistics',
    chart: 'mostPopular',
    maxResults: 50
  });
  request.execute(function(response) {
    bestViews = 0
    // Set default video to first result in case the search doesn't work
    setID(response.result.items[0].id)
    for(i = 0; i < 49; i++){
      // Get Video's view count
      viewC = response.result.items[i].statistics.viewCount

      // If the video has more views than the older one and is embeddable
      if (viewC > bestViews) {
        bestViews = viewC
        setID(response.result.items[i].id)
      }
    }
    setup()
  });
}

function setID (newID) {
  videoID = newID
}

function setup () {
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
    videoId: videoID,
    events: {
      'onReady': onPlayerReady
    }
  });
}

// Auto-play video
function onPlayerReady(event) {
  event.target.playVideo()
  document.getElementById('info').style.visibility='visible';
}
