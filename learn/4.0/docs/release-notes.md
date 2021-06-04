---
title: Release Notes
nav_order: 205
parent: Docs
learn_nav: true
is_release_notes: true
comment: This file should be updated for dot releases within the minor version.
---
# Tribuo v4.0.2 Release Notes

This is the first Tribuo point release after the initial public announcement.
It fixes many of the issues our early users have found, and improves the
documentation in the areas flagged by those users. We also added a couple of
small new methods as part of fixing the bugs, and added two new tutorials: one
on columnar data loading and one on external model loading (i.e. XGBoost and
ONNX models).

Bugs fixed:
- Fixed a locale issue in the evaluation tests.
- Fixed issues with RowProcessor (expand regexes not being called, improper provenance capture).
- `IDXDataSource` now throws `FileNotFoundException` rather than a mysterious `NullPointerException` when it can't find the file.
- Fixed issues in `JsonDataSource` (consistent exceptions thrown, proper termination of reading in several cases).
- Fixed an issue where regression models couldn't be serialized due to a non-serializable lambda.
- Fixed UTF-8 BOM issues in CSV loading.
- Fixed an issue where `LibSVMTrainer` didn't track state between repeated calls to train.
- Fixed issues in the evaluators to ensure consistent exception throwing when discovering unlabelled or unknown ground truth outputs.
- Fixed a bug in ONNX `LabelTransformer` where it wouldn't read pytorch outputs properly.
- Bumped to OLCUT 5.1.5 to fix a provenance -> configuration conversion issue.

New additions:
- Added a method which converts a Jackson `ObjectNode` into a `Map` suitable for the `RowProcessor`.
- Added missing serialization tests to all the models.
- Added a getInnerModels method to `LibSVMModel`, `LibLinearModel` and `XGBoostModel` to allow users to access a copy of the internal models.
- More documentation.
- Columnar data loading tutorial.
- External model (XGBoost & ONNX) tutorial.

Dependency updates:
- OLCUT 5.1.5 (brings in jline 3.16.0 and jackson 2.11.3).

# Tribuo v4.0.1 Release Notes

This release fixes a few issues we found in the tutorials just before launch.

The IDXDataSource was added as an alternative way to load MNIST as the LibSVM
website (which the tutorial was originally based on) was intermittently down
during our pre-launch period.

- Fixes an issue where the CSVReader wouldn't read files with extraneous newlines at the end.
- Adds an IDXDataSource so we can read [IDX](http://yann.lecun.com/exdb/mnist/) (i.e. MNIST) formatted datasets.
- Updated the configuration tutorial to read MNIST from IDX files rather than libsvm files.

# Tribuo v4.0 Release Notes (Initial Public Release)

This is the first public release of the Tribuo Java Machine Learning library.
Tribuo provides classification, regression, clustering and anomaly detection
algorithms along with data loading, transformation and model evaluation code.
Tribuo also provides support for loading external ONNX models and scoring them
in Java as well as support for training and evaluating deep learning models
using TensorFlow.

Tribuo's development started in 2016 led by [Oracle
Labs](https://labs.oracle.com)' [Machine Learning Research
Group](https://labs.oracle.com/pls/apex/f?p=94065:12:3439018808834:7), and has
been in production inside Oracle since 2017. It's now available under an Apache
2.0 license, and we'll continue to develop it in the open, including accepting
community PRs under the Oracle Contributor Agreement.

See [tribuo.org](https://tribuo.org) for a project overview, or explore the
[docs](https://github.com/oracle/tribuo/tree/main/docs) here on Github for more
details. We have jupyter notebook based
[tutorials](https://github.com/oracle/tribuo/tree/main/tutorials) demonstrating
various features of the library.
