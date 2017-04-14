$(window).load(loadjs());   //Wait the page to be fully loaded (Inner frames, images, etc)
// var flightPath;

var map;
var flightPlanCoordinates;
var flightPath;
var flightBlack
var markerinit;
var marker;
var myinitialpot;
var myLatLnglast;
var circlep;
var stateb1=0;
var stateb2=1;
var popup;
var goCenterUI;
var goCenterText;
function loadjs(){
    init();
}
function CenterControl(controlDiv, map, center) {
    // We set up a variable for this since we're adding event listeners
    // later.
    var control = this;

    // Set the center property upon construction
    control.center_ = center;
    controlDiv.style.clear = 'both';

    // Set CSS for the control border
    goCenterUI = document.createElement('div');
    goCenterUI.id = 'goCenterUI';
    goCenterUI.title = 'Click to recenter the map';
    goCenterUI.style.backgroundColor = '#fff';
    goCenterUI.style.border = '2px solid #fff';
    goCenterUI.style.borderRadius = '3px';
    goCenterUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    goCenterUI.style.cursor = 'pointer';
    goCenterUI.style.float = 'left';
    goCenterUI.style.marginBottom = '22px';
    goCenterUI.style.textAlign = 'center';
    controlDiv.appendChild(goCenterUI);

    // Set CSS for the control interior
    goCenterText = document.createElement('div');
    goCenterText.id = 'goCenterText';
    goCenterText.style.color = 'rgb(25,25,25)';
    goCenterText.style.fontFamily = 'Roboto,Arial,sans-serif';
    goCenterText.style.fontSize = '16px';
    goCenterText.style.lineHeight = '38px';
    goCenterText.style.paddingLeft = '5px';
    goCenterText.style.paddingRight = '5px';
    goCenterText.innerHTML = 'When?';
    goCenterUI.appendChild(goCenterText);

  }

  /**
   * Define a property to hold the center state.
   * @private
   */
  CenterControl.prototype.center_ = null;

  /**
   * Gets the map center.
   * @return {?google.maps.LatLng}
   */
  CenterControl.prototype.getCenter = function() {
    return this.center_;
  };

  /**
   * Sets the map center.
   * @param {?google.maps.LatLng} center
   */
  CenterControl.prototype.setCenter = function(center) {
    this.center_ = center;
};

function initmapi(){
    
     var myOptions = {
         //scrollwheel: false,
         //draggable: false,
         //disableDefaultUI: true,
         mapTypeControl: true,
         scaleControl: true,
         zoomControl: true,
         center: new google.maps.LatLng(+11.01930, -74.85152),
         zoom: 17
     };

    map = new google.maps.Map(document.getElementById('map'), myOptions);
   
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv.index = 1;

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    flightPlanCoordinates = [];
    // google.maps.event.addDomListener(window, 'load', initmapi);
    // google.maps.event.addDomListener(window, "resize", function() {
    //  google.maps.event.trigger(map, "resize");
    // });


    
}

function init(){
       readData();
}

function readData(){  //This function fetches the requested php code and inserts it on the function defined
    $.post('php/redformaphistoric.php',function(coordinates){
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
    var DATE;
    var TIME;
    //var markeraprox;
    var iore = 0;
    var kinitial;
    var kend;
    var myLatLngLiteral;
    var markersArray = [];
    var markerp;
    var radioi;
    var lngi;
    var lati;
    var r;
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

      console.log(typeof(latC[0]));


    aammddend = dateC[0].split("-");
    hhmmssend = timeC[0].split(":");
    aammddinit = dateC[latC.length-2].split("-");
    hhmmssinit = timeC[latC.length-2].split(":");

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
        zoom: 13
    };

    //Make Polyline
    flightPlanCoordinates = [{lat:Number(latC[latC.length-2]),lng:Number(lonC[latC.length-2])}];
    for(i=1;i<latC.length-1;i++){
        flightPlanCoordinates.push({lat:Number(latC[(latC.length-2)-i]),lng:Number(lonC[(latC.length-2)-i])});
    }

    // Locate initial point
    var myinitial = new google.maps.LatLng(latC[latC.length-2],lonC[lonC.length-2]);
    kinitial = latC.length-2;
    markeri = new google.maps.Marker({
        position: myinitial,
        title: 'Start',
        label: '',
        icon: {
        url: "images/init.png",
        scaledSize: new google.maps.Size(60, 70)
    }
    });
    markeri.setMap(map); 

    //Locate last point
    var mylast = new google.maps.LatLng(latC[0],lonC[0]);
    kend = 0;
    markerf = new google.maps.Marker({
        position: mylast,
        title: 'End',
        icon: {
        url: "images/truckoff.png",
        scaledSize: new google.maps.Size(60*2/3, 78*2/3)
    }
    });
    markerf.setMap(map); 
    //Centrar Polílinea 
    function zoomToObject(obj){
    var bounds = new google.maps.LatLngBounds();
    var points = obj.getPath().getArray();
    for (var n = 0; n < points.length ; n++){
            bounds.extend(points[n]);
        }
        map.fitBounds(bounds);
    }

    flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FFCF00',
        //strokeColor: '#FFFFFF',
        strokeOpacity: 0.8,
        strokeWeight: 5,
    });

    flightPath.setMap(map);
    if(isNaN(latC[0])==false){
        zoomToObject(flightPath);
    }


    //Poly Negra
    flightBlack = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        clickable: false,
        strokeColor: '#000000',
        strokeWeight: 5
    });
    flightBlack.setMap(map);
    if(isNaN(latC[0])==false){
        zoomToObject(flightBlack);
    }


    

    var circle = new google.maps.Circle({
      strokeColor: '#000000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#EBC14C', //FFCF00
      fillOpacity: 0.35,
      center: mylast,
      radius: 80,
      visible: false,
      map: map,
      editable: true
    });
    google.maps.event.addListener(circle,"center_changed", function(){
        if (circle.getVisible()==true){
            areaData();
        }
        
    });
    google.maps.event.addListener(circle,"radius_changed", function(){
        if (circle.getVisible()==true){
            areaData();
        }
    });


/////////////////Función ÁREA////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function areaData(){
    for (v=0;v<markersArray.length;v++){
        markersArray[v].setMap(null);
    }   
    var bounds = circle.getBounds();
    var centerc = circle.getCenter();
    var centerlng = centerc.lng();
    var centerlat = centerc.lat();
    var east = bounds.getNorthEast();
    var radiob = Math.abs(east.lng() - centerlng);

    for(i=0;i<entiredata.length;i++){
    myLatLngLiteral = new google.maps.LatLng(latC[i],lonC[i]);
        
        lati = Number(latC[i]);
        lngi = Number(lonC[i]);
        r = Math.pow((lati - centerlat),2) + Math.pow((lngi - centerlng),2);
        radioi = Math.sqrt(r);
        if (radioi<radiob){

            markerp = new google.maps.Marker({
                position: myLatLngLiteral,
                title: dateC[i]+' at '+timeC[i],
                icon: {
                url: "images/initoff.png",
                scaledSize: new google.maps.Size(60/3, 70/3)
            }
            });
            markerp.setMap(map); 
            markersArray.push(markerp);

        }
    }
}
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 /////////////////////////////////////////////////SWITCHEAR ICONOS INI & FIN////////////////////////////////////////////////////////////
google.maps.event.addListener(markerf,'click',function(event){
if (iore==1){

    var myinitial = markeri.getPosition();
    var meh = "+"+myinitial.lat();
    //var nel = latC[latC.length-2];
    var kinitial = latC.indexOf(meh.toString());

    var  mylast = markerf.getPosition();
    var meh = "+"+mylast.lat();
    //      var nel = latC[0];
    var kend = latC.indexOf(meh.toString()); 

    DATEi = dateC[kinitial];
    TIMEi = timeC[kinitial];
    DATEe = dateC[kend];
    TIMEe = timeC[kend];
    aammddend = DATEe.split("-");
    hhmmssend = TIMEe.split(":");
    aammddinit = DATEi.split("-");
    hhmmssinit = TIMEi.split(":");

    if(aammddend[1]-aammddinit[1]==0){
        var days = aammddend[2] - aammddinit[2];

    }else{
        var days = 31+(aammddend[2]-aammddinit[2]);
    }
  //  sm = DATEi+" "+TIMEi;
    //var days = aammddend[2] - aammddinit[2];
    var hours = hhmmssend[0] - hhmmssinit[0];
    var min = hhmmssend[1] - hhmmssinit[1];
    var secs = hhmmssend[2] - hhmmssinit[2];
    if (secs<0){
        min = min - 1;
        secs = 60 + secs;
    }
    if (min<0){
        hours = hours - 1;
        min = 60 + min;
    }
    
    if (hours<0){
        days = days - 1;
        hours = 24 + hours;
    } 


  // alert("This travel took "+hours+" hours, "+min+" minutes with "+secs+" seconds ");
    popup = new google.maps.InfoWindow({
    content: '<div id="content">'+
      '<p><b>Trip info </b></p>'+
      '<p>This travel took '+days.toString()+' days with '+hours.toString()+' hours, '+min.toString()+' minutes with '+secs.toString()+' seconds. </p>'+
      '<p><b>This point: </b> '+DATEe.toString()+' at '+TIMEe.toString()+'. </p>'+
      '</div>'
    });
    popup.open(map, markerf);
}
iore = 1;

    markeri.setIcon({
        url: "images/initoff.png",
        scaledSize: new google.maps.Size(60*2/3, 70*2/3)
    });
    markerf.setIcon({
        url: "images/truck.png",
        scaledSize: new google.maps.Size(60, 70)
    });
}); 

google.maps.event.addListener(markeri,'click',function(){

    if (iore==0){
          //  popup.close();
    var myinitial = markeri.getPosition();
    var meh = "+"+myinitial.lat();
    //var nel = latC[latC.length-2];
    var kinitial = latC.indexOf(meh.toString());

    var  mylast = markerf.getPosition();
    var meh = "+"+mylast.lat();
    //      var nel = latC[0];
    var kend = latC.indexOf(meh.toString()); 

    DATEi = dateC[kinitial];
    TIMEi = timeC[kinitial];
    DATEe = dateC[kend];
    TIMEe = timeC[kend];
    aammddend = DATEe.split("-");
    hhmmssend = TIMEe.split(":");
    aammddinit = DATEi.split("-");
    hhmmssinit = TIMEi.split(":");
  //  sm = DATEi+" "+TIMEi;
    if(aammddend[1]-aammddinit[1]==0){
        var days = aammddend[2] - aammddinit[2];

    }else{
        var days = 31+(aammddend[2]-aammddinit[2]);
    }
    //var days = aammddend[2] - aammddinit[2];
    var hours = hhmmssend[0] - hhmmssinit[0];
    var min = hhmmssend[1] - hhmmssinit[1];
    var secs = hhmmssend[2] - hhmmssinit[2];
    if (secs<0){
        min = min - 1;
        secs = 60 + secs;
    }
    if (min<0){
        hours = hours - 1;
        min = 60 + min;
    }
    
    if (hours<0){
        days = days - 1;
        hours = 24 + hours;
    } 


    //hours = hours + days*24;

    popup = new google.maps.InfoWindow({
    content: '<div id="content">'+
      '<p><b>Trip info </b></p>'+
      '<p>This travel took '+days.toString()+' days with '+hours.toString()+' hours, '+min.toString()+' minutes with '+secs.toString()+' seconds. </p>'+
      '<p><b>This point: </b> '+DATEi.toString()+' at '+TIMEi.toString()+'. </p>'+
      '</div>'
    });
    popup.open(map, markeri);
    }

iore = 0;

    markerf.setIcon({
        url: "images/truckoff.png",
        scaledSize: new google.maps.Size(60*2/3, 78*2/3)
    });

    markeri.setIcon({
        url: "images/init.png",
        scaledSize: new google.maps.Size(60, 78)
    }); 
        
}); 


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////SELECCIONAR PUNTO EN POLY/////////////////////////////////////////////////////////////
    google.maps.event.addListener(flightPath, "click", function(event){
        var coord = event.latLng.toString();
        coord = coord.replace("(","");
        coord = coord.replace(")","");
        var ll = coord.split(",");
        var LAT = ll[0];
        var LON = ll[1]
 //       var myPoint = new google.maps.LatLng(ll[0],ll[1]);

    var k;
    var ert;
    var ern;
    var ertotal;
    var ermin = 10000;
    
    for(i=0;i<entiredata.length-2;i++){

        ert = Math.abs(Number(latC[i])-LAT);
        ern = Math.abs(Number(lonC[i])-LON);
        ertotal = ert + ern;

        if (ertotal<ermin){
            ermin = ertotal;
            DATE = dateC[i];
            TIME = timeC[i];
            k=i;
        }

    } 

    if (iore==0){ // kend siempre debe ser menor a kinitial
       var  mylast = markerf.getPosition();
       var meh = "+"+mylast.lat();
 //      var nel = latC[0];

       var kend = latC.indexOf(meh.toString());
    if (kend<k){

        myinitial = new google.maps.LatLng(latC[k], lonC[k]);
        kinitial = k;
  //      markeri.setTitle(kendM);
        markeri.setPosition(myinitial);

            //Black Polyline
    BlackCoordinates = [{lat:Number(latC[kend]),lng:Number(lonC[kend])}];
    for(i=kend;i<kinitial+1;i++){
        BlackCoordinates.push({lat:Number(latC[i]),lng:Number(lonC[i])});
    }
    flightBlack.setPath(BlackCoordinates);

    aammddinit = DATE.split("-");
    hhmmssinit = TIME.split(":");

}else{
    alert("ERROR: Endpoint cannot be before Start.");
}
            
}else{
    var myinitial = markeri.getPosition();
    var meh = "+"+myinitial.lat();
    //var nel = latC[latC.length-2];
    var kinitial = latC.indexOf(meh.toString());

    if (k<kinitial){


        mylast = new google.maps.LatLng(latC[k], lonC[k]);
        kend = k;
        markerf.setPosition(mylast);
        markerf.setLabel(kinitial);
        circle.setCenter(mylast);

                    //Black Polyline
    BlackCoordinates = [{lat:Number(latC[kend]),lng:Number(lonC[kend])}];
    for(i=kend;i<kinitial+1;i++){
        BlackCoordinates.push({lat:Number(latC[i]),lng:Number(lonC[i])});
    }
    flightBlack.setPath(BlackCoordinates);

    aammddend = DATE.split("-");
    hhmmssend = TIME.split(":");
    //    alert(kinitial);
    //alert(DATE + "." + TIME);
}else{
    alert("ERROR: Endpoint cannot be before Start.");
}

}
    popup.close();
    });

    flightPath.setMap(map);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
google.maps.event.addListener(map,'click',function(){

    popup.close();
    
});
 //AQUI ESTA EL LISTENER DEL BOTON 1
    goCenterUI.addEventListener('click', function() {
      // var currentCenter = control.getCenter();
      // map.setCenter(currentCenter);
      if(stateb1==0){
        stateb1=1;
        circle.setVisible(true);
        areaData();
      }else{
        stateb1=0;
        circle.setVisible(false);
        for (v=0;v<markersArray.length;v++){
            markersArray[v].setMap(null);
        } 
      }
    });


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
