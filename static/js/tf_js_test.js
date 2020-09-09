
// Define parameters to be filled by the user 
var ys = [78, 23, 54, 50] // starts with a few samples which can always be changed later in the GUI
// var bestfit = [] // to be populated by tf.js

var LOSS = {'val': 'meanSquaredError'}; // to be populated by the .push
var EPOCHS = {'val': 150}; // to be populated by the .push 
var OPTIMIZER = {'val': tf.train.adam(0.0085)}; // to be populated by the .push 
var ACTIVATION = {'val': 'relu'}; // to be populated by the .push 

// define the x range to plot over 
var x_range = Array.from(Array(ys.length).keys())

// plot the current data available in xs and ys
var ctx = document.getElementById("myChart").getContext('2d'); // begin chart
// Chart data and settings:

var myChart = new Chart(ctx, {
    type: 'line',
    options: {scales:{yAxes: [{ticks: {beginAtZero: true}}]}},
    data: {
        labels: x_range,
        datasets: [
        {
            label: 'Sample Data',
            data: ys,
            borderWidth: 2,
            borderColor: '#FF9800',
            backgroundColor: 'rgba(1,1,1,0)'
        },]
    },
});

// --- READ FORM TO GET/UPDATE NETWORK PARAMETERS --- 
document.getElementById("network_params").onclick = function(){
    // This function is designed to update the default network parameters whenever
    // someone enters new parameters into the parameter section and clicks 'Update Parameters'

    // The default network parameters are defined at the top of this script. Those are the starting
    // parameters, but if someone enters new parameters and this function gets called, then 
    // it will replace the first element in each parameter array defined above

    // define all of the new parameters 
    var loss = document.getElementById("loss").value; // grab the current value for loss
    var epochs = document.getElementById("EpochRange").value; // grab the current value for epochs
    var activation = document.getElementById("activation").value; // grab the current value for the activation
    var optimizer = document.getElementById("optimizer").value; // grab the current value for the optimizer

    // update the value in each of the network parameter dicts
    LOSS["val"] = loss;
    EPOCHS["val"] = epochs;
    ACTIVATION["val"] = activation;
    // update optimizer 
    if (optimizer == 'adam'){ 
        OPTIMIZER["val"] = tf.train.adam(0.0085)
    } else {
        OPTIMIZER["val"] = optimizer
    }
}

document.getElementById("fit_model").onclick = function(){
    // function to train a model on the data currently stored in xs and ys 
    // so that the line of best fit can be plotted 

    //Create the model using the parameters defined at the top of the script
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 2056, inputShape: [1]})); // layer 1
    model.add(tf.layers.dense({units: 2056, inputShape: [2056], activation:ACTIVATION["val"]})); // layer 2
    model.add(tf.layers.dense({units: 1, inputShape: [2056]})); // output layer

    // compile model with defined parameters
    model.compile({loss: LOSS["val"], optimizer: OPTIMIZER["val"]}); // compile with params

    //
    // define the x range to plot over 
    var x_range = Array.from(Array(ys.length).keys())  // <-- MAYBE MOVE THIS OUTSIDE THE FUNCTION? 

    // Train the model...then:
    model.fit(tf.tensor(x_range), tf.tensor(ys), {epochs:EPOCHS["val"]}).then(() => {
        
        // calculate the best fit line 
        bestfit = model.predict(tf.tensor(x_range, [x_range.length, 1])).dataSync(); // create best-fit line from xs data

        // if the chart object already exists, then destroy it 
        if (typeof ctx != "undefined") {
            ctx.destroy();
         }

        var ctx = document.getElementById("myChart").getContext('2d'); // begin chart
        // Chart data and settings:
        var myChart = new Chart(ctx, {
            type: 'line',
            options: {scales:{yAxes: [{ticks: {beginAtZero: true}}]}},
            data: {
                labels: x_range,
                datasets: [
                {
                    label: 'Best Fit line',
                    data: bestfit,
                    borderDash: [10,5],
                    borderWidth: 2.5,
                    borderColor: '#2196F3',
                    backgroundColor: 'rgba(1,1,1,0)'
                },{
                    label: 'Sample Data',
                    data: ys,
                    borderWidth: 2,
                    borderColor: '#FF9800',
                    backgroundColor: 'rgba(1,1,1,0)'
                },]
            },
        });
        myChart.update();
    });

}

// the append id is given to our submit button, this will be called
document.getElementById("add_random").onclick = function(){
    // Function to add a random number between 0 and 100 inclusive to the list 'ys' and plot the results 
    //
    var random_y = Math.floor(Math.random() * 100);  // add random number to y between 0 and 100
    ys.push(random_y)

    // define the x range to plot over 
    var x_range = Array.from(Array(ys.length).keys())

    // plot the current data available in xs and ys
    var ctx = document.getElementById("myChart").getContext('2d'); // begin chart
    
    // Chart data and settings:
    var myChart = new Chart(ctx, {
        type: 'line',
        options: {scales:{yAxes: [{ticks: {beginAtZero: true}}]}},
        data: {
            labels: x_range,
            datasets: [
            {
                label: 'Sample Data',
                data: ys,
                borderWidth: 2,
                borderColor: '#FF9800',
                backgroundColor: 'rgba(1,1,1,0)'
            },]
        },
    });
}


// the append id is given to our submit button, this will be called
document.getElementById("add_custom").onclick = function(){
    // Function to add add the current y-value from the form to the list 'ys' and plot the results 
    //
    var y = document.getElementById("y").value; // grab the current value for y
    ys.push(y) // append that value to the ys

    // define the x range to plot over 
    var x_range = Array.from(Array(ys.length).keys())

    // plot the current data available in xs and ys
    var ctx = document.getElementById("myChart").getContext('2d'); // begin chart
    // Chart data and settings:
    
    var myChart = new Chart(ctx, {
        type: 'line',
        options: {scales:{yAxes: [{ticks: {beginAtZero: true}}]}},
        data: {
            labels: x_range,
            datasets: [
            {
                label: 'Sample Data',
                data: ys,
                borderWidth: 2,
                borderColor: '#FF9800',
                backgroundColor: 'rgba(1,1,1,0)'
            },]
        },
    });

}


document.getElementById("remove_data").onclick = function(){
    // Function to remove the last value from 'ys' and plot the result 
    //
    // pop off the last element of the array 'ys' 
    let popped = ys.pop();

    // define the x range to plot over 
    var x_range = Array.from(Array(ys.length).keys())

    // plot the current data available in xs and ys
    var ctx = document.getElementById("myChart").getContext('2d'); // begin chart
    // Chart data and settings:
    
    var myChart = new Chart(ctx, {
        type: 'line',
        options: {scales:{yAxes: [{ticks: {beginAtZero: true}}]}},
        data: {
            labels: x_range,
            datasets: [
            {
                label: 'Sample Data',
                data: ys,
                borderWidth: 2,
                borderColor: '#FF9800',
                backgroundColor: 'rgba(1,1,1,0)'
            },]
        },
    });

}

document.getElementById("clear_dataset").onclick = function(){
    // Function to clear the array 'ys' and plot the result  
    //
    // pop off the last element of the array 'ys' 
    ys.length = 0

    // define the x range to plot over 
    var x_range = Array.from(Array(ys.length).keys())

    // plot the current data available in xs and ys
    var ctx = document.getElementById("myChart").getContext('2d'); // begin chart
    // Chart data and settings:
    
    var myChart = new Chart(ctx, {
        type: 'line',
        options: {scales:{yAxes: [{ticks: {beginAtZero: true}}]}},
        data: {
            labels: x_range,
            datasets: [
            {
                label: 'Sample Data',
                data: ys,
                borderWidth: 2,
                borderColor: '#FF9800',
                backgroundColor: 'rgba(1,1,1,0)'
            },]
        },
    });

}