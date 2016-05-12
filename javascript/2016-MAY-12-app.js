// Self envoking function! once the document is ready, bootstrap our application.
// We do this to make sure that all the HTML is rendered before we do things
// like attach event listeners and any dom manipulation.
(function() {
  $(document).ready(function() {
    bootstrapSpotifySearch();
  })
})();

/**
  This function bootstraps the spotify request functionality.
*/
function bootstrapSpotifySearch() {

  var userInput, searchUrl, results;
  var outputArea = $("#q-results");

  $('#spotify-q-button').on("click", function() {
    var spotifyQueryRequest;
    spotifyQueryString = $('#spotify-q').val();
    searchUrl = "https://api.spotify.com/v1/search?type=artist&q=" +
      spotifyQueryString;

    // Generate the request object
    spotifyQueryRequest = $.ajax({
      type: "GET",
      dataType: 'json',
      url: searchUrl
    });

    // Attach the callback for success
    // (We could have used the success callback directly)
    spotifyQueryRequest.done(function(data) {
      var artists = data.artists;

      // Clear the output area
      outputArea.html('');

      // The spotify API sends back an arrat 'items'
      // Which contains the first 20 matching elements.
      // In our case they are artists.
      artists.items.forEach(function(artist) {
        var artistLi = $("<li>" + artist.name + " - " + artist.id +
          "</li>")
        artistLi.attr('data-spotify-id', artist.id);
        outputArea.append(artistLi);

        artistLi.click(displayAlbumsAndTracks);
      })
    });

    // Attach the callback for failure
    // (Again, we could have used the error callback direcetly)
    spotifyQueryRequest.fail(function(error) {
      console.log("Something Failed During Spotify Q Request:")
      console.log(error);
    });
  });
}

/* COMPLETE THIS FUNCTION! */
function displayAlbumsAndTracks(event) {
  var appendToMe = $('#albums-and-tracks');


  // These two lines can be deleted. They're mostly for show.
  console.log("you clicked on:");
  var artistId = $(event.target).attr('data-spotify-id');

  var albumRequest = $.ajax({
    type: "GET",
    dataType: 'json',
    url: 	"https://api.spotify.com/v1/artists/" + artistId + "/albums"
  });

  albumRequest.done(function(data){
    var albums = data.items;

    for(i = 0; i < albums.length; i++){
      var albumName = (albums[i].name);
      var albumNameUl = $("<ul>" + albumName + "</ul>");
      appendToMe.append(albumNameUl);
      var albumIds = albums[i].id;
      console.log(albumIds);

    //inside of the album loop make another loop for tracks
      //so each time we find an album and print it, we also print the tracks for that album
        //so ajax call for tracks will go inside of this loop in order to get the tracks



    //
    var tracksRequest = $.ajax({
      type: "GET",
      dataType: 'json',
      url: 	"https://api.spotify.com/v1/albums/" + albumIds + "/tracks"
    });
    //ajax

      tracksRequest.done(function(data){

        for(j = 0; j < data.items.length; j++){
            console.log(data.items[j].name);
        }

      });
      //done close




    }
    //for loop close

  });
  //done close

}
//function close
