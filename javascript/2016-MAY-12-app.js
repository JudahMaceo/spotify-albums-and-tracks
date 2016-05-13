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
      // console.log(artists);

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
  var appendToMe = $('#albums');


  // These two lines can be deleted. They're mostly for show.
  console.log("you clicked on:");

//play around with this to fully understand event.target etc.
  console.log(event);

//attr works like this: one argument means it is getting the data...
  var artistId = $(event.target).attr('data-spotify-id');


  var albumRequest = $.ajax({
    type: "GET",
    dataType: 'json',
    url: 	"https://api.spotify.com/v1/artists/" + artistId + "/albums"
  });

  albumRequest.done(function(data){
    var albums = data.items;
    // console.log(albums);


    albums.forEach(function(album){
      var albumName = album.name;
      // var artistLi = $("<li>" + artist.name + " - " + artist.id +
      //   "</li>")
      var albumNameLi = $("<li>" + album.name + "</li>");
      albumNameLi.attr("data-spotify-album-id", album.id);
      appendToMe.append(albumNameLi);

      albumNameLi.click(displayTracks)
    });
    //for each loop
  });
  //done close

  albumRequest.fail(function(error) {
    console.log("Something Failed During Album Request:")
    console.log(error);
  });

}
//function close

function displayTracks(event){

  //event target attr get album id
  var albumId = $(event.target).attr("data-spotify-album-id");
  console.log(albumId);

  var trackRequest;
  var tracksUrl = "https://api.spotify.com/v1/albums/" + albumId + "/tracks";

  var trackRequest = $.ajax({
      type: "GET",
      dataType: 'json',
      url: tracksUrl
  });

  trackRequest.done(function(data){
    var tracks = data.items;
    // console.log(tracks);
    var appendToMe = $("#tracks");
    appendToMe.html("");

    tracks.forEach(function(track) {
      console.log(track.name);
      var trackLi = $("<li>" + track.name + "</li>");
      trackLi.attr("data-spotify-track-name", track.name)
      appendToMe.append(trackLi);



    });
    //for each close

  });
  //done close
    // var appendToMe = $("#tracks");


}





    // var tracksRequest = $.ajax({
    //   type: "GET",
    //   dataType: 'json',
    //   url: 	"https://api.spotify.com/v1/albums/" + albumIds + "/tracks"
    // });
    // //ajax
    //
    //   tracksRequest.done(function(data){
    //
    //     for(j = 0; j < data.items.length; j++){
    //         console.log(data.items[j].name);
    //     }
    //
    //   });
      //done close
