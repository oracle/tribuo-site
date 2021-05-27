# tribuo-site

This repo hosts the website for the [Tribuo](https://tribuo.org)
Java Machine Learning Library. Please visit the [Tribuo GitHub Repo](https://github.org/oracle/tribuo)
to report issues.

# Checking out and "building"

The tribuo-site relies on having the tribuo repo present as a
submodule. When cloning this repo, be sure to use
`git clone --recurse-submodules <url>`.

Some of the content in the site is pulled automatically from
the Tribuo repo. This is done by running two scripts (which should
be re-run any time the tribuo repo is updated):

```console
$ bin/importDocs.sh
$ bin/importTutuorials.sh
```

Finally, changes to tribuo.css or notebook.css must be shrunk down
into the .min.css files. This can be done with a tool such as
[CSSO](https://github.com/css/csso). If your IDE supports it, you
can have it watch the .css files and automatically generate the
minified files whenever they change.

## To test locally

If you've run the import scripts above, you're ready to try testing
the site. The first time you check out the code, you'll want to install
the dependencies with

```console
$ bundle install  # Just the first time
```

Then you can generate the site and run the web server with

```console
$ bundle exec jekyll serve
```

Now, open [`localhost:4000`](http://localhost:4000) in your browser.

