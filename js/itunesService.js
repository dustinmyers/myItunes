var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.
  this.getSong = function (artist) {
	var deferred = $q.defer();
	var songInfoArray = [];
		$http.jsonp('https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK')
		.then(function(searchTerm) {
		  	var searchTerm = searchTerm.data.results;
		  	for (var i = 0; i < searchTerm.length; i++) {
		    	songInfoArray.push({
		    		Song: searchTerm[i].trackCensoredName,
				    AlbumArt: searchTerm[i].artworkUrl100,
			        Artist: searchTerm[i].artistName,
			        Collection: searchTerm[i].collectionCensoredName,
			        CollectionPrice: searchTerm[i].collectionPrice,
			        TrackPrice: searchTerm[i].trackPrice,
			        Play: searchTerm[i].previewUrl,
			        Type: searchTerm[i].kind
				})
			}	
			var searchTerm = songInfoArray;
		  	console.log(searchTerm);
		  	deferred.resolve(searchTerm);
		  })
	return deferred.promise;
  }

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
});