usage
=====

* "node main" - load a list of files from a Javascript array in the file "files.json", process them and save (same locations, .2diy replaced with .2quiz)

Contents of files.json eg.

    [
	    "C:/Users/Name/Folder/quiz_red_ch1.2diy",
	    "C:/Users/Name/Folder/quiz_red_ch2.2diy"
	    ... etc
    ]

* "node main pathtojson.json" - load a list of files from a Javascript array in the file specified

* "node web" - start the web app allowing users to upload files (currently one at a time) and download the .2quiz file


deployment
==========

This project has 2 remotes

* gitlab: purplemash/migrater

* github: migrater  (using john.grindall@gmail's account)

Any time code is pushed to the 'migrater' remote it deploys the web app to heroku.



options
=======

Currently the only option is "timePerQuestion" which can be 1-5 minutes
