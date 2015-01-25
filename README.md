# Graffiti 0.0.1
Inline comments for the web.

##Installing
To get this dev version running on your local machine, you'll need:

* [NodeJS](http://nodejs.org/)
* [MongoDB](http://www.mongodb.org/)
* [Chrome](http://www.google.com/chrome/)
* A willingness to open your terminal.

Path configuration, miscellaneous setup of the above I'll leave to the beautiful folks at stackoverflow. OSX shouldn't have too much trouble.


## Running
####OSX / UNIX

1. Get the hottest latest from Github.
2. Open terminal.
3. Run `mongod`, or, if you're like me and have your databases in a non-default directory, something like `mongod --dbpath ~/data/db`. Keep it running in a separate tab or a different window while you do other terminal stuff.
4. Check what your ip address is with `ifconfig`, it should look something like 192.168.2.5 (not 127.0.0.1). Look for the `en0` block of output.
5. In the Graffiti folder pulled from Github, navigate to the `/extension/src/bg` folder, and open `background.js` with a text editor.
6. The first two lines should look like `var Graffiti = new Graffiti('http://192.168.2.5:9000');` and
`var socket = io.connect('http://192.168.2.5:9000',{`
7. Replace ONLY the 192.168.2.5's with your IP from Step 4.
8. Save.
9. Open the terminal again and `cd` to wherever you pulled the main folder. If you pulled the directory to your documents folder, it might look like `cd ~/Documents/Graffiti`.
10. Run `npm install -g bower`, or `sudo npm install -g bower`, then `bower install`.
11. Now, run `npm install`, or if that errors for you (like it does for me), try `sudo npm install` and type in your password so you can actually get the dependencies.
12. Now you should be able to run `grunt serve --force` to get your local server running. If after a moment it ouputs: `Running "watch" task
Completed in 2.203s at Sun Jan 25 2015 15:50:26 GMT-0500 (EST) - Waiting...`, you've done it! A tab should open in your default browser with a boilerplate app template.
#### About that, we could use this as the public facing dashboard, analytics thing. Login, account, group management further down the line.

13.  Go to Chrome, then your extension dashboard : `chrome://extensions/`
14.  Click `Load unpacked extension...`
15.  Find the `/extension` folder in the Graffiti Directory and select it.
####If you see Graffiti _Paint the web red_ in your extensions list. Congrats. You've made it. If not, let me know I'll try to help.

Whenever you start the server, it's initially configured for [this TechCrunch article](http://techcrunch.com/2015/01/20/spacex-raises-1-billion-in-new-funding-from-google-and-fidelity/). If all went well, you should see some highlighting and an initial comment.

Click a highlight, or select paragraph text and a comment form should appear. If you click a highlight, you'll be responding to that _SPRAY_ as I'm referring to them.

If you select unhighlighted text, you'll be creating a new _SPRAY_ and initializing it with a comment.

###WHAT'S COOL
This pretty much works wherever there are paragraphs. I've tested it on Medium, and various other news sites, and it's flawless....now that I've said flawless.

###WHAT'S FLAWED
For now, the text selection doesn't really like some special characters, or some multiline selections. It works really well for sentence fragments strings of words on the same line. I'm still testing and working on better text interpretation.