$(document).ready(function() {
	$('#former').submit(function(e) {
		var post_data = $('#query').val();
		$.ajax({
			type: 'GET',
			url: 'http://localhost:8983/solr/collection1/select',
			dataType: 'jsonp',
			data: {
				'q': post_data,
				'wt': 'json',
				'indent': 'true',
				'json.wrf': 'display_data'
			},
			beforeSend: function() {
				empty_table();
			},
			success: function(data) {
				console.log(data)
				alert('success');
			}
		});
		e.preventDefault();
	});
});

function display_data(data) {
	console.log(data);
	var counter = 0;
	var docs = data.response.docs;
	for (var i = 0; i < docs.length; i++) {
		var doc = docs[i];

		$('table').append('<tr>');
		var current = $("tr:last");
		current.append('<td style="color:#FFF">' + (i + 1) + '</td>');
		current.append('<td><a href="http://commons.wikimedia.org/wiki/File:' + add_underscore(doc.name) 
			+ '" style="color:#FFF">' + remove_special_chars(strip_extension(doc.name)) + '</a></td>');
		current.append('<td style="color:#FFF">' + remove_special_chars(doc.description) + '</td>');
	}
}

function empty_table() {
	$('table tr:not(:first)').remove();
}

function add_underscore(string) {
	return string.split(' ').join('_');
}

function remove_special_chars(string) {
	return string.replace(/[_\s-.]/g, ' ');
}

function strip_extension(string) {
	return string.substr(0, string.lastIndexOf('.')) || string
}