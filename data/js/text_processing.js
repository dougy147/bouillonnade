function replace_invalid_chars(inner) {
    /*
	If there are invalid characters in var "inner", like "&amp";
	we will get an error. We need to replace them.
	Inspired from: https://stackoverflow.com/a/5499821/22665005
	*/
    var char_to_replace = { // this is useful for 750g...
	'&lt;': '<',
	'&gt;': '>',
	'&amp;': '&',
	'&eacute;': 'é',
	'&agrave;': 'à',
	'&egrave;': 'è',
	'&ugrave;': 'ù',
	'&ccedil;': 'ç',
	'&ecirc;': 'ê',
	'&euml;': 'ë',
	'&ocirc;': 'ô',
	'&icirc;': 'î',
	'&iuml;': 'ï',
	'&acirc;': 'â',
	'&auml;': 'ä',
	'&ocirc;': 'ô',
	'&ucirc;': 'û',
	'&yuml;': 'ÿ',
	'&quot;': '"',
	'&apos;': "'",
	'&#039;': "'",
	'&amp;lt;': '<',
	'&amp;gt;': '>',
	'&amp;amp;': '&',
	'&amp;eacute;': 'é',
	'&amp;agrave;': 'à',
	'&amp;egrave;': 'è',
	'&amp;ugrave;': 'ù',
	'&amp;ccedil;': 'ç',
	'&amp;ecirc;': 'ê',
	'&amp;euml;': 'ë',
	'&amp;ocirc;': 'ô',
	'&amp;icirc;': 'î',
	'&amp;iuml;': 'ï',
	'&amp;acirc;': 'â',
	'&amp;auml;': 'ä',
	'&amp;ocirc;': 'ô',
	'&amp;ucirc;': 'û',
	'&amp;yuml;': 'ÿ',
	'&amp;quot;': '"',
	'&amp;apos;': "'",
	'&amp;#039;': "'",
    }

    for (var key in char_to_replace) {
	inner = inner.replace(new RegExp(key, 'g'),char_to_replace[key]);
    }
    return inner;
}
