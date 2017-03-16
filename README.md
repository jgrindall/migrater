usage
=====

* command line - "node main"

1. It loads a list of files from a Javascript array in the local file "files.json"

2. It processes them and saves (in the same locations, same file name but .2diy replaced with .2quiz)

The contents of files.json should be a simple Javascript array of paths:

    [
	    "C:/Users/Name/Folder/quiz_red_ch1.2diy",
	    "C:/Users/Name/Folder/quiz_red_ch2.2diy"
	    ... etc
    ]

	
* "node main pathtojson.json"

This loads a list of files from a Javascript array in the file specified.

In other words, exactly the same as above but specify your own path to the file that holds the array



* deploy with web interface "node web"

Start the web app allowing users to upload files (currently one at a time) and download the .2quiz file.




deployment
==========

This project has 2 remotes

* gitlab: purplemash/quizmigrater

* github: migrater  (using john.grindall@gmail's account)

Any time code is pushed to the 'migrater' remote it deploys the web app to heroku.

Heroku displays the app at "migrater.herokuapp.com"

(I did this because Heroku has a super-easy way to deploy from github)



options
=======

* Currently the only option is "timePerQuestion" which can be 1-5 minutes

* It only supports mcq questions at the moment

* It only supports .2diy file extensions.

