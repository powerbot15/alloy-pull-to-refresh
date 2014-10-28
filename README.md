Titanium Alloy Sample realization of pull-to-refresh widget
===========================================================

This project shares under MIT license, so you can use it on your own

Widget placed in this [path](https://github.com/powerbot15/alloy-pull-to-refresh/tree/master/app/widgets/pullToRefreshAnimation)

Usage
-----

Widget common usage is pretty simple. It reacts on App custom events:

	+refreshStartWorking
	+refreshStopWorking

So you just need to fire these custom events on app, when you need start or stop the refresh animation:

	Ti.App.fireEvent('refreshStartWorking') //to start widget animation
	Ti.App.fireEvent('refreshStopWorking') //to stop widget animation
	
Extended Usage
--------------
	
I tried to make it like gmail android app pull-to-refresh, so if you want to show user the growing bar when content pulling down, you need to set some globals in your app
You can look in alloy.js file and see this globals. 
To make the bar growing you need to fire custom event	pullDown
And if user stop pulling down before edge fire event 	pullEnd
I didn't want to do difficult calculations of pull pixels in each 	touchmove event, so I used a discrete increment and discrete edge of starting refresh widget

	Alloy.Globals.pullHeight 
	Alloy.Globals.pullIncrementor
	
The working logic of these globals is nearly simple, so you can download repo and watch this logic inside of your Titanium Studio

Finally
=======

The main point of usage of this widget is to fire events in your app, so do it carefully. Don't forget to disable touch event or may be button(or something else you use to fire event) to prevent invalid events firing
I added an defence code into widget to prevent refresh animation doubling but you can make your own defence in app.
Any styles may to be changed in tss files. 
		
