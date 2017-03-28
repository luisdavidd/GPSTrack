/*
  jQuery Document ready
*/
var map;
var flightPlanCoordinates;
var flightPath;
var markeri;
var markerf;
var myinitial;
var mylast;
var sended;
var sendst;
var tempini;
var tempend;
var newini;
var newend;
var calendar_output;
sendnrecieve();

function initp()
{	

    
    calendar_output =  document.getElementById('date').value;
   	calendar_output = calendar_output.replace(" - "," * ")
    calendar_output = calendar_output.split("*");
    calendar_startdate = calendar_output[0];
    calendar_enddate = calendar_output[1];
    return[calendar_startdate,calendar_enddate]
    	
   	
};

function sendnrecieve(){
	
	results = initp();
	tempini = results[0];
	tempend = results[1];
	setInterval(function(){
			results = initp();
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
    		var entiredata = coordinates.split("*");
    		var coorC = [];
    		var latC  = [];
    		var lonC  = []; 
    		var dateC = [];
    		var timeC = [];
    		var positionC = [];
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
    		map.setOptions({styles: styles['retro']});7
    		var myLatLng = new google.maps.LatLng(latC[Math.round((latC.length - 2) / 2)],lonC[Math.round((lonC.length - 2) / 2)]);
		    var myOptions = {
		        scrollwheel: true,
		        draggable: true,
		        //disableDefaultUI: true,
		        mapTypeControl: false,
		        scaleControl: true,
		        zoomControl: true,
		        center:myLatLng,
		        zoom: 17
		    };

		    //Edit BLACK Polyline
            flightPlanCoordinates = [{lat:Number(latC[latC.length-2]),lng:Number(lonC[latC.length-2])}];
            for(i=1;i<latC.length-1;i++){
                flightPlanCoordinates.push({lat:Number(latC[(latC.length-2)-i]),lng:Number(lonC[(latC.length-2)-i])});
            }

            flightBlack.setPath(flightPlanCoordinates);


		    // Locate initial point
		    myinitial = new google.maps.LatLng(latC[latC.length-2],lonC[latC.length-2]);
            markeri.setPosition(myinitial);

		    //Locate last point
		    mylast = new google.maps.LatLng(latC[0],lonC[0]) ;
            markerf.setPosition(mylast);

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

