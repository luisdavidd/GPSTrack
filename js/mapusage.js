$(window).load(loadjs());   //Wait the page to be fully loaded (Inner frames, images, etc)

var map;
var flightPlanCoordinates;
var flightPath;
var markerinit;
var marker;
var myinitialpot;
var myLatLnglast;


function loadjs(){
    init();  
}

function initmap(){
     
    var myOptions = {
        //scrollwheel: false,
        //draggable: false,
        //disableDefaultUI: true,
        mapTypeControl: false,
        scaleControl: true,
        zoomControl: true,
        center: new google.maps.LatLng(+11.01930, -74.85152),
        zoom: 16
    };

    map = new google.maps.Map(document.getElementById('map'), myOptions);
    flightPlanCoordinates = [];

    //flightPath.setMap(null);
    flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        //strokeColor: '#000000',
        strokeColor: '#FFCF00',
        strokeOpacity: 2.0,
        strokeWeight: 5
    });
    
    myinitialpot = new google.maps.LatLng(+11.01930, -74.85152);
    markerinit = new google.maps.Marker({
        position: myinitialpot,
        title: 'Start',
        icon: {
        url: "images/init.png",
        scaledSize: new google.maps.Size(60, 70)
    }
    });

    myLatLnglast = new google.maps.LatLng(+11.01930, -74.85152);
    marker = new google.maps.Marker({
        position: myLatLnglast,
        title: 'Current Position',
        icon: {
        url: "images/truck.png",
        scaledSize: new google.maps.Size(60, 78)
    }
    });

    init();
    // // Set the map's style to the initial value of the selector.    
}
function init(){
    var temp = 0;
    var numb_init = 0;
    $.post('php/changes.php',function(num){
       numb_init = num;
    });
    temp = numb_init;
    setInterval(function(){
       $.post('php/changes.php',function(num){
        numb_init = num;
       if(numb_init != temp) {
            temp = numb_init;
            readData();
       }
    });
    }, 2000);
    
}

function readData(){  //This function fetches the requested php code and inserts it on the function defined
    $.post('php/readata.php',function(coordinates){
        processreadData(coordinates)
    });
}

function processreadData(coordinates){
    
    console.log(coordinates);
    var entiredata = coordinates.split("*");
    var coorC = [];
    var latC  = [];
    var lonC  = []; 
    var dateC = [];
    var timeC = [];
    var positionC = [];
    //var flightPlanCoordinates = [];
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
    map.setOptions({styles: styles['retro']});

    for(i = 1;i<latC.length-1;i++){

        //Calculate distance
        var R = 6371e3; // metres (Radius of earth)
        var φ1 = (latC[i-1]* Math.PI) / 180;
        var φ2 = (latC[i]* Math.PI) / 180;
        var Δφ = ((latC[i-1]-latC[i])* Math.PI)/ 180;
        var Δλ = ((lonC[i-1]-lonC[i])* Math.PI) / 180;

        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        var d = R * c; 
        if(d>30){
            console.log("Hola soy mayor que 30");
            console.log(d);        
        }else{
            console.log("Hola soy menor que 30")
            console.log(d);
        }
    }
    
    LatLng = new google.maps.LatLng(latC[Math.round((latC.length - 2) / 2)],lonC[Math.round((lonC.length - 2) / 2)]);
    var myOptions = {
        scrollwheel: true,
        draggable: true,
        //disableDefaultUI: true,
        mapTypeControl: false,
        scaleControl: true,
        zoomControl: true,
        center:LatLng,
        zoom: 17
    };

    //Make Polyline
    flightPlanCoordinates = [{lat:Number(latC[0]),lng:Number(lonC[0])}];
    for(i=1;i<latC.length;i++){
        flightPlanCoordinates.push({lat:Number(latC[i]),lng:Number(lonC[i])});
    }

    flightPath.setMap(null);
    flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        //strokeColor: '#000000',
        strokeColor: '#FFCF00',
        strokeOpacity: 2.0,
        strokeWeight: 5
    });
    flightPath.setMap(map);

    // Locate initial point
    myinitialpot = new google.maps.LatLng(latC[latC.length-2],lonC[lonC.length-2]);
    markerinit.setMap(null);
    markerinit = new google.maps.Marker({
        position: myinitialpot,
        title: 'Start',
        icon: {
        url: "images/init.png",
        scaledSize: new google.maps.Size(60, 70)
    }
    });

    markerinit.setMap(map);

    //Locate last point
    myLatLnglast = new google.maps.LatLng(latC[0],lonC[0]);
    marker.setMap(null); 
    marker = new google.maps.Marker({
        position: myLatLnglast,
        title: 'Current Position',
        icon: {
        url: "images/truck.png",
        scaledSize: new google.maps.Size(60, 78)
    }
    });
    
    marker.setMap(map);  
     
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
