'use strict';

// Put your view code here (e.g., the graph renderering code)

// creates Bar Graph and replaces with the old one
 function drawBar(data) {
    var y, canv, ctx, scalarX, scalarY;
    var actvNum = 5;
    var maxVal = 100;  
    var stepSize = 10; 
    var colBegins = 50;
    var margin = 10;
    var header1 = "Time Spent"; 
    var header2 = "(minutes)";
    var SpentTime = new Array(6);
    var actArr = ["writing", "code", "eating", "dinner", "playing", "sport", 
                  "studying", "for exams", "attending", "lectures", "watching", "TV"]; 
        
    //Find maxVal and adjust stepSize
    for(var i=0; i < 6; i++){
        if(data[i]){
            if(maxVal < data[i].info.activityDurationInMinutes){
                var value = data[i].info.activityDurationInMinutes / 100;
                var ceiling = Math.ceil(value);
                if(ceiling - value >= 0.5){
                    maxVal = 100 * (ceiling - 0.5);
                } else{
                    maxVal = ceiling * 100;
                }
                console.log("Ceil: " + ceiling);
                stepSize = maxVal / 10;
            }
            SpentTime[i] = data[i].info.activityDurationInMinutes;
        }
    }

    var can_div = document.getElementById("canvas_div");
    canv = document.createElement('CANVAS');
    canv.width = 650;
    canv.height = 400;
    canv.id = "canvas_bar";
    ctx = canv.getContext("2d");
    ctx.fillStyle = "black";
    scalarY = (canv.height - colBegins - margin) / (maxVal);
    scalarX = (canv.width - 60) / (actvNum + 1);

    // background light blue lines
    ctx.strokeStyle = "rgba(128,128,255, 0.3)"; 

    ctx.beginPath();
    ctx.font = "13pt Arial"
    ctx.fillText(header1, -1, colBegins - margin - 25);
    ctx.fillText(header2, -1, colBegins - margin - 7);
    ctx.font = "12pt monospace"
    ctx.fillStyle = "#034AAE";
    var count =  0;
    for (var scale = maxVal; scale >= 0; scale -= stepSize) {
        y = colBegins + (scalarY * count * stepSize) ;
        ctx.fillText(scale, 2*margin, y + 5);
        ctx.moveTo(60, y)
        ctx.lineTo(canv.width, y)
        count++;
    }
    ctx.stroke();

    // label activity names
    ctx.font = "13pt Arial";
    ctx.fillStyle = "black";
    ctx.textBaseline = "bottom";
    for (var i = 0; i < actArr.length; i++) {
        y = canv.height - SpentTime[i] * scalarY;
        ctx.fillText(actArr[2*i], (i + 0.8) * scalarX, y - margin - 17);
        ctx.fillText(actArr[2*i + 1], (i + 0.8) * scalarX, y - margin);
    }

    // find a reasonable position for bars in the graph
    ctx.translate(0, canv.height - margin);
    ctx.scale(scalarX, -1 * scalarY);

    // draw colorful bars
    for (var i = 0; i < SpentTime.length; i++) {
        var colors = ["#6600FF", "#0092bf", "#FF9900", "#9D9992", "#872397", "#009935"];       
        ctx.fillStyle = colors[i];
        ctx.fillRect(i + 0.8, 0, 0.7, SpentTime[i]);
    }
   can_div.replaceChild(canv, can_div.childNodes[0]);
}


function drawScatter(data){
    var y, canv, ctx, scalarX, scalarY;
    var actvNum = 5; 
    var colBegins = 70;
    var margin = 10;
    var actArr = ["writing", "code", "eating", "dinner", "playing", "sport", 
                  "studying", "for exams", "attending", "lectures", "watching", "TV"]; 
        
    var energyBox = document.getElementById("energyBox");
    var stressBox = document.getElementById("stressBox");
    var happinessBox = document.getElementById("happyBox");

    var can_div = document.getElementById("canvas_div2");
    canv = document.createElement('CANVAS');
    canv.width = 590;
    canv.height = 405;
    canv.id = "canvas_bar2";
    scalarX = canv.width / (actvNum + 1);  // 98.3333333
    scalarY = (canv.height - colBegins) / 5; 

    ctx = canv.getContext("2d");
    ctx.font = "14px Arial";

    ctx.beginPath();
    ctx.moveTo(15,370);
    ctx.lineTo(590,370);
    ctx.fillStyle = "black";
    ctx.stroke();

    // label activity names
    ctx.font = "13pt Arial";
    ctx.fillStyle = "black";
    ctx.textBaseline = "bottom";
    for (var i = 0; i < actArr.length/2 ; i++) {
        y = canv.height;
        ctx.fillText(actArr[2*i], (i + 0.2) * scalarX, y - 17);
        ctx.fillText(actArr[2*i + 1], (i + 0.2) * scalarX, y);
    }

    ctx.strokeStyle = "rgba(128,128,255, 0.3)"; 

    // add scale number and scale lines to plot
    var count = 0;
    for (var scale = 5; scale > 0; scale-- ) {
        y = colBegins + (scalarY * count) ;
        ctx.fillText(scale, 1, y + 5);
        ctx.moveTo(15, y)
        ctx.lineTo(canv.width, y)
        count++;
    }
    ctx.stroke();

    ctx.font = "10pt Verdana";
    for(var j=0; j < data.length; j++){
        var coordX = 35;
        var coordY = 40;
        var i;
        switch(data[j].id){
            case "w_c":
                i = 0;
                break;
            case "e_d":
                i = 1;
                break;
            case "p_s": 
                i = 2;
                break;
            case "s_e": 
                i = 3;
                break;
            case "a_l": 
                i = 4;
                break;
            case "w_t":
                i = 5;
                break;
        }

        if(energyBox.checked){
            var value = data[j].info.activityDataDict[0];
            switch(parseInt(value)){
                case 5:
                ctx.fillText("o",coordX+i*101,coordY);
                break;
                case 4:
                ctx.fillText("o",coordX+i*101,coordY+67);
                break;
                case 3:
                ctx.fillText("o",coordX+i*101,coordY+2*67);
                break;
                case 2:
                ctx.fillText("o",coordX+i*101,coordY+3*67);
                break;
                case 1:
                ctx.fillText("o",coordX+i*101,coordY+4*67);
                break;
            }
        }
        coordY += 15;
        if(stressBox.checked){
            var value = data[j].info.activityDataDict[1];
            switch(parseInt(value)){
                case 5:
                ctx.fillText("x",coordX+i*101,coordY);
                break;
                case 4:
                ctx.fillText("x",coordX+i*101,coordY+67);
                break;
                case 3:
                ctx.fillText("x",coordX+i*101,coordY+2*67);
                break;
                case 2:
                ctx.fillText("x",coordX+i*101,coordY+3*67);
                break;
                case 1:
                ctx.fillText("x",coordX+i*101,coordY+4*67);
                break;
            }
        }
        coordY += 15;
        if(happyBox.checked){
            coordX--;
            var value = data[j].info.activityDataDict[2];
            switch(parseInt(value)){
                case 5:
                ctx.fillText("+",coordX+i*101,coordY);
                break;
                case 4:
                ctx.fillText("+",coordX+i*101,coordY+67);
                break;
                case 3:
                ctx.fillText("+",coordX+i*101,coordY+2*67);
                break;
                case 2:
                ctx.fillText("+",coordX+i*101,coordY+3*67);
                break;
                case 1:
                ctx.fillText("+",coordX+i*101,coordY+4*67);
                break;
            }
        }
    }

    can_div.replaceChild(canv, can_div.childNodes[1]);
}

/**
 *  GraphView  
 */
var GraphView = function(model) {
    // Obtains itself   
    var self = this;

    // Stores the model
    this.model = model;

    this.table_sum_radio = document.getElementById("tbl_sum");
    this.graph_sum_radio = document.getElementById("grph_sum");
    this.graph_sum_radio2 = document.getElementById("grph_sum_lvl");

    this.table_view_div = document.getElementById("table_view");
    this.graph_view_div = document.getElementById("graph_view");
    this.graph_view_div2 = document.getElementById("graph_view2");

    this.table_sum_radio.addEventListener('click', function(){
        model.selectGraph('Table');
    });

    this.graph_sum_radio.addEventListener('click', function(){
        model.selectGraph('BarGraph');
    });

    this.graph_sum_radio2.addEventListener('click', function(){
        model.selectGraph('Scatter');
    });

    this.model.addListener(function(eventType, eventTime, eventData) {
        if (eventType === GRAPH_SELECTED_EVENT)   {
            switch (eventData) {
                case 'Table':
                    self.table_view_div.className = "active";
                    self.graph_sum_radio.className = "";
                    self.graph_sum_radio2.className = "";
                    self.table_sum_radio.className = '';
                    self.graph_view_div.className = 'hidden';
                    self.graph_view_div2.className = 'hidden';
                    break;
                case 'BarGraph':
                    self.table_view_div.className = "hidden";
                    self.graph_sum_radio.className = "";
                    self.graph_sum_radio2.className = "";
                    self.table_sum_radio.className = '';
                    self.graph_view_div.className = 'active';
                    self.graph_view_div2.className = 'hidden';
                    break;
                case 'Scatter':
                    self.table_view_div.className = "hidden";
                    self.graph_sum_radio.className = "";
                    self.graph_sum_radio2.className = "";
                    self.table_sum_radio.className = '';
                    self.graph_view_div.className = 'hidden';
                    self.graph_view_div2.className = 'active';
                    break;
            }
        }
    });
}

/**
 *  TabView  
 */
var TabView = function(model) {
    // Obtains itself   
    var self = this;

    // Stores the model
    this.model = model;

    // Available tabs and divs
    this.nav_input_tab = document.getElementById('nav-input-tab');
    this.input_div = document.getElementById('input-div');

    this.nav_analysis_tab = document.getElementById('nav-analysis-tab');
    this.analysis_div = document.getElementById('analysis-div');

    // Binds tab view with model  
    this.nav_input_tab.addEventListener('click', function() {
        model.selectTab('InputTab');
    });

    this.nav_analysis_tab.addEventListener('click', function() {
        model.selectTab('AnalysisTab');
    });

    // Binds model change with view
    this.model.addListener(function(eventType, eventTime, eventData) {
        if (eventType === TAB_SELECTED_EVENT)   {
            switch (eventData) {
                case 'InputTab':
                    self.nav_input_tab.className = "active";
                    self.nav_analysis_tab.className = "";
                    self.input_div.className = '';
                    self.analysis_div.className = 'hidden';
                    break;
                case 'AnalysisTab':
                    self.nav_analysis_tab.className = "active";
                    self.nav_input_tab.className = "";
                    self.input_div.className = 'hidden';
                    self.analysis_div.className = '';
                    break;
            }
        }
    });
}
