function sleep(milliseconds) {
	var end = new Date().getTime() + milliseconds;
	while (end > new Date().getTime())
	{
		continue;
	}
}

function runWithString(argument) {

	sleep(300); // Slow our requests, script will be halted if the argument changes

	var result = HTTP.get("http://www.omdbapi.com/?i=&s=" + encodeURIComponent(argument), 3),
		results = JSON.parse(result.data);

	if (result === undefined) {
		return [{
			title: "Error!",
			icon: "at.obdev.LaunchBar:InfoTemplate",
		}];
	}
	if ("Error" in results) {
		var error = "No results for " + argument;
		return [{
			title: error,
			subtitle: results.Error,
			icon: "at.obdev.LaunchBar:InfoTemplate",
		}];
	}

	results = results.Search;

	var suggestions = [];
	var addedSuggestions = {};

	for (var i = 0; i < results.length; i++) {
		var result = results[i];
		var url = "http://www.imdb.com/title/" + result.imdbID;

		if (result.imdbID in addedSuggestions) continue;

		addedSuggestions[result.imdbID] = true;

		var icon = "at.obdev.LaunchBar:ActionTemplate";

		if (result.Type == "movie")
		{
			icon = "at.obdev.LaunchBar:MoviesTemplate";
		} else if (result.Type == "series") {
			icon = "at.obdev.LaunchBar:TVShowsTemplate";
		}

		suggestions.push({
					title: result.Title,
					url: url,
					icon: icon,
				});
	}

	return suggestions;
}