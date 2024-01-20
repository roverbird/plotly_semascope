// This is Semascope, text visualization tool that uses Plotly JS to graphically
// represent relationship between words in a collection of texts.
// You can see a demonstration at https://textvisualization.app
// Plotly JS is available here https://cdn.plot.ly/plotly-latest.min.js
// You will need to load plotly JS for this script to work

// This JS uses text mining dataset in a tab separated format, prepared by corpus_utils
// Corpus_utils is a method of extracting keywords from a vast collection of texts
// Corpus_utils are available here: https://github.com/roverbird/corpus_utils

// Declare maxClusterValue at a global scope
let maxClusterValue;
let parsedData;

// Function to update the plot based on user-defined filters
function updatePlot() {
    // Get the data source URL from the div element with id="dataUrl"
    // This is the point where dataset is intup into this plotly JS app    
    let dataUrl = document.getElementById('dataUrl').textContent;
    // let dataUrl = document.getElementById('dataUrl').getAttribute('href');

    // Fetch data from the URL
    fetch(dataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Parse the tab-separated dataset from dataUrl above
            parsedData = data.split('\n').map(line => line.split('\t'));

            // Extract columns and apply filters
            const x_values = parsedData.map(row => parseFloat(row[1]));
            const y_values = parsedData.map(row => parseFloat(row[2]));
            //const sq_values = parsedData.map(row => parseInt(row[3]));
            const frequency_values = parsedData.map(row => parseInt(row[4]));
            const z_values = parsedData.map(row => parseInt(row[5]));
            const cluster_values = parsedData.map(row => parseInt(row[7]));


                    // Get filter values from the form
                    const kFilter = parseFloat(document.getElementById('k').value);
                    const pFilter = parseFloat(document.getElementById('p').value);
                    const dfFilter = parseInt(document.getElementById('DF').value);
                    const frFilter = parseInt(document.getElementById('fr').value);
                    const clusterFilter = parseInt(document.getElementById('cluster').value);

                    // Apply filters
                    const filters = parsedData.filter(row => row[1] <= kFilter && row[2] <= pFilter && row[4] >= frFilter && row[5] <= dfFilter && row[7] >= clusterFilter);

                    // Extract filtered columns and labels
                    const filtered_x_values = filters.map(row => parseFloat(row[1]));
                    const filtered_y_values = filters.map(row => parseFloat(row[2]));
                    //const filtered_sq_values = filters.map(row => parseInt(row[3]));
                    const filtered_frequency_values = filters.map(row => parseInt(row[4]));
                    const filtered_z_values = filters.map(row => parseInt(row[5]));
                    const filtered_cluster_values = filters.map(row => parseInt(row[7]));

                    //const filtered_sq_values = filters.map(row => parseInt(row[3]));
                    // Calculate maxClusterValue
                    maxClusterValue = Math.max(...filtered_cluster_values);
                    maxfrValue = Math.max(...filtered_frequency_values);
                    maxDFValue = Math.max(...filtered_z_values);
                    maxpValue = Math.max(...filtered_y_values);
                    maxkValue = Math.max(...filtered_x_values);
                    reduceDFvalue = maxDFValue * 0.9; // 10 percent less than maxDFValue
                    //increaseFrvalue = frFilter * 1.5; // 10 percent less than maxDFValue
                    reducepvalue = maxpValue * 0.9;
                    reducekvalue = maxkValue * 0.9;

                    // Get text labels
                    const labels = filters.map(row => row[0]); // Assuming column A contains labels

                    function normalizeArray(arr, targetMin, targetMax) {
                        const minValue = Math.min(...arr);
                        const maxValue = Math.max(...arr);
                        
                        return arr.map(value => targetMin + (targetMax - targetMin) * (value - minValue) / (maxValue - minValue));
                    }

                    const normalized_filtered_frequency_values = normalizeArray(filtered_frequency_values, 13, 70);

                    const scatterPlotData = [{
                        x: filtered_x_values,
                        y: filtered_y_values,
                        z: filtered_z_values,
                        mode: 'markers',
                        marker: {
                            size: normalized_filtered_frequency_values, // Use the frequency values for size
                            sizemode: 'diameter', // Set to 'diameter' to specify marker size in pixels
                            sizeref: 1.3, // Adjust as needed to control the size of markers
                            color: filtered_cluster_values, // Use the cluster values for color
                            colorscale: 'Jet', // Choose a colorscale
                            cmin: 1, // Set the minimum value for the colorscale
                            cmax: 10, // Set the maximum value for the colorscale
                            colorbar: {
                                title: 'Cluster', // Label for the colorbar
                                titlefont: { size: 15 },
                                titleside: 'top',
                                //x: .09, 
                                len: 0.3,
                                tickvals: Array.from(new Set(filtered_cluster_values)), // Unique cluster values for tick marks
                                ticktext: Array.from(new Set(filtered_cluster_values)), // Labels for the tick marks
                            },
                        },
                        type: 'scatter3d',
                        text: labels, // Set text labels for each point
                        hoverinfo: 'text', // Show text information always
                        hoverlabel: {
                           font: {
                               size: 30,
                           },
                        }


    //hoverinfo labels, // Include x, y, z, and color information in hover template
   // hovertemplate:
     //   '<b>%{text}</b>' +
     //   '<br>X: %{x:.2f}' +
     //   '<br>Y: %{y:.2f}' +
     //   '<br>Z: %{z:.2f}', // Add additional information as needed
                        //textposition: 'bottom center',
                    }];

                    // Layout settings with increased width and height
                    const layout = {
                        width: 1010,  // Adjust the width in pixels
                        height: 1300,  // Adjust the height in pixels
                        margin: {
                             l: 0,
                             r: 0,
                             b: 0,
                             t: 0,
                             pad: 0
                             },
                       paper_bgcolor: '#FAFAFA',
                       plot_bgcolor: '#FAFAFA',
                        scene: {
                            camera: {
                                eye: {
                                    x: 2,
                                    y: 0,
                                    z: 1
                                }
                            },
                            xaxis: {
                                title: 'k', // Label for the x-axis
                                titlefont: { size: 20 }
                            },
                            yaxis: {
                                title: 'p', // Label for the y-axis
                                titlefont: { size: 20 }
                            },
                            zaxis: {
                                title: 'Doc Frequency (DF)', // Label for the y-axis
                                titlefont: { size: 20 }
                            }
                          
                        }
                    };

            // Create 3D scatter plot
            Plotly.newPlot('plot', scatterPlotData, layout);
        })
        .catch(error => console.error('Error fetching data:', error));
}

        function removeFilters() {
            // Reset filter values to their defaults
            document.getElementById('k').value = '10';
            document.getElementById('p').value = '1';
            document.getElementById('DF').value = '1000';
            document.getElementById('fr').value = '1';
            document.getElementById('cluster').value = '0';

            updatePlot();
        }

        function heros() {
            document.getElementById('k').value = '0.25';
            document.getElementById('p').value = '0.25';
           // document.getElementById('DF').value = '10000';
            document.getElementById('cluster').value = '1';
            document.getElementById('fr').value = '1';
            // document.getElementById('p').value = reducepvalue;
            // document.getElementById('k').value = reducekvalue;
            updatePlot();
        }

        function clue() {
            document.getElementById('k').value = '1';
            document.getElementById('p').value = '0.5';
           // document.getElementById('DF').value = '10000';
           document.getElementById('cluster').value = '5';
           document.getElementById('fr').value = '1';
            // document.getElementById('p').value = reducepvalue;
            // document.getElementById('k').value = reducekvalue;
            updatePlot();
        }

        // Function to handle button click Show Background
       function setMaxClusterValue() {
            document.getElementById('k').value = '100';
            document.getElementById('p').value = '1';
            document.getElementById('fr').value = '1';
            //document.getElementById('DF').value = '10000';
            document.getElementById('cluster').value = maxClusterValue;

        updatePlot();
       }

        // Function to handle button click on reduce DF
       function setreduceDFvalue() {
            document.getElementById('DF').value = reduceDFvalue;

        updatePlot();
       }

        // Function to handle button click on increase Fr
       // function setincreaseFrvalue() {
          //  document.getElementById('fr').value = increaseFrvalue;

       // updatePlot();
      // }

  // Initially load the plot
    updatePlot();

// Function to update the plot based on the search word
function searchAndUpdatePlot() {
    // Get the search word from the input field
    const searchWord = document.getElementById('searchWord').value.trim().toLowerCase();

    // Apply the search filter
    const searchFilters = parsedData.filter(row => row[0].toLowerCase().includes(searchWord));

    // Extract filtered columns and labels
    const filtered_x_values = searchFilters.map(row => parseFloat(row[1]));
    const filtered_y_values = searchFilters.map(row => parseFloat(row[2]));
    const filtered_z_values = searchFilters.map(row => parseInt(row[5]));
    const filtered_cluster_values = searchFilters.map(row => parseInt(row[7]));
    const filtered_frequency_values = searchFilters.map(row => parseInt(row[4]));
    const labels = searchFilters.map(row => row[0]);

// Update the scatter plot data
const scatterPlotData = [{
    x: filtered_x_values,
    y: filtered_y_values,
    z: filtered_z_values,
    mode: 'markers',
    marker: {
        size: 10,
        sizemode: 'diameter',
        symbol: "circle",
        sizeref: 1,
        color: filtered_cluster_values,
        colorscale: 'Jet',
        cmin: 1,
        cmax: 10,
        colorbar: {
            title: 'Cluster',
            titleside: 'top',
            x: .09, len: 0.3,
            tickvals: Array.from(new Set(filtered_cluster_values)),
            ticktext: Array.from(new Set(filtered_cluster_values)),
        },
    },
    type: 'scatter3d',
    text: labels,
    hoverlabel: {
         font: {
               size: 30,
         },
   },
    textposition: 'bottom center',
}];

                    // Layout settings for search results
                    const layout = {
                        width: 1010,  // Adjust the width in pixels
                        height: 1300,  // Adjust the height in pixels
                        margin: {
                             l: 0,
                             r: 0,
                             b: 0,
                             t: 0,
                             pad: 0
                             },
                       paper_bgcolor: '#FAFAFA',
                       plot_bgcolor: '#FAFAFA',
                        scene: {
                            camera: {
                                eye: {
                                    x: 2,
                                    y: 0.88,
                                    z: 0.9
                                }
                            },
                            xaxis: {
                                title: 'k' // Label for the x-axis
                            },
                            yaxis: {
                                title: 'p' // Label for the y-axis
                            },
                            zaxis: {
                                title: 'Doc Frequency (DF)' // Label for the y-axis
                            },
                        }
                    };

    // Update the 3D scatter plot
    Plotly.newPlot('plot', scatterPlotData, layout);
}
