require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const _ = require('lodash')

class LogisticRegression {
  constructor(features, labels, options){
      this.features = this.processFeatures(features)
      this.labels = tf.tensor(labels)
      this.options = Object.assign({learningRate: 0.1, iterations: 1000, batchSize: 10, decisionBoundary: 0.5}, options)
      //.zeros creates new tensors with 0 as values, you pass it shape (same as ones above), passing colum value of the features' shape account for multiple features
      this.weights = tf.zeros([this.features.shape[1], this.labels.shape[1]])
      this.costHistory = []
  }

  //This is a vectorized solution
  gradientDescent(features, labels){
    //matMul === matrix multiplication, returns new tensor
    const currentGuesses = features.matMul(this.weights).softmax()
    //elementwise subtraction
    const differences = currentGuesses.sub(labels)
    //transpose operation === transpose
    const slopes = features
        .transpose()
        .matMul(differences)
        .div(features.shape[0])
    //adjust m and b (weights)
    this.weights = this.weights.sub(slopes.mul(this.options.learningRate))
  }

  //Train the model to get the weights adjusted, also adjusts learning rate on every iteration of grad descent
  train(){
    const batchQuantity = Math.floor(this.features.shape[0] / this.options.batchSize)
    for (let i = 0; i < this.options.iterations; i++){
      for (let j = 0; j < batchQuantity; j++){
        const startIdx = j * this.options.batchSize
        const {batchSize} = this.options.batchSize 
        const featureSlice = this.features.slice([startIdx, 0], [batchSize, -1])
        const labelSlice = this.labels.slice([startIdx, 0], [batchSize, -1])
        this.gradientDescent(featureSlice, labelSlice)
      }
      this.recordCost()
      this.updateLearningRate()
    }
  }

  //Function for putting in new data to predict
  predict(observations){
    //Start with preprocessing the data, then do matrix multiplication against the weights, 
    //apply softmax, 
    return this.processFeatures(observations).matMul(this.weights).softmax().argMax(1)
  }

  //We then test the model, the tests will use the weights that we got from training
  async test(testFeatures, testLabels){
    const predictions = this.predict(testFeatures)
    testLabels = tf.tensor(testLabels).argMax(1)
    //Note using arraySync might cause performance issues since it's synchronous, if so, consider async version(.array)
    let incorrect = await predictions.notEqual(testLabels).sum().array()
    return (predictions.shape[0] - incorrect) / predictions.shape[0]
  }

  //Returns scaled (standardized) feature set with col of 1s
  processFeatures(features){
    //Turn features into tensor
    features = tf.tensor(features)
    //Standardization// checks whether this is first or second time doing standardization (i.e., for training or testi g)
    if (this.mean && this.variance){
      features = features.sub(this.mean).div(this.variance.pow(0.5))
    } else {
      features = this.standardize(features)
    } 
    //Adds col of ones to features for determining mx + b (allows for matrix multiplication) Note: we do this *after* standardizing so we don't alter the ones
   features = tf.ones([features.shape[0], 1]).concat(features, 1)
    return features
  }

  //Standardizes features
  standardize(features){
    const {mean, variance} = tf.moments(features, 0)
    this.mean = mean;
    this.variance = variance
    return features.sub(mean).div(variance.pow(0.5))
  }
  
  //Caclulates and records Cross Entropy (cost)
  async recordCost(){
    const guesses = this.features.matMul(this.weights).softmax()
    const termOne = this.labels
      .transpose()
      .matMul(guesses.log())

    const termTwo = this.labels.mul(-1).add(1).transpose().matMul(
      guesses.mul(-1).add(1).log()
    )

   const cost = await termOne.add(termTwo).div(this.features.shape[0]).mul(-1).array(0, 0)
   this.costHistory.unshift(cost)
  }

  //looks at cost history, and decides how to update learning rate
  updateLearningRate(){
    if (this.costHistory.length < 2){
      return;
    }
    if (this.costHistory[0] > this.costHistory[1]){
      this.options.learningRate /=  2
    } else {
      this.options.learningRate *= 1.05
    }
  }
}

module.exports = LogisticRegression

