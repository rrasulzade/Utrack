'use strict';

/*
Put any interaction code here
 */

function restore_fields(data){
	var energy = document.getElementById("energy_level");
	var stress = document.getElementById("stress_level");
	var happiness = document.getElementById("happiness_level");
	var time = document.getElementById("time_spent");
	var select = document.getElementById("activityID");

	switch(select.value){
            case "w_c":
            	if(data[0]){
					energy.value = data[0].info.activityDataDict[0];
					stress.value = data[0].info.activityDataDict[1];
					happiness.value = data[0].info.activityDataDict[2];
					time.value = data[0].info.activityDurationInMinutes;
	            } else {
	            	energy.value = "";
	            	stress.value = "";
	            	happiness.value = "";
	            	time.value = "";
	            }
	            break;
            case "e_d":
                if(data[1]) {
		            energy.value = data[1].info.activityDataDict[0];
					stress.value = data[1].info.activityDataDict[1];
					happiness.value = data[1].info.activityDataDict[2];
					time.value = data[1].info.activityDurationInMinutes;
				} else {
 					energy.value = "";
            		stress.value = "";
            		happiness.value = "";
            		time.value = "";
 				}
                break;
            case "p_s": 
            	if(data[2]) {
		            energy.value = data[2].info.activityDataDict[0];
					stress.value = data[2].info.activityDataDict[1];
					happiness.value = data[2].info.activityDataDict[2];
					time.value = data[2].info.activityDurationInMinutes;
				} else {
 					energy.value = "";
            		stress.value = "";
            		happiness.value = "";
            		time.value = "";
 				}
                break;
            case "s_e": 
                if(data[3]) {
		            energy.value = data[3].info.activityDataDict[0];
					stress.value = data[3].info.activityDataDict[1];
					happiness.value = data[3].info.activityDataDict[2];
					time.value = data[3].info.activityDurationInMinutes;
				} else {
 					energy.value = "";
            		stress.value = "";
            		happiness.value = "";
            		time.value = "";
 				}
                break;
            case "a_l": 
                if(data[4]) {
		            energy.value = data[4].info.activityDataDict[0];
					stress.value = data[4].info.activityDataDict[1];
					happiness.value = data[4].info.activityDataDict[2];
					time.value = data[4].info.activityDurationInMinutes;
				} else {
 					energy.value = "";
            		stress.value = "";
            		happiness.value = "";
            		time.value = "";
 				}
                break;
            case "w_t":
                if(data[5]) {
		            energy.value = data[5].info.activityDataDict[0];
					stress.value = data[5].info.activityDataDict[1];
					happiness.value = data[5].info.activityDataDict[2];
					time.value = data[5].info.activityDurationInMinutes;
				} else {
 					energy.value = "";
            		stress.value = "";
            		happiness.value = "";
            		time.value = "";
 				}
                break;
        }

}

//creates Table 
var addTable = function() {      
    var table = document.getElementById("activityTable");
    var actArr = ["writing code", "eating dinner", "playing sport", "studying for exams", "attending lectures", "watching TV"]; 
    var actID = ["w_c", "e_d","p_s","s_e", "a_l","w_t"];

   	var tableHead = document.createElement('THEAD');
    table.appendChild(tableHead);

    var tr = document.createElement('TR');
   	tableHead.appendChild(tr);

    var th = document.createElement('TH');
    th.appendChild(document.createTextNode("Activities you are tracking"));
    tr.appendChild(th);

    th = document.createElement('TH');
    th.appendChild(document.createTextNode("Time spent"));
    tr.appendChild(th);

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
      
    for (var i=0; i<6; i++){
    	tr = document.createElement('TR');
    	tableBody.appendChild(tr);

    	var td1 = document.createElement('TD');
    	td1.appendChild(document.createTextNode(actArr[i]));
        tr.appendChild(td1);

        var td2 = document.createElement('TD');
        td2.id = actID[i];
        td2.appendChild(document.createTextNode(""));
        tr.appendChild(td2);
      }
 
};


// defined as a global variable since it contains data entered
// which can be used as needed in global scope
// var actCollection;

window.addEventListener('load', function() {
  // You should wire up all of your event handling code here, as well as any
  // code that initiates calls to manipulate the DOM (as opposed to responding
  // to events)

  var actCollection = new ActivityCollectionModel();
  var actControl = new ActivityCollectionControl(actCollection);

  // Instantiate a TabView and a TabModel, then bind them together.
  var tabView = new TabView(new TabModel()); 

   // Instantiate a GraphView and a GraphModel, then bind them together.
  var grphView = new GraphView(new GraphModel());
  
 
  // create Table and BarGraph summaries
  addTable();
  drawBar(actCollection.recentDataPoints);
  drawScatter(actCollection.getActivityDataPoints());

  var energy = document.getElementById("energy_level");
  var stress = document.getElementById("stress_level");
  var happiness = document.getElementById("happiness_level");
  var time = document.getElementById("time_spent");

  var form_submit = document.getElementById("activity_form");
  form_submit.addEventListener('submit', LastModif);

  function LastModif(e){
  	e.preventDefault();

 	var actvType = document.getElementById("activityID");

 	if(isNaN(parseInt(energy.value))) {
 		alert("WARNING: Energy level should be a number between 1 and 5");
 		energy.focus();
        return;
 	}

 	if(isNaN(parseInt(stress.value))) {
 		alert("WARNING: Stress level should be a number between 1 and 5");
 		stress.focus();
        return;
 	}

 	if(isNaN(parseInt(happiness.value))) {
 		alert("WARNING: Happiness level should be a number between 1 and 5");
 		happiness.focus();
        return;
 	}

 	if(isNaN(parseInt(time.value))) {
 		alert("WARNING: Time level should be a number between 0 and 2000");
 		time.focus();
        return;
 	}
    
    var d = new Date();
    var x = "Last Data Entry was: " + d.toDateString() + ' ' + d.toLocaleTimeString();
 	document.getElementById("time").innerHTML = x;

 	var dataArr = [energy.value, stress.value, happiness.value];
 	var dataObj = new ActivityData(actvType.value, dataArr, parseInt(time.value));
    actCollection.addActivityDataPoint(dataObj);

   }
  
  	// restore data back if data was stored previously and "select" option is changed back to the same 
  	// activityType for some changes
 	var select = document.getElementById("activityID");
 	select.addEventListener('change', function(){
 		restore_fields(actCollection.recentDataPoints);
 	});

 	var form_plot = document.getElementById("chckbox");
    form_plot.addEventListener('submit', scatterPlot);

    function scatterPlot(e){
    	e.preventDefault();
    	drawScatter(actCollection.getActivityDataPoints());
    }

});

