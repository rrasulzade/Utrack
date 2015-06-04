'use strict';

var ACTIVITY_DATA_ADDED_EVENT = 'ACTIVITY_DATA_ADDED_EVENT';
var ACTIVITY_DATA_REMOVED_EVENT = 'ACTIVITY_DATA_REMOVED_EVENT';

var GRAPH_SELECTED_EVENT = 'GRAPH_SELECTED_EVENT';

var TAB_SELECTED_EVENT = 'TAB_SELECTED_EVENT';

var initialized = false;

/**
 * Represents a single activity data point.
 * @param activityType The type of activity. A string
 * @param healthMetricsDict A dictionary of different health metrics. The key is the
 * health data type (e.g., energy level, stress level, etc.), while the value is
 * the value the user gave to that activity.
 * @param activityDurationInMinutes A number
 * @constructor
 */
var ActivityData = function(activityType, healthMetricsDict, activityDurationInMinutes) {
    this.activityType = activityType;
    this.activityDataDict = healthMetricsDict;
    this.activityDurationInMinutes = activityDurationInMinutes
};

/**
 * An object which tracks all of the data
 * @constructor
 */
var ActivityCollectionModel = function() {
    // Maintains a list of listeners.
    this.recentDataPoints = new Array(6);
    this.allDataPoints = [];
    this.listeners = [];
    this.notify = function(eventType, eventData) {
        if (eventData !== this.currentGraph) {
            _.each(this.listeners, function(listener) {
               listener(eventType, Date.now(), eventData); 
            });
        }
    }
    
};

// _ is the Underscore library
// This extends the JavaScript prototype with additional methods
// This is a common idiom for defining JavaScript classes
_.extend(ActivityCollectionModel.prototype, {

    /**
     * Add a listener to the listeners we track
     * @param listener The listener is a callback function with the following signature:
     * (eventType, eventTime, activityData) where eventType is a string indicating
     * the event type (one of ACTIVITY_DATA_ADDED_EVENT or ACTIVITY_DATA_REMOVED_EVENT), and
     * activityData the ActivityData added or removed.
     */
    addListener: function(listener) {
        // TODO
         this.listeners.push(listener);
    },

    /**
     * Should remove the given listener.
     * @param listener
     */
    removeListener: function(listener) {
        // TODO
        var index = this.listeners.indexOf(listener);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    },

    /**
     * Should add the given data point, and alert listeners that a new data point has
     * been added.
     * @param activityDataPoint
     */
    addActivityDataPoint: function(activityDataPoint) {
        // TODO
        console.log('add data point');
        var actvData = {
            id: activityDataPoint.activityType,
            info: activityDataPoint
        };
        this.allDataPoints.push(actvData);
        if(document.getElementById(actvData.id)){
           var table_data = document.getElementById(actvData.id).value;
        }
        switch(actvData.id){
          case "w_c":
          this.recentDataPoints[0] = actvData;
          if(!isNaN(table_data)){
            this.recentDataPoints[0].info.activityDurationInMinutes += table_data;
          }
          break;
          case "e_d":
          this.recentDataPoints[1] = actvData;
          if(!isNaN(table_data)){
            this.recentDataPoints[1].info.activityDurationInMinutes += table_data;
          }
          break;
          case "p_s": 
          this.recentDataPoints[2] = actvData;
          if(!isNaN(table_data)){
            this.recentDataPoints[2].info.activityDurationInMinutes += table_data;
          }
          break;
          case "s_e": 
          this.recentDataPoints[3] = actvData;
          if(!isNaN(table_data)){
            this.recentDataPoints[3].info.activityDurationInMinutes += table_data;
          }
          break;
          case "a_l": 
          this.recentDataPoints[4] = actvData;
          if(!isNaN(table_data)){
            this.recentDataPoints[4].info.activityDurationInMinutes += table_data;
          }
          break;
          case "w_t":
          this.recentDataPoints[5] = actvData;
          if(!isNaN(table_data)){
            this.recentDataPoints[5].info.activityDurationInMinutes += table_data;
          }
          break;
        }
        var event = {
            type: ACTIVITY_DATA_ADDED_EVENT,
            data: {
                item: actvData
            }
        };

        this.notify(event.type, event);    
         
    },

    /**
     * Should remove the given data point (if it exists), and alert listeners that
     * it was removed. It should NOT alert listeners if that data point did not
     * exist in the data store
     * @param activityDataPoint
     */
    removeActivityDataPoint: function(id) {
        // TODO
        var event = {
            type: ACTIVITY_DATA_REMOVED_EVENT,
            data: {
              id: id
          }
        };
        this.notify(event.type, event);
    },

    /**
     * Should return an array of all activity data points
     */
    getActivityDataPoints: function() {
        // TODO
        return this.allDataPoints;
    }

});


/**
 * 
 * @constructor
 */
var ActivityCollectionControl = function(model){
    this.model = model;
    this.model.addListener(function(eventType, eventTime, eventData) {
      if (eventType === ACTIVITY_DATA_ADDED_EVENT)   {
        var table_data = document.getElementById(eventData.data.item.info.activityType);
        table_data.innerHTML =  parseInt(eventData.data.item.info.activityDurationInMinutes);
        table_data.value = eventData.data.item.info.activityDurationInMinutes;
        drawBar(model.recentDataPoints);
        drawScatter(model.allDataPoints);
      }
    });
};


/**
 * The GraphModel tracks what the currently selected graph is.
 * You should structure your architecture so that when the user chooses
 * a new graph, the event handling code for choosing that graph merely
 * sets the new graph here, in the GraphModel. The graph handling code
 * should then update to show the selected graph, along with any components
 * necessary to configure that graph.
 * @constructor
 */
var GraphModel = function() {
    // Maintains a list of listeners.
    this.listeners = [];
    this.availableGraphName = [
        'Table',
        'BarGraph',
        'Scatter'
    ];
    this.currentGraph = this.availableGraphName[0];
    this.notify = function(eventType, eventData) {
        if (eventData !== this.currentGraph) {
            _.each(this.listeners, function(listener) {
               listener(eventType, Date.now(), eventData); 
            });
        }
    }
};

_.extend(GraphModel.prototype, {

    /**
     * Add a listener to the listeners we track
     * @param listener The listener is a callback function with the following signature:
     * (eventType, eventTime, eventData) where eventType is a string indicating
     * the event type (specifically, GRAPH_SELECTED_EVENT),
     * and eventData indicates the name of the new graph.
     */
    addListener: function(listener) {
        // TODO
        this.listeners.push(listener);
    },

    /**
     * Should remove the given listener.
     * @param listener
     */
    removeListener: function(listener) {
        // TODO
        var index = this.listeners.indexOf(listener);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    },

    /**
     * Returns a list of graphs (strings) that can be selected by the user
     */
    getAvailableGraphNames: function() {
        // TODO
        return this.availableGraphName;
    },

    /**
     * Should return the name of the currently selected graph. There should
     * *always* be one graph that is currently available.
     */
    getNameOfCurrentlySelectedGraph: function() {
        // TODO
        return this.currentGraph;
    },

    /**
     * Changes the currently selected graph to the graph name given. Should
     * broadcast an event to all listeners that the graph changed.
     * @param graphName
     */
    selectGraph: function(graphName) {
        // TODO
        this.notify(GRAPH_SELECTED_EVENT, graphName);
        this.currentGraph = graphName;
    }

});

/**
 * The TabModel maintains the current selected tab.
 */
var TabModel = function() {
    this.listeners = [];
    this.availableTabName = [
        'InputTab',
        'AnalysisTab'
    ];
    this.currentTab = this.availableTabName[0];
    this.notify = function(eventType, eventData) {
        if (eventData !== this.currentTab) {
            _.each(this.listeners, function(listener) {
               listener(eventType, Date.now(), eventData); 
            });
        }
    }
};

_.extend(TabModel.prototype, {
    addListener: function(listener) {
        this.listeners.push(listener);
    }, 
    removeListener: function(listener) {
        var index = this.listeners.indexOf(listener);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    },
    getNameOfCurrentlySelectedTab: function() {
        return this.currentTab;
    },
    selectTab: function(tabName) {
        this.notify(TAB_SELECTED_EVENT, tabName);
        this.currentTab = tabName;
    }
});




/**
 * Will generate a number of random data points and add them to the model provided.
 * If numDataPointsToGenerate is not provided, will generate and add 100 data points.
 * @param activityModel The model to add data to
 * @param numDataPointsToGenerate The number of points to generate.
 *
 * Example:
 *
 * generateFakeData(new ActivityCollectionModel(), 10);
 */
function generateFakeData(activityModel, numDataPointsToGenerate) {
    var fakeActivities = [];
    _.times(
        5,
        function() {
            fakeActivities.push("Activity " + (fakeActivities.length + 1));
        }
    );
    numDataPointsToGenerate = (!_.isNumber(numDataPointsToGenerate) || numDataPointsToGenerate < 0) ? 100 : numDataPointsToGenerate;
    _.times(
        numDataPointsToGenerate,
        function() {
            var activityDataPoint = new ActivityData(
                fakeActivities[_.random(fakeActivities.length - 1)], {
                    energyLevel: _.random(10),
                    stressLevel: _.random(10),
                    happinessLevel: _.random(10)
                },
                _.random(60)
            );
            activityModel.addActivityDataPoint(activityDataPoint);
        }
    );
}