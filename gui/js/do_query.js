$(document).ready(function () {
	$( '#former' ).submit(function( e ) {
		var post_data =$('#query').val();
		$.ajax({
			type: 'GET',
			url: 'http://localhost:8983/solr/collection1/select',
			dataType: 'jsonp',
			data: {'q': post_data, 'wt':'json','indent' : 'true', 'json.wrf': 'display_data'},
			beforeSend : function (){
				empty_table();
			},
			success: function(data) { 
				alert('success');
			}
		});
		e.preventDefault();
	});
});

function display_data(data){
	var counter = 0;
	$.each(data, function(key, value){
    $.each(value, function(key, value){
				if(key == 'docs'){
				  $.each(value, function(key, value){
						counter++;
						$('table').append('<tr>');
						var current =  $( "tr:last" );
						current.append('<td style="color:#FFF">' + counter + '</td>');
						$.each(value, function(key, value){
							if(key == 'name'){
								
								current.append('<td><a href="http://commons.wikimedia.org/wiki/File:'+ add_underscore(value) +'" style="color:#FFF">' + remove_special_chars(strip_extension(value)) + '</a></td>');
							}
							else if(key == 'description'){
								current.append('<td style="color:#FFF">' + remove_special_chars(value) +'</td>');
							}
						});
					});
				}
    });
	});
}

function empty_table(){
	$('table tr:not(:first)').remove();
}

function add_underscore(string){
	return string.split(' ').join('_');
}

function remove_special_chars(string){
	return string.replace(/[_\s-.]/g, ' ');
}

function strip_extension(string){
	return string.substr(0, string.lastIndexOf('.')) || string
}

