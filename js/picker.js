/*
  jQuery Document ready
*/
var map;
var flightPlanCoordinates;
var flightBlack;
var flightPath;
var flightA;
var markeri;
var markerf;
var myinitialpot;
var myLatLnglast;
var sended;
var sendst;
var tempini;
var tempend;
var newini;
var newend;
var calendar_output;
var markersArray = [];
var cont = 0;
var globyx;
var p3;
var urltosend;
var ct;
var polysArray = [];
var polyB = 0;
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
    ct = 0;
	setInterval(function(){
            
			results = initp();
			newini = results[0];
			newend = results[1];
			if(newini!= tempini || newend!= tempend || ct!=globyx){
				if(newini != tempini){
					tempini = newini;
				}else if(newend!= tempend){
					tempend = newend;
				}else if(ct!=globyx){
                    //console.log("Cambie puta madre")
                    ct= globyx;
                    if(globyx==="truck1"){
                        p3=1;
                    }else if(globyx=="truck2"){
                        p3=2; 
                    }else if(globyx=="bothtrucks"){
                        p3=3;
                    }else{
                        p3=3; 
                    }
                }
				remake(newini,newend,p3);
			}

	},1000);

}

function remake(param1,param2,param3){
    if(param3==1){
        urltosend = 'php/readdatesc1.php'
    }else if(param3==2){
        urltosend = 'php/readdatesc2.php'
    }else{
        urltosend = 'php/readdates.php'
    }
	$.ajax({
        url: urltosend, //This is the current doc
     	type: "POST",
     	data: ({init: param1,end:param2}),

     	success: function(coordinates){
            //console.log(coordinates);

    		var entiredata = coordinates.split("*");
    		var coorC = [];
    		var latC  = [];
    		var lonC  = []; 
    		var dateC = [];
    		var timeC = [];
    		var positionC = [];
            var routeC = [];
            var faceC = [];
            
    		for(i=0;i<entiredata.length;i++){
		        coorC = entiredata[i].split(" ");
		        latC.push(coorC[0]);
		        lonC.push(coorC[1]);
		        dateC.push(coorC[2]);
		        timeC.push(coorC[3]);
                routeC.push(coorC[4]);
                faceC.push(coorC[5]);

    		}

		    delete latC[latC.length-1];
		    delete lonC[lonC.length-1];
		    delete dateC[dateC.length-1];
		    delete timeC[timeC.length-1];
            delete routeC[routeC.length-1];
            delete faceC[faceC.length-1];
    		map.setOptions({styles: styles['retro']});
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

            ////////////////////////////////////////////poly Array/////////////////////////////
            

            for (v=0;v<polysArray.length;v++){
                polysArray[v].setMap(null);
            } 
            //console.log(Math.max(...routeC))
            polysArray = [];
            for(i=0;i<=16;i++){
                var j = 0;
                var ic = 0; 
                var long = [];
                var lati = [];
                var indxs = [];
                var d = 0;
                //polysArray = [];

                //flightA.setMap(null);
                flightPlanCoordinates = [];
                console.log("i:")
                console.log(i)
                while(routeC.indexOf(i.toString(),ic) != -1){
                    indxs.push(routeC.indexOf(i.toString(),ic));
                    //console.log("index:")
                    //console.log(routeC.indexOf(i.toString(),ic))
                    ic = routeC.indexOf(i.toString(),ic) +1;
                }
                console.log("length")
                console.log(indxs.length)
                
                for(j=0;j<indxs.length;j++){
                    long[j] = Number(lonC[indxs[j]]);
                    lati[j] = Number(latC[indxs[j]]);  
                }
                //console.log(indxs.length)
                //console.log(i)
                flightPlanCoordinates = [{lat:Number(lati[lati.length-1]),lng:Number(long[lati.length-1])}];
                console.log("long:")
                console.log(long);
                if(lati.length>1){
                    d=1;
                    for(m=1;m<lati.length;m++){
                        flightPlanCoordinates.push({lat:Number(lati[(lati.length-1)-m]),lng:Number(long[(lati.length-1)-m])});
                    }
                    flightA = new google.maps.Polyline({
                        path: flightPlanCoordinates,
                        geodesic: true,
                        clickable: false,
                        strokeColor: '#FFCF00',
                        //strokeColor: '#FFFFFF',
                        strokeWeight: 5
                    });

                    flightA.setMap(map);
                    polysArray.push(flightA);
                    console.log("polyA")
                    polyB = polysArray.length-1;
                    polysArray[polysArray.length-1].setMap(map);
                    myinitialpot = new google.maps.LatLng(lati[lati.length-1],long[lati.length-1]);
                    myLatLnglast = new google.maps.LatLng(lati[0],long[0]);
                    
                }
                //console.log(flightPlanCoordinates)
                //flightA.setMap(null);
            }
            //polysArray[polyB].setVisible(false);
            //console.log("LongArray:")
            //console.log(polysArray.length)
            polfor();

            function polfor(){

                for(c=0; c<polysArray.length;c++){
                    if(c!=polyB){
                        polysArray[c].setOptions({clickable: true});
                        google.maps.event.addListener(polysArray[c],'click',function(){
                            mypoly(this);
                        });
                    }
                    
                 }
            }
             function mypoly(c){
                for(i=0; i < polysArray.length; i++){
                    if(c == polysArray[i]){
                        polysArray[polyB].setOptions({clickable: true});
                        polyB = i;
                        polysArray[polyB].setOptions({clickable: false});
                        flightPlanCoordinates = polysArray[i].getPath();
                        flightPath.setPath(flightPlanCoordinates);
                        flightBlack.setPath(flightPlanCoordinates);
                        if(flightPlanCoordinates.length<2){
                            flightPath.setVisible(false); 
                            flightBlack.setVisible(false);
                        }else{
                            flightPath.setVisible(true);
                            flightBlack.setVisible(true);
                        }

                        myinitialpot = flightPlanCoordinates.getAt(0); //flightPlanCoordinates[1];
                        myLatLnglast = flightPlanCoordinates.getAt(flightPlanCoordinates.length-1); //flightPlanCoordinates[flightPlanCoordinates.length-1];
                        markeri.setPosition(myinitialpot);
                        markerf.setPosition(myLatLnglast);
                        if(flightPlanCoordinates.length<2){
                            markerf.setVisible(false); 
                            markeri.setVisible(false);
                        }else{
                            markerf.setVisible(true);
                            markeri.setVisible(true);
                        }

                        //console.log(flightPlanCoordinates);
                    }
                    polfor();
                }
                // polyB = c;
                // console.log(c);
             }
            //////////////////////////////////////////////////////////////////////////////////

            // //Make Polyline
            // flightPlanCoordinates = [{lat:Number(latC[latC.length-2]),lng:Number(lonC[latC.length-2])}];
            // for(i=1;i<latC.length-1;i++){
            //     flightPlanCoordinates.push({lat:Number(latC[(latC.length-2)-i]),lng:Number(lonC[(latC.length-2)-i])});
            // }

            flightPath.setPath(flightPlanCoordinates);
            console.log("polyPath")

            flightBlack.setPath(flightPlanCoordinates);
            console.log("polyNegra")

            if(flightPlanCoordinates.length<2){
                flightPath.setVisible(false); 
                flightBlack.setVisible(false);
            }else{
                flightPath.setVisible(true);
                flightBlack.setVisible(true);
            }
            
		    // Locate initial point
		    //myinitialpot = new google.maps.LatLng(latC[latC.length-2],lonC[latC.length-2]);
    		markeri.setPosition(myinitialpot);

		    //Locate last point
		    //myLatLnglast = new google.maps.LatLng(latC[0],lonC[0]);
            //console.log(myLatLnglast)
    		markerf.setPosition(myLatLnglast);
            if(flightPlanCoordinates.length<2){
                markerf.setVisible(false); 
                markeri.setVisible(false);
            }else{
                markerf.setVisible(true);
                markeri.setVisible(true);
            }
 
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

