function run()
{
    // No argument passed, just open the website:
    LaunchBar.openURL('http://www.imdb.com/');
}

function runWithString(argument)
{
	var url = 'http://www.imdb.com/find?q=' + encodeURIComponent(argument);
	if ( argument.match(/^http:/))
	{
		url = argument;
	}
    LaunchBar.openURL(url);
}
