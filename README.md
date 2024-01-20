# Semascope 👁️ - Text Visualization Tool

Semascope 👁️ is a JavaScript-based text visualization tool that utilizes Plotly JS to graphically represent relationships between words in a collection of texts. This tool provides an interactive 3D scatter plot where each point represents a word, and the axes correspond to different properties of the words.

## Demo
Explore the tool in action at [textvisualization.app](https://textvisualization.app).

## Dependencies
- [Plotly JS](https://plotly.com/javascript/): Ensure you load Plotly JS for the script to work correctly.
- [Corpus_utils](https://github.com/roverbird/corpus_utils): This tool relies on a text mining dataset in tab-separated format prepared by corpus_utils. Make sure to check out corpus_utils for a new statistical method of extracting keywords from a vast collection of texts.

## Usage
1. Clone the repository.
2. Load Plotly JS by including the [Plotly JS library](https://cdn.plot.ly/plotly-latest.min.js).
3. Ensure you have the necessary data in tab-separated format, prepared using [Corpus_utils](https://github.com/roverbird/corpus_utils).
4. Open the `index.html` file in a web browser.

## Global Variables
- `maxClusterValue`: A global variable to store the maximum cluster value.
- `parsedData`: A variable to hold the parsed tab-separated dataset.

## Functions
- `updatePlot()`: Fetches data from a specified URL, applies user-defined filters, and updates the 3D scatter plot.
- `removeFilters()`: Resets filter values to their defaults and updates the plot.
- `heros()`, `clue()`: Sets predefined filter values for specific scenarios and updates the plot.
- `setMaxClusterValue()`: Sets filter values to display the maximum cluster value and updates the plot.
- `setreduceDFvalue()`: Sets filter values to reduce the document frequency and updates the plot.
- `searchAndUpdatePlot()`: Updates the plot based on a user-inputted search word.

## Filter Controls
- The user can filter data based on parameters such as 'k', 'p', 'DF', 'fr', and 'cluster'.
- Buttons like 'heros()', 'clue()', 'setMaxClusterValue()', 'setreduceDFvalue()' provide convenient ways to apply specific filters.

## Plot Settings
- The plot is a 3D scatter plot with adjustable width and height.
- Various axes represent different properties like 'k', 'p', and 'Doc Frequency (DF)'.
- Color and size of markers represent the cluster and frequency values, respectively.
- The plot allows interactive exploration with hover labels displaying relevant information.

## Customization
Feel free to customize the tool according to your dataset and requirements by modifying the filter controls, plot settings, and layout parameters in the JavaScript code.

## Dataset
For the JS viewer to work, you need to input a dataset, which is a tab separated text file in such format, prepared with [Corpus_utils](https://github.com/roverbird/corpus_utils).

The header parameters are explained on [textvisualization.app](https://textvisualization.app). Here is the formatted table:

| word     | k                   | p                   | sqrt_kp             | sum  | DF  | DFtoWF               | cluster | pq                   |
|----------|---------------------|---------------------|---------------------|------|-----|----------------------|---------|----------------------|
| the      | 1.28857792385278    | 0.00566397049317553 | 1.28859037184145    | 4115 | 18  | 0.00437424058323208  | 2       | 0.00569623379330303  |
| emperor  | 0.0276737248260626  | 0.0123267537320039  | 0.0302949484785517  | 40   | 2   | 0.05                 | 7       | 0.0124805990023336   |
| new      | 0.27368851562244    | 0.0948757865655114  | 0.289666736889203   | 47   | 8   | 0.170212765957447    | 5       | 0.104820736377724    |
| clothes  | 0.608283594968966   | 0.274077127474438   | 0.667178539607658   | 29   | 10  | 0.344827586206897    | 4       | 0.377556814708007    |
| many     | 0.993549684902053   | 0.226712673376116   | 1.01908763736899    | 61   | 14  | 0.229508196721311    | 3       | 0.293180381431992    |
| years    | 0.333012627916599   | 0.222055107299219   | 0.400257268553098   | 21   | 7   | 0.333333333333333    | 4       | 0.285438093858181    |
| ago      | 0.572215818866319   | 0.631898852497187   | 0.852482904900804   | 6    | 4   | 0.666666666666667    | 10      | 1.71664461462283     |
...

Explanation of the columns:
- `word`: The word in the dataset.
- `k`: Negative Binomial k-value related to the word.
- `p`: Negative Binomial p-value related to the word.
- `sqrt_kp`: Square root of the product of `k` and `p`.
- `sum`: Sum of values related to the word.
- `DF`: Document Frequency.
- `DFtoWF`: Document Frequency to Word Frequency ratio.
- `cluster`: Cluster value.
- `pq`: Product of `p` and `q`.

## index.html Overview

The `index.html` file serves as the entry point for the [Semascope 👁️ Online Text Visualization App](https://textvisualization.app/). This HTML file integrates the necessary styles, scripts, and components to create an interactive and visually engaging environment for exploring textual data.

Key Features:

- **Navigation:** The file includes a navigation bar for easy access to different sections of the app.
- **Data Loading:** It incorporates buttons to filter and load data from an external dataset (`dataset/NBD1597.tab`).
- **Visualization:** Utilizes Plotly, a JavaScript graphing library, through the included `plot.js` script to create interactive visualizations of the loaded textual data.
- **User Interaction:** Provides user-friendly features such as search functionality, data filtering, and progress indicators.
- **Help Section:** Includes a descriptive section that guides users on how to interact with the visualization, interpret the data, and download the dataset.

`index.html` file is provided here for illustration purposes and may need customization based on your specific use case or integration requirements.

