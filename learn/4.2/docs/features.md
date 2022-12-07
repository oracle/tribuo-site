---
title: Features
nav_order: 201
parent: Docs
learn_nav: true
---
# Features
{:.no_toc}

These are just a few of the reasons you'll want to try out Tribuo.

* TOC
{:toc}

## Provenance

Tribuo's Models, Datasets and Evaluations have *provenance*, they
know exactly what parameters, transformations and files were used to
create them. This means each model can be rebuilt from scratch, and
experiments are easy as the evaluation tracks the models and datasets used.

## Type-safety

Tribuo is strongly typed (like Java). Each model knows what kind of 
output it produces, what inputs it expects and the names of everything 
involved. No more confusion when loading something off disk, Tribuo 
knows what kind of model it is and what labels it can predict.

## Interoperability

Tribuo provides interfaces to popular ML libraries like XGBoost and 
Tensorflow, along with support for the onnx model exchange format. Our 
ONNX support (via onnx-runtime) allows you to deploy models built in 
other packages and other languages (such as Python's scikit-learn) 
alongside models trained with Tribuo. Many Tribuo models can be 
exported in [ONNX](https://onnx.ai) format for deployment in other
systems, or cloud services like 
[OCI Data Science](https://www.oracle.com/data-science/cloud-infrastructure-data-science.html).

## Algorithms

Tribuo offers support for many popular machine learning algorithm. These
algorithms are grouped by type, and Tribuo's abstract interface makes
switching between implementations simple.

### General predictors

Tribuo has several implementations which can be used for a variety prediction tasks:

|Algorithm|Implementation|Notes|
|---|---|---|
|Bagging|Tribuo|Can use any Tribuo trainer as the base learner|
|Random Forest|Tribuo|Can use any Tribuo tree trainer as the base learner|
|Extra Trees|Tribuo|For both classification and regression|
|K-NN|Tribuo|Includes options for several parallel backends, as well as a single threaded backend|
|Neural Networks|TensorFlow|Train a neural network in TensorFlow via the Tribuo wrapper. Models can be deployed using the ONNX interface or the TF interface|
{: .table .table-sm .table-responsive}

The ensembles and K-NN use a combination function to produce the output, those
combiners are prediction task specific but the ensemble & K-NN implementations
are task agnostic. We provide voting and averaging combiners for multi-class
classification, multi-label classification and regression tasks.

### Classification

Tribuo has implementations or interfaces for:

|Algorithm|Implementation|Notes|
|---|---|---|
|Linear models|Tribuo|Uses SGD and allows any gradient optimizer|
|Factorization Machines|Tribuo|Uses SGD and allows any gradient optimizer|
|CART|Tribuo||
|SVM-SGD|Tribuo|An implementation of the Pegasos algorithm|
|Adaboost.SAMME|Tribuo|Can use any Tribuo classification trainer as the base learner|
|Multinomial Naive Bayes|Tribuo||
|Regularised Linear Models|LibLinear||
|SVM|LibSVM or LibLinear|LibLinear only supports linear SVMs|
|Gradient Boosted Decision Trees|XGBoost||
{: .table .table-sm .table-responsive}

Tribuo also has a linear chain CRF for sequence classification tasks. This is also
trained via SGD using any of Tribuo's gradient optimizers.

To explain classifier predictions there is an implementation of the LIME algorithm. Tribuo's
implementation allows the mixing of text and tabular data, along with the use of any sparse model
as an explainer (e.g., regression trees, lasso etc), however it does not support images.

### Regression

Tribuo's regression algorithms are multidimensional by default, any single dimensional implementations are wrapped
so they can produce a multidimensional output.

|Algorithm|Implementation|Notes|
|---|---|---|
|Linear models|Tribuo|Uses SGD and allows any gradient optimizer|
|Factorization Machines|Tribuo|Uses SGD and allows any gradient optimizer|
|CART|Tribuo||
|Lasso|Tribuo|Using the LARS algorithm|
|Elastic Net|Tribuo|Using the co-ordinate descent algorithm|
|Regularised Linear Models|LibLinear||
|SVM|LibSVM or LibLinear|LibLinear only supports linear SVMs|
|Gradient Boosted Decision Trees|XGBoost||
{: .table .table-sm .table-responsive}

### Clustering

Tribuo has infrastructure for clustering and a single algorithm. We expect to add new implementations over time.

|Algorithm|Implementation|Notes|
|---|---|---|
|HDBSCAN\*|Tribuo||
|K-Means|Tribuo|Includes both sequential and parallel backends, and the K-Means++ initialisation algorithm|
{: .table .table-sm .table-responsive}

### Anomaly Detection

Tribuo offers infrastructure for anomaly detection tasks. 
We expect to add new implementations over time.

|Algorithm|Implementation|Notes|
|---|---|---|
|One-class SVM|LibSVM||
|One-class linear SVM|LibLinear||
{: .table .table-sm .table-responsive}

### Multi-label classification

Tribuo offers infrastructure for multi-label classification, along
with a wrapper which converts any of Tribuo's multi-class classification
algorithms into a multi-label classification algorithm. We expect to add 
more multi-label specific implementations over time.

|Algorithm|Implementation|Notes|
|---|---|---|
|Independent wrapper|Tribuo|Converts a multi-class classification algorithm into a multi-label one by producing a separate classifier for each label|
|Classifier Chains|Tribuo|Provides classifier chains and randomized classifier chain ensembles using any of Tribuo's multi-class classification algorithms|
|Linear models|Tribuo|Uses SGD and allows any gradient optimizer|
|Factorization Machines|Tribuo|Uses SGD and allows any gradient optimizer|
{: .table .table-sm .table-responsive}

### Interfaces

In addition to our own implementations of Machine Learning algorithms, Tribuo
also provides a common interface to popular ML tools on the JVM. If you're
interested in contributing a new interface, open a
[GitHub Issue](https://github.com/oracle/tribuo/issues), and we can
discuss how it would fit into Tribuo.

Currently we have interfaces to:

* [LibLinear](https://github.com/bwaldvogel/liblinear-java) - via the LibLinear-java port of the original [LibLinear](https://www.csie.ntu.edu.tw/~cjlin/liblinear/) (v2.43).
* [LibSVM](https://www.csie.ntu.edu.tw/~cjlin/libsvm/) - using the pure Java transformed version of the C++ implementation (v3.25).
* [ONNX Runtime](https://onnxruntime.ai) - via the Java API contributed by our group (v1.9.0).
* [TensorFlow](https://tensorflow.org) - Using [TensorFlow Java](https://github.com/tensorflow/java) v0.4.2 (based on TensorFlow v2.7.4). This allows the training and deployment of TensorFlow models entirely in Java.
* [XGBoost](https://xgboost.ai) - via the built in XGBoost4J API (v1.5.0).
