---
title: Release Notes
nav_order: 205
parent: Docs
learn_nav: true
is_release_notes: true
comment: This file should be updated for dot releases within the minor version.
---
# Tribuo v4.1.1 Release Notes

This is the first patch release for Tribuo v4.1. The main fixes in this release
are to the multi-dimensional output regression support, and to support the use
of KMeans and KNN models when running under a restrictive `SecurityManager`.
Additionally this release pulls in TensorFlow-Java 0.4.0 which upgrades the
TensorFlow native library to 2.7.0 fixing several CVEs. Note those CVEs may not
be applicable to TensorFlow-Java, as many of them relate to Python codepaths
which are not included in TensorFlow-Java. Also note the TensorFlow upgrade is
a breaking API change to Tribuo's TF API as graph initialization is handled
differently in this release, which causes unavoidable changes to Tribuo's user
facing TF interface.

## Multi-dimensional Regression fix

In Tribuo 4.1.0 and earlier there is a severe bug in multi-dimensional
regression models (i.e., regression tasks with multiple output dimensions).
Models other than `LinearSGDModel` and `SparseLinearModel` (apart from when
using the `ElasticNetCDTrainer`) have a bug in how the output dimension indices
are constructed, and may produce incorrect outputs for all dimensions (as the
output will be for a different dimension than the one named in the `Regressor`
object). This has been fixed, and loading in models trained in earlier versions
of Tribuo will patch the model to rearrange the dimensions appropriately.
Unfortunately this fix cannot be applied to tree based models, and so all
multi-output regression tree based models should be retrained using Tribuo
4.1.1 or newer as they are irretrievably corrupt. Additionally when using
standardization in multi-output regression LibSVM models dimensions past the
first dimension have the model improperly stored and will also need to be
retrained with Tribuo 4.1.1.  See
[#177](https://github.com/oracle/tribuo/pull/177) for more details.

## Bug fixes

- NPE fix for LIME explanations using models which don't support per class weights ([#157](https://github.com/oracle/tribuo/pull/157)).
- Fixing a bug in multi-label evaluation which swapped FP for FN ([#167](https://github.com/oracle/tribuo/pull/167)).
- Fixing LibSVM and LibLinear so they have reproducible behaviour ([#172](https://github.com/oracle/tribuo/pull/172)).
- Provenance fix for TransformTrainer and an extra factory for XGBoostExternalModel so you can make them from an in memory booster ([#176](https://github.com/oracle/tribuo/pull/176))
- Fix multidimensional regression ([#177](https://github.com/oracle/tribuo/pull/177)) (fixes regression ids, fixes libsvm so it emits correct standardized models, adds support for per dimension feature weights in XGBoostRegressionModel).
- Normalize LibSVMDataSource paths consistently in the provenance ([#181](https://github.com/oracle/tribuo/pull/181)).
- KMeans and KNN now run correctly when using OpenSearch's SecurityManager ([#197](https://github.com/oracle/tribuo/pull/197)).
- TensorFlow-Java 0.4.0 ([#195](https://github.com/oracle/tribuo/pull/195)).

## Contributors

- Adam Pocock ([@Craigacp](https://github.com/Craigacp))
- Jack Sullivan ([@JackSullivan](https://github.com/JackSullivan))
- Philip Ogren ([@pogren](https://github.com/pogren))
- Jeffrey Alexander ([@jhalexand](https://github.com/jhalexand))

# Tribuo v4.1 Release Notes

Tribuo 4.1 is the first feature release after the initial open source release.
We've added new models, new parameters for some models, improvements to data
loading, documentation, transformations and the speed of our CRF and linear
models, along with a large update to the TensorFlow interface. We've also
revised the tutorials and added two new ones covering TensorFlow and document
classification.

## TensorFlow support

Migrated to TensorFlow Java 0.3.1 which allows specification and training of
models in Java ([#134](https://github.com/oracle/tribuo/pull/134)).  The
TensorFlow models can be saved in two formats, either using TensorFlow's
checkpoint format or Tribuo's native model serialization. They can also be
exported as TensorFlow Saved Models for interop with other TensorFlow
platforms. Tribuo can now load TF v2 Saved Models and serve them alongside TF
v1 frozen graphs with it's external model loader.

We also added a TensorFlow tutorial which walks through the creation of a
simple regression MLP, a classification MLP and a classification CNN, before
exporting the model as a TensorFlow Saved Model and importing it back into
Tribuo.

## New models

- Added extremely randomized trees, i.e., ExtraTrees ([#51](https://github.com/oracle/tribuo/pull/51)).
- Added an SGD based linear model for multi-label classification ([#106](https://github.com/oracle/tribuo/pull/106)).
- Added liblinear's linear SVM anomaly detector ([#114](https://github.com/oracle/tribuo/pull/114)).
- Added arbitrary ensemble creation from existing models ([#129](https://github.com/oracle/tribuo/pull/129)).

## New features

- Added K-Means++ ([#34](https://github.com/oracle/tribuo/pull/34)).
- Added XGBoost feature importance metrics ([#52](https://github.com/oracle/tribuo/pull/52)).
- Added OffsetDateTimeExtractor to the columnar data package ([#66](https://github.com/oracle/tribuo/pull/66)).
- Added an empty response processor for use with clustering datasets ([#99](https://github.com/oracle/tribuo/pull/99)).
- Added IDFTransformation for generating TF-IDF features ([#104](https://github.com/oracle/tribuo/pull/104)).
- Exposed more parameters for XGBoost models ([#107](https://github.com/oracle/tribuo/pull/107)).
- Added a Wordpiece tokenizer ([#111](https://github.com/oracle/tribuo/pull/111)).
- Added optional output standardisation to LibSVM regressors ([#113](https://github.com/oracle/tribuo/pull/113)).
- Added a BERT feature extractor for text data ([#116](https://github.com/oracle/tribuo/pull/116)). 
This can load in ONNX format BERT (and BERT style) models from HuggingFace Transformers, and use them as part of Tribuo's text feature extraction package.
- Added a configurable version of AggregateDataSource, and added iteration order parameters to both forms of AggregateDataSource ([#125](https://github.com/oracle/tribuo/pull/125)).
- Added an option to RowProcessor which passes through newlines ([#137](https://github.com/oracle/tribuo/pull/137)).

## Other improvements

- Removed redundant computation in tree construction ([#63](https://github.com/oracle/tribuo/pull/63)).
- Added better accessors for the centroids of a K-Means model ([#98](https://github.com/oracle/tribuo/pull/98)).
- Improved the speed of the feature transformation infrastructure ([#104](https://github.com/oracle/tribuo/pull/104)).
- Refactored the SGD models to reduce redundant code and allow models to share upcoming improvements ([#106](https://github.com/oracle/tribuo/pull/106), [#134](https://github.com/oracle/tribuo/pull/134)).
- Added many performance optimisations to the linear SGD and CRF models, allowing the automatic use of dense feature spaces ([#112](https://github.com/oracle/tribuo/pull/112)). This also adds specialisations to the math library for dense vectors and matrices, improving the performance of the CRF model even when operating on sparse feature sets.
- Added provenance tracking of the Java version, OS and CPU architecture ([#115](https://github.com/oracle/tribuo/pull/115)).
- Changed the behaviour of sparse features under transformations to expose additional behaviour ([#122](https://github.com/oracle/tribuo/pull/122)).
- Improved `MultiLabelEvaluation.toString()` ([#136](https://github.com/oracle/tribuo/pull/136)).
- Added a document classification tutorial which shows the various text feature extraction techniques available in Tribuo.
- Expanded javadoc coverage.
- Upgraded ONNX Runtime to 1.7.0, XGBoost to 1.4.1, TensorFlow to 0.3.1, liblinear-java to 2.43, OLCUT to 5.1.6, OpenCSV to 5.4.
- Miscellaneous small bug fixes.

## Contributors

- Adam Pocock ([@Craigacp](https://github.com/Craigacp))
- Philip Ogren ([@pogren](https://github.com/pogren))
- Jeffrey Alexander ([@jhalexand](https://github.com/jhalexand))
- Jack Sullivan ([@JackSullivan](https://github.com/JackSullivan))
- Samantha Campo ([@samanthacampo](https://github.com/samanthacampo))
- Luke Nezda ([@nezda](https://github.com/nezda))
- Mani Sarkar ([@neomatrix369](https://github.com/neomatrix369))
- Stephen Green ([@eelstretching](https://github.com/eelstretching))
- Kate Silverstein ([@k8si](https://github.com/k8si))
