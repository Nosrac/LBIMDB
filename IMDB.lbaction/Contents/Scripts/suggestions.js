function runWithString(argument) {

    var result = HTTP.get("http://www.omdbapi.com/?i=&s=" + encodeURIComponent(argument), 3),
        results = JSON.parse(result.data);

   results = results.Search;

   File.writeJSON(results, "/tmp/blah.txt");

    if (result === undefined) {
        LaunchBar.log('HTTP.getJSON() returned undefined');
        return [];
    }
    if (result.error !== undefined) {
        LaunchBar.log('Error in HTTP request: ' + result.error);
        return [];
    }

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