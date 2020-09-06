
// Define parameters to be filled by the user 
var ys = [] // starts empty, to be populated with .push
var bestfit = [] // to be populated by tf.js

var loss = ['meanSquaredError'] // to be populated by the .push
var epochs = [] // to be populated by the .push 
var optimizer = [] // to be populated by the .push 
var activation = [] // to be populated by the .push 


// GET NETWORK PARAMETERS //
// document.getElementById("append").onclick = function(){
//     var loss_func = document.getElementById("loss_function").value; // grab the loss function
//     var epochs = document.getElementById("y").value; // grab the current value for y
//     var optimizer = document.getElementById("x").value; // grab the current value for x
//     var epochs = document.getElementById("y").value; // grab the current value for y

//     loss[0] = loss_func // overwrite the default loss function if the user specifies another 
// }

//Create the model using the parameters defined above 
const model = tf.sequential();
model.add(tf.layers.dense({units: 2056, inputShape: [1]})); // layer 1
model.add(tf.layers.dense({units: 2056, inputShape: [2056], activation:"sigmoid"})); // layer 2
model.add(tf.layers.dense({units: 1, inputShape: [2056]})); // output layer

const new_optimizer = tf.train.adam(0.0085);

model.compile({loss: loss[0], optimizer: new_optimizer}); // compile with params

document.getElementById("fit_model").onclick = function(){
    // function to train a model on the data currently stored in xs and ys 
    // so that the line of best fit can be plotted 
    //
    // define the x range to plot over 
    var x_range = Array.from(Array(ys.length).keys())

    // Train the model...then:
    model.fit(tf.tensor(x_range), tf.tensor(ys), {epochs:200}).then(() => {
        
        // calculate the best fit line 
        bestfit = model.predict(tf.tensor(x_range, [x_range.length, 1])).dataSync(); // create best-fit line from xs data
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
    });

}

// the append id is given to our submit button, this will be called
document.getElementById("append").onclick = function(){
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
