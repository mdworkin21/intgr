require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const LogisticRegression = require('./logistic-regression')
const _ = require('lodash')
const mnist = require('mnist-data')


const mnistData = mnist.training(0,10)


const features = mnistData.images.values.map(image => _.flatMap(image))


const encodedLabels = mnistData.labels.values.map(label => {
  const row = new Array(10).fill(0)
  row[label] = 1
  return row
})

const regression = new LogisticRegression(features, encodedLabels, {
  learningRate: 1,
  iterations: 5,
  batchSize: 100
})

regression.train()

const testMnistData = mnist.testing(0, 1000)
const testFeatures = testMnistData.images.values.map(image => _.flatMap(image))
const testEncodedLaels = testMnistData.labels.values.map(label => {
  const row = new Array(10).fill(0)
  row[label] = 1
  return row
})

//Have to put this in a function so we can get the promise out
async function runTest(){
  const acurracy = await regression.test(testFeatures, testEncodedLaels)
  console.log('ACCURACY IS ', acurracy)

}

runTest()
