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
alongside models trained with Tribuo.

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
|K-NN|Tribuo|Has several parallel backends, as well as a single threaded backend|
|Neural Networks|TensorFlow|Via the TensorFlow interface. Models can be deployed using the ONNX interface or the TF interface|
{: .table .table-sm .table-responsive}

The ensembles and K-NN use a combination function to produce the output,
those combiners are prediction task specific but the ensemble & K-NN implementations
are task agnostic. We provide voting and averaging combiners for classification and regression tasks.

### Classification

Tribuo has implementations or interfaces for:

|Algorithm|Implementation|Notes|
|---|---|---|
|Linear models|Tribuo|Uses SGD and allows any gradient optimizer|
|CART|Tribuo||
|SVM-SGD|Tribuo|An implementation of the Pegasos algorithm|
|Adaboost.SAMME|Tribuo|Can use any Tribuo classification trainer as the base learner|
|Multinomial Naive Bayes|Tribuo|
|LIME|Tribuo|Our LIME implementation allows mixing of text and tabular data, but does not support images||
|Regularised Linear Models|LibLinear||
|SVM|LibSVM or LibLinear|LibLinear only supports linear SVMs|
|Gradient Boosted Decision Trees|XGBoost||
{: .table .table-sm .table-responsive}

Tribuo also has a linear chain CRF for sequence classification tasks. This is also
trained via SGD using any of Tribuo's gradient optimizers.

### Regression

Tribuo's regression algorithms are multidimensional by default, any single dimensional implementations are wrapped
so they can produce a multidimensional output.

|Algorithm|Implementation|Notes|
|---|---|---|
|Linear models|Tribuo|Uses SGD and allows any gradient optimizer|
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
|K-Means|Tribuo|Has both sequential and parallel backends|
{: .table .table-sm .table-responsive}

### Anomaly Detection

Tribuo has infrastructure for anomaly detection tasks and a single backend implementation using LibSVM.
We expect to add new implementations over time.

|Algorithm|Implementation|Notes|
|---|---|---|
|One-class SVM|LibSVM||
{: .table .table-sm .table-responsive}

### Interfaces

In addition to our own implementations of Machine Learning algorithms, Tribuo
also provides a common interface to popular ML tools on the JVM. If you're
interested in contributing a new interface, open a
[GitHub Issue](https://github.com/oracle/tribuo/issues), and we can
discuss how it would fit into Tribuo.

Currently we have interfaces to:

* [LibLinear](https://github.com/bwaldvogel/liblinear-java) - via the LibLinear-java port of the original [LibLinear](https://www.csie.ntu.edu.tw/~cjlin/liblinear/).
* [LibSVM](https://www.csie.ntu.edu.tw/~cjlin/libsvm/) - using the pure Java transformed version of the C++ implementation.
* [ONNX Runtime](https://onnxruntime.ai) - via the Java API contributed by our group.
* [TensorFlow](https://tensorflow.org) - Using the 1.14 Java API. We're participating in the Tensorflow JVM SIG, 
and the upcoming TensorFlow 2 Java API will support training models without Python, which we'll incorporate into Tribuo 
when it's released.
* [XGBoost](https://xgboost.ai)