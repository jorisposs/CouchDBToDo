function createDoc(){

	var task_id = $("#task_id").val();
	var start_date = $("#start_date").val();
	var end_date = $("end_date").val();
	var priority = $("#priority").val();
	var description = $("#description").val();
	var status = $("status").val();

	var doc = {};

	doc.task_id = parseInt(task_id);
	doc.start_date = start_date;
	doc.end_date = end_date;
	doc.priority = parseInt(priority);
	doc.description = description;
	var json = JSON.stringify(doc);

	$.ajax({
		type : 'PUT',
		url : '../../' + doc.task_id
		
		data : json,
		contentType : 'application/json',
		async : true,
		success : function(data){
			buildOutput();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			console.log(textStatus);
		}
	});
}


function editDoc(task_id, start_date, end_date, priority, description){
	
	$('#output').hide();
	$('#edit').show();
	
	var html = '';
	
	// Build edit form
	html += '<h3>Editeer record</h3><table class="table table-hover">';
	html += '<input type="hidden" id="_id" value="' + id + '"/>';
	//html += '<input type="hidden" id="_rev" value="' + rev + '"/>';
	html += '<tr><td>ID :</td><td><input id="task_id2" type="text" size="50" value="' + task_id + '"/></td></tr>';
	html += '<tr><td>Start Date:</td><td><input id="start_date2" type="text" size="50" value="' + start_date + '"/></td></tr>';
	html += '<tr><td>End Daten:</td><td><input id="start_date2" type="text" size="10" value="' + end_date + '"/></td></tr>';
	html += '<tr><td>Priority :</td><td><input id="priority2" type="text" size="50" value="' + priority + '"/></td></tr>';
	html += '<tr><td>Start Date:</td><td><input id="description2" type="text" size="50" value="' + description + '"/></td></tr>';
	html += '<tr><td>End Daten:</td><td><input id="status2" type="text" size="10" value="' + status + '"/></td></tr>';
	html += '<tr><td colspan="2" align="center"><button type="button" class="btn btn-primary" onClick="updateDoc()">Ok</button></td></tr>';
	
	$('#edit').html(html);
}

function updateDoc(){
	
	var id = $("#_id").val();
	var rev = $("#_rev").val();
	var name = $("#name2").val();
	var firstName = $("#firstName2").val();
	var points = $("#points2").val();

	var doc = {};

	doc._id = id;
	doc._rev = rev;
	doc.name = name;
	doc.firstName = firstName;
	doc.points = parseInt(points);
	var json = JSON.stringify(doc);

	$.ajax({
		type : 'PUT',
		url : '../../' + id,
		data : json,
		contentType : 'application/json',
		async : true,
		success : function(data){
			$('#edit').hide();
			$('#output').show();
			buildOutput();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown);
		}
	});
}

function fillTypeAhead(){
	
	$.ajax({
		type:	'GET',
		url:	'_view/allstudents',
	    async: true,
	    success:function(data){ 
	        var rows = JSON.parse(data).rows;
	        var names = [];
	        //var names = new Array();
	        $.each(rows, function(key, value){
	        	names.push(value.key);
	        });
	        
	        $('#students').typeahead({source: names});
	    },
		error: function(XMLHttpRequest, textStatus, errorThrown) { alert(XMLHttpRequest.responseText); }
	});
}

function searchDoc(){
	
	var name = $("#todo").val();
	//console.log(name);
	var docName = name.replace(/\s+/g, '');
	console.log(docName);
	
	$.ajax({
		type:	'GET',
		url:	'../../' + docName,
	    async: true,
	    success:function(data){
	    	var doc = JSON.parse(data);
	    	editDoc(docName, doc._rev, doc.task_id, doc.start_date, doc.end_date, doc.priority, doc.description);
	    },
		error: function(XMLHttpRequest, textStatus, errorThrown) { alert(XMLHttpRequest.responseText); }
	});	
}

$(document).ready(function(){
	fillTypeAhead();
});