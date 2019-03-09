const fs = require('fs')
const _ = require('lodash')
const shuffleSeed = require('shuffle-seed')

//Helper function to extract specific columns
function extractColumns(data, columnNames){
  const headers = _.first(data)
  const indexes = _.map(columnNames, column => headers.indexOf(column))
  const extracted = _.map(data, row => _.pullAt(row, indexes))
  return extracted
}

// Primary function in file, will load and parse cvs file
function loadCSV(filename, {converters = {}, dataColumns = [], labelColumns = [], shuffle = true, splitTest = false}){
  let data = fs.readFileSync(filename, {encoding: 'utf-8'})
  data = data.split('\n').map(row => row.split(','))
  //Takes care of trailing commas in cases of bad formatting
  data = data.map(row => _.dropRightWhile(row, val => val === ''))
  const headers = _.first(data)
  data = data.map((row, index) => {
    if (index === 0){
      return row
    }
    //Takes elements, and if they're numStrings, turns them into numbers
   return row.map((element, index) => {
     //Adds some custom parsing
     if (converters[headers[index]]){
       const converted = converters[headers[index]](element)
       return _.isNaN(converted) ? element : converted
     }
      const result = parseFloat(element)
      return _.isNaN(result) ? element : result
    })
  })

  let labels = extractColumns(data, labelColumns)
  data = extractColumns(data, dataColumns)

  //No longer need headers, so we can dump them
  data.shift();
  labels.shift()

  //Shuffle data using shuffle-seed: (i) second args need to be identical b/t two so each is shuffled the same, (ii) change second arg for different shffling order
  if (shuffle){
    data = shuffleSeed.shuffle(data, 'phrase')
    labels = shuffleSeed.shuffle(labels, 'phrase' )
  }

  //Splits data into test set and training set
  if (splitTest){
   const testSize = _.isNumber(splitTest) ? splitTest : Math.floor(data.length / 2) 
   return {
     features: data.slice(0, testSize),
     labels:  labels.slice(0, testSize),
     testFeatures: data.slice(testSize),
     testLabels: labels.slice(testSize)
   }
  } else {
    return {features: data, labels}
  }
  
}


// loadCSV('server/datasets/MNIST_data.csv')



