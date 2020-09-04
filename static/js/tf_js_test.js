
// Define parameters to be filled by the user 

var xs = [] // starts empty, to be populated with .push
var ys = [] // starts empty, to be populated with .push
var bestfit = [] // to be populated by tf.js

var loss = ['meanSquaredError'] // to be populated by the .push
var epochs = [] // to be populated by the .push 
var optimizer = [] // to be populated by the .push 
var activation = [] // to be populated by the .push 


// GET NETWORK PARAMETERS //
document.getElementById("append").onclick = function(){
    var loss_func = document.getElementById("loss_function").value; // grab the loss function
    var epochs = document.getElementById("y").value; // grab the current value for y
    var optimizer = document.getElementById("x").value; // grab the current value for x
    var epochs = document.getElementById("y").value; // grab the current value for y

    loss[0] = loss_func // overwrite the default loss function if the user specifies another 

}

//Create the model using the parameters defined above 
const model = tf.sequential();
model.add(tf.layers.dense({units: 128, inputShape: [1]})); // layer 1
model.add(tf.layers.dense({units: 128, inputShape: [128]})); // layer 2
model.add(tf.layers.dense({units: 1, inputShape: [128]})); // output layer
model.compile({loss: loss[0], optimizer: 'adam'}); // compile with params

document.getElementById('x').value = 1; // create a starting value for our x

// the append id is given to our submit button, this will be called
document.getElementById("append").onclick = function(){
    var x = document.getElementById("x").value; // grab the current value for x
    var y = document.getElementById("y").value; // grab the current value for y
    xs.push(x) // append that value to the xs
    ys.push(y) // append that value to the ys
    document.getElementById('x').value = parseInt(x)+1; // add 1 to the x automatically

    // Train the model...then:
    model.fit(tf.tensor(xs), tf.tensor(ys), {epochs:150}).then(() => {
        bestfit = model.predict(tf.tensor(xs, [xs.length, 1])).dataSync(); // create best-fit line from xs data
        var ctx = document.getElementById("myChart").getContext('2d'); // begin chart
        // Chart data and settings:
        var myChart = new Chart(ctx, {
            type: 'line',
            options: {scales:{yAxes: [{ticks: {beginAtZero: true}}]}},
            data: {
                labels: xs,
                datasets: [
                {
                    label: 'Original Data',
                    data: ys,
                    borderWidth: 1,
                },{
                    label: 'Best Fit line',
                    data: bestfit,
                    borderWidth: 1,
                    borderColor: '#FF0000',
                    backgroundColor: 'rgba(1,1,1,0)'
                },]
            },
        });
      });
}
