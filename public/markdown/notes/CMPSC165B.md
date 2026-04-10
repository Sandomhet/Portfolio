---
title: "CMPSC 165B Machine Learning"
description: ""
time: "Wed Apr 1, 2026"
---

# CMPSC 165B Machine Learning

## Table of Contents

## Types of Machine Learning

- **Supervised learning**: trained on labeled data.
    - **Classification** (easier): *discrete* output (logistic regression, support vector machines, and neural networks).
    - **Regression**: *continuous* output (linear regression and support vector regression).
- **Unsupervised learning**: trained on unlabeled data. The model must find patterns or structure in the data.
    - **Clustering**: *discrete* output. The model groups similar data points together, (k-means and hierarchical clustering).
    - **Dimensionality reduction**: *continuous* output. The model reduces the number of features in the data while preserving important information, (principal component analysis (PCA) and t-SNE).
    - **Density estimation**: The model estimates the probability distribution of the data, (Gaussian mixture models and kernel density estimation).
- **Semi-supervised learning**: trained on labeled and unlabeled data.
- **Reinforcement learning**: The model learns to make decisions by interacting with an environment and receiving feedback in the form of rewards or penalties.
- **Self-supervised learning**: The model generates its own labels from the input data, often by predicting parts of the input from other parts.
- **Transfer learning**: The model is pre-trained on a large dataset and then fine-tuned on a smaller, task-specific dataset.
- **Online learning**: The model learns incrementally from a stream of data, updating its parameters as new data arrives.
- **Ensemble learning**: The model combines multiple individual models to improve performance, such as bagging, boosting, and stacking.
- **Deep learning**: The model uses multiple layers of neural networks to learn complex representations of the data.
- **Generative models**: The model learns to generate new data samples that are similar to the training data, such as GANs and VAEs.
- **Probabilistic models**: The model represents uncertainty in the data and predictions using probability distributions, such as Bayesian networks and Markov models.
- **Graph-based models**: The model represents data and relationships using graphs, such as graph neural networks and Markov random fields.
- **Evolutionary algorithms**: The model uses principles of natural selection and genetics to optimize solutions, such as genetic algorithms and evolutionary strategies.

## Elements of Machine Learning

- Data: $\{(x_i, y_i)\}_{i=1}^n$ where $x_i$ is the input and $y_i$ is the output.
- Model: A function $f$ that maps input to output, $f: X \to Y$.
- Loss function: A function $L$ that measures the error between the predicted output and the true output, $L: Y \times Y \to \mathbb{R}$.
- Optimization algorithm: A method to minimize the loss function, such as gradient descent.

Hyper-parameters are set before training, such as learning rate, regularization strength, and number of layers in a neural network.  
- Model hyperparameters: don't change during training, such as the number of layers, number of neurons, and activation function.
- Optimization hyperparameters: can change during training, such as momentum, weight decay, and learning rate schedule.  
- Training hyperparameters: can change during training, such as learning rate schedule and regularization strength.

Parameters are learned during training, such as weights and biases in a neural network.

Complexity or Capacity is the ability of a model to fit a wide variety of functions. The capacity of a model is often measured by the number of parameters in the model.

- Overfitting occurs when a model has high capacity and fits the training data too closely, resulting in poor generalization to new data. It has low bias and high variance.
- Underfitting occurs when a model has low capacity and cannot fit the training data well, resulting in poor performance on both the training and test data. It has high bias and low variance.
- Generalization is the ability of a model to perform well on new, unseen data. A model that generalizes well has low bias and low variance. 
    - Bias is the error introduced by approximating a real-world problem with a simplified model. 
    - Variance is the error introduced by sensitivity to small fluctuations in the training data.
- Regularization is a technique used to prevent overfitting by adding a penalty term to the loss function that discourages complex models.

## Machine Learning Workflow

1. **Data collection**: Gather and preprocess the data, including cleaning, normalization, and feature engineering.
    - *Training* set: used to train the model.
    - *Validation* set: used to tune hyperparameters and select the best model.
    - *Testing* set: used to evaluate the final model's performance on unseen data.
2. **Model selection**: Choose an appropriate model architecture based on the problem and data characteristics.
3. Select a objective function and loss function:
    - High-level choice: MLE, MAP, or Bayesian inference.
    - Actual objective function: MSE, NLL, hinge loss.
3. **Training**: Use the training data to optimize the model parameters by minimizing the loss function.
4. **Evaluation**: Assess the model's performance on a separate validation set using appropriate metrics (e.g., accuracy, precision, recall, F1 score, mean squared error).
5. **Hyperparameter tuning**: Adjust the model's hyperparameters to improve performance, often using techniques like grid search or random search. (e.g., learning rate, regularization strength, number of layers, and number of neurons).
6. **Testing**: Evaluate the final model on a separate test set to estimate its performance on unseen data.
7. **Deployment**: Deploy the model in a production environment where it can make predictions on new data.
8. **Monitoring and maintenance**: Continuously monitor the model's performance and update it as needed to ensure it remains effective over time.

## Classification

Setup:
- **Binary classification**: $y \in \{0, 1\}$.
- **Multiclass classification**: $y \in \{1, 2, \ldots, K\}$.
- **Multilabel classification**: $y \in \{0, 1\}^K$.

- **Binary classification**: The model predicts one of two classes (e.g., spam vs. not spam).
- **Multiclass classification**: The model predicts one of three or more classes (e.g., classifying types of flowers).
- **Multilabel classification**: The model predicts multiple classes for each instance (e.g., tagging an image with multiple labels).
- **Imbalanced classification**: The classes are not represented equally in the dataset (e.g., fraud detection where fraudulent transactions are rare).

## Accuracy Measures

### Accuracy and Error Rate

$$\textbf{Accuracy} = \frac{\text{Number of correct predictions}}{\text{Total number of predictions}}$$
$$\textbf{Error Rate} = \frac{\text{Number of incorrect predictions}}{\text{Total number of predictions}} = 1 - \text{Accuracy}$$

### Confusion Matrix

|               | Predicted Positive | Predicted Negative |
|---------------|--------------------|--------------------|
| Actual Positive | True Positives (TP) | False Negatives (FN) |
| Actual Negative | False Positives (FP) | True Negatives (TN) |

- **Accuracy**: $\frac{TP + TN}{TP + TN + FP + FN}$
- **Precision**:
$$\textbf{Precision} = \frac{\text{True Positives}}{\text{True Positives} + \text{False Positives}}$$
- **Recall**:
$$\textbf{Recall} = \frac{\text{True Positives}}{\text{True Positives} + \text{False Negatives}}$$
- **F1 Score**: The harmonic mean of precision and recall, providing a single metric that balances both.
$$\textbf{F1 Score} = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}$$

### ROC Curve and AUC score

The **Receiver Operating Characteristic (ROC)** curve plots the True Positive Rate (TPR) against the False Positive Rate (FPR) at various threshold settings.  
The **Area Under the Curve (AUC)** score quantifies the overall ability of the model to discriminate between positive and negative classes, with a value of 1 indicating perfect discrimination and 0.5 indicating no discrimination.

