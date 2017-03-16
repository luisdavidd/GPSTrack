/*
  jQuery Document ready
*/
var map;
var flightPlanCoordinates;
var flightBlack;
var markerf;
var markeri;
var myinitialpot;
var myLatLnglast;
var sended;
var sendst;
var tempini;
var tempend;
var newini;
var newend;
sendnrecieve();

function init()
{
	var startDateTextBox = $('#calendar_start');
	var endDateTextBox = $('#calendar_end');


	startDateTextBox.datetimepicker({ 
		timeFormat: 'HH:mm:ss',
		dateFormat: 'yy-mm-dd',
		onClose: function(dateText, inst) {
			if (endDateTextBox.val() != '') {
					var testStartDate = startDateTextBox.datetimepicker('getDate');
					var testEndDate = endDateTextBox.datetimepicker('getDate');
				if (testStartDate > testEndDate)
					endDateTextBox.datetimepicker('setDate', testStartDate);
					sended = dateText;
			}
			else {
				endDateTextBox.val(dateText);
				sended = dateText;
			}
		},
		onSelect: function (selectedDateTime){
			endDateTextBox.datetimepicker('option', 'minDate', startDateTextBox.datetimepicker('getDate') );
		}
	});
	endDateTextBox.datetimepicker({ 
		timeFormat: 'HH:mm:ss',
		dateFormat: 'yy-mm-dd',
		onClose: function(dateText, inst) {
			if (startDateTextBox.val() != '') {
					testStartDate = startDateTextBox.datetimepicker('getDate');
					testEndDate = endDateTextBox.datetimepicker('getDate');
				if (testStartDate > testEndDate)
					startDateTextBox.datetimepicker('setDate', testEndDate);
					sendst = dateText;
			}
			else {
				startDateTextBox.val(dateText);
				sendst = dateText;
			}
		},
		onSelect: function (selectedDateTime){
			startDateTextBox.datetimepicker('option', 'maxDate', endDateTextBox.datetimepicker('getDate') );
		}
	});
		
		/*
			below code just enable time picker.
		*/	
		$('#basic_example_2').timepicker();

		

		return [sended,sendst];
		
};

function sendnrecieve(){
	
	results = init();
	tempini = results[0];
	tempend = results[1];
	setInterval(function(){
			results = init();
			newini = results[0];
			newend = results[1];
			if(newini!= tempini || newend!= tempend){
				if(newini != tempini){
					tempini = newini;
				}else{
					tempend = newend;
				}
				remake(newini,newend);
			}

	},1000);


}

function remake(param1,param2){
	$.ajax({
        url: 'php/readdates.php', //This is the current doc
     	type: "POST",
     	data: ({init: param1,end:param2}),

     	success: function(coordinates){
     		console.log(coordinates);
    		var entiredata = coordinates.split("*");
    		var coorC = [];
    		var latC  = [];
    		var lonC  = []; 
    		var dateC = [];
    		var timeC = [];
    		var positionC = [];

            var DATE;
            var TIME;
            var iore = 0;
            var kinitial;
            var kend;
    		for(i=0;i<entiredata.length;i++){
		        coorC = entiredata[i].split(" ");
		        latC.push(coorC[0]);
		        lonC.push(coorC[1]);
		        dateC.push(coorC[2]);
		        timeC.push(coorC[3]);
		        positionC.push(coorC[4]);
    		}
		    delete latC[latC.length-1];
		    delete lonC[lonC.length-1];
		    delete dateC[dateC.length-1];
		    delete timeC[timeC.length-1];

            aammddend = dateC[0].split("-");
            hhmmssend = timeC[0].split(":");
            aammddinit = dateC[latC.length-2].split("-");
            hhmmssinit = timeC[latC.length-2].split(":");

         		map.setOptions({styles: styles['retro']});7
    		var myLatLng = new google.maps.LatLng(latC[Math.round((latC.length - 2) / 2)],lonC[Math.round((lonC.length - 2) / 2)]);
		    var myOptions = {
		        scrollwheel: true,
		        draggable: true,
		        disableDefaultUI: false,
		        mapTypeControl: false,
		        scaleControl: true,
		        zoomControl: true,
		        center:myLatLng,
		        zoom: 17
		    };

		    //Make Polyline
		    flightPlanCoordinates = [{lat:Number(latC[0]),lng:Number(lonC[0])}];
		    for(i=1;i<latC.length-1;i++){
		        flightPlanCoordinates.push({lat:Number(latC[i]),lng:Number(lonC[i])});
		    }


		    //Poly Negra
		    flightBlack.setPath(flightPlanCoordinates);
		    	    

		    // Locate initial point
		    myinitialpot = new google.maps.LatLng(latC[latC.length-2],lonC[lonC.length-2]);
		    markerf.setMap(null);
		    markerf = new google.maps.Marker({
		        position: myinitialpot,
		        title: 'Current Position',
		        icon: {
		        url: "images/truckoff.png",
		        scaledSize: new google.maps.Size(64*2/3, 78*2/3)
		    }
		    });

    		markerf.setMap(map);

		    //Locate last point
		    myLatLnglast = new google.maps.LatLng(latC[0],lonC[0]);
		    markeri.setMap(null); 
		    markeri = new google.maps.Marker({
		        position: myLatLnglast,
		        title: 'Start',
		        icon: {
		        url: "images/init.png",
		        scaledSize: new google.maps.Size(64, 96)
		    }
		    });
    
    		markeri.setMap(map);  
        }
	}); 

}

var styles = {
    default: null,
    retro: [
        {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
        {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{color: '#c9b2a6'}]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [{color: '#dcd2be'}]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{color: '#ae9e90'}]
        },
        {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#93817c'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{color: '#a5b076'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#447530'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#f5f1e6'}]
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{color: '#fdfcf8'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#f8c967'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#e9bc62'}]
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [{color: '#e98d58'}]
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [{color: '#db8555'}]
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{color: '#806b63'}]
        },
        {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [{color: '#8f7d77'}]
        },
        {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#ebe3cd'}]
        },
        {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{color: '#b9d3c2'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#92998d'}]
        }
    ]
};   

