$(document).ready(function() {
	$("#poll-creator").css("display", "none");
	var text = $("#poll-creator").text();
	var title = getTitle(text);
	var type = getType(text);
	var result = getResults(text);
	var num_result = result.length;
	var canvas = document.getElementById("poll-display");
	var context = canvas.getContext("2d");
	var width  = canvas.width;
	var height = canvas.height;
	
	//var divider_length = poll_width * 0.7917;
	var title_x = 0.5 * width;
	var title_y = 0.13 * height;
	var title_size = height / 17;
	writeTitle(context, title, title_x, title_y, title_size);
	
	var bottom_divider_x = 0.09 * width;
	var bottom_divider_y = 0.85 * height;
	var divider_length = 0.85 * width;
	var divider_height = 0.1675 * height; 
	drawDividers(context, bottom_divider_x, bottom_divider_y, 
				 divider_length, divider_height);
	
	var marker_x = 0.080 * width;
	var marker_y = 0.86 * height;
	var marker_size = height / 30;
	var markers = getMarkerArray(getHighestResult(result));
	writeMarkers(context, marker_x, marker_y, divider_height, marker_size, markers);
	
	var rect_dividers = getRectDividers(bottom_divider_x, divider_length, num_result);
	var overall_height = divider_height * 4;
	var heighest_divider = markers[markers.length - 1];
	var colors = getColors(text);
	drawRectangles(context, rect_dividers, bottom_divider_y, overall_height, heighest_divider, colors, result);
	
	writeNames(context, rect_dividers, bottom_divider_y, height, result);
});

function writeNames(context, dividers, divider_y, height, result) {
	var divLength = dividers[1] - dividers[0];
	var sideway = false;
	if (result.length >= 7) {
		sideway = true;
	}
	if (sideway == false) {
		for (r in result) {
			var x = dividers[r] + (divLength / 2);
			var y = divider_y + (height / 20);
			var text = textValidator1(context, result[r][0], divLength);
			context.fillStyle = "black";
			context.textAlign = "center";
			context.font = height / 24 + "px Arial";
			context.fillText(text, x, y);
		}
	} else {
		for (r in result) {
			var x = dividers[r] + (divLength / 3);
			var y = divider_y + (height / 28);
			context.save();
			context.fillStyle = "black";
			context.textAlign = "left";
			
			context.font = height / (result.length * 3) + "px Arial";
			context.translate(x,y);
			var metrics = context.measureText(result[r][0]);
			var text = textValidator2(context, result[r][0], divLength);
			context.rotate(Math.PI / 6)
			context.fillText(text, 0, 0);
			context.restore();
		}
	}
}

function textValidator1(context, text, divLength) {
	var textWidth = context.measureText(text).width;
	var dotWidth = context.measureText("...").width;
	if (textWidth  < divLength) {
		return text;
	} else {
		while(context.measureText(text + "...").width >= divLength) {
			text = text.slice(0,text.length - 2);
		}
		return text + "...";
	}
}


function textValidator2(context, text, divLength) {
	var textWidth = context.measureText(text).width;
	var dotWidth = context.measureText("...").width;
	if (textWidth - 100 < divLength) {
		return text;
	} else {
		while(context.measureText(text + "...").width - 80 >= divLength) {
			text = text.slice(0,text.length - 2);
		}
		return text + "...";
	}
}
function drawRectangles(context, dividers, divider_y, overall_height, num, colors, result) {
	var rectLength = 0.85 * (dividers[1] - dividers[0]);
	for (r in result) {
		var x = dividers[r] + ((dividers[1] - dividers[0]) - rectLength) / 2;
		var y = divider_y - (result[r][1] / num) * overall_height;
		var h = (result[r][1] / num) * overall_height;
		var w = rectLength;
		context.beginPath();
        context.rect(x,y,w,h);
        context.fillStyle = colors[r % colors.length].trim();
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = colors[r % colors.length].trim();
        context.stroke();
	}
}


function getRectDividers(x, length, num) {
	var dl = length / num;
	var returnArray = new Array();
	returnArray.push(x);
	for (i = 1; i <= num - 1; i++) {
		returnArray.push(x + i * dl);
	} 
	return(returnArray);
}	

function writeTitle(context,title, x, y, size) {
	context.fillStyle = "black";
	context.textAlign = "center";
	context.font = "bold " + size + "px Verdana";
	context.fillText(title, x, y);	
}

function drawDividers(context, x, y, length, height) {
	for (i = 0; i <= 4; i += 1) { 
		context.beginPath();
		context.moveTo(x,y - i * height);
		context.lineTo(x + length, y - i * height);
		if (i != 0) {
			context.lineWidth = 0.5;
			context.strokeStyle = "#949494";
		} else {
			context.lineWidth = 1;
			context.strokeStyle = "black";
		}
		context.stroke();
	}
}

function writeMarkers(context, x, y, height, size, markers) {
	for (i = 0; i <= 4; i += 1) {
		context.fillStyle = "black";
		context.textAlign = "right";
		context.font = size + "px Arial";
		context.fillText(markers[i], x, y - i * height);	
	}
}

function getMarkerArray(num) {
	var markerArray = new Array();
	var dnum = denumGenerator(num);
	for (i = 0; i <= dnum * 4; i += dnum) {
		markerArray.push(i);
	}
	return markerArray;
}

/** Need Change */
function denumGenerator(num) {
	var exp = 1;
	for (i = 1; i < 1000; i ++) {
		if (num < 4 * Math.pow(10,i)) {
			exp = i; 
			break;
		}	
	}
	return (Math.ceil(num / (4 * Math.pow(10, exp - 1))) * Math.pow(10, exp - 1));
}

function getHighestResult(poll_result) {
	var highestNum = 0;
	for (result in poll_result) {
		if (poll_result[result][1] > highestNum) {
			highestNum = poll_result[result][1];
		}
	}
	return highestNum;
}

/** 
	Returns the title from .html file
*/
function getTitle(text) {
	if (text.indexOf("#title")!=-1) {
		var title = text.match("#title.*;").toString();
		var title = title.split(":")[1]
		title = title.trim();
		title = title.replace(";", "");
		return(title);
	}
}

/**
	Returns the type of graph from .html file
*/
function getType(text) {
	if (text.indexOf("#type")!=-1) {
		var type = text.match("#type.*;").toString();
		var type = type.split(":")[1]
		type = type.trim();
		type = type.replace(";", "");
		return(type);
	}
}

/**
	Returns the result from .html file into an array.
	The array contains arrays in {Name, Value} format.
	{{Name, Value}, {Name, Value}, {Name, Value}}
*/
function getResults(text) {
	var returnArray = new Array();
	var resultArray = text.split(";");
	for (result in resultArray) {
		var textResult = resultArray[result].trim();
		if (textResult.charAt(0) == "$"
			& !isNaN(textResult.charAt(textResult.length-1))) {
			var name = textResult.replace(new RegExp(":.*$"),"").substr(1).trim();
			var count = Number(textResult.replace(new RegExp("^.*:"),""));
			returnArray.push([name,count]);
		}
	}
	return(returnArray);
}

function getColors(text) {
	if (text.indexOf("#color")!=-1) {
		var color = text.match("#color.*;").toString();
		var color = color.split(":")[1];
		color = color.trim();
		color = color.replace(";", "");
		var colors = color.split(",");
		return(colors);
	} else {
		return black;		
	}
}


