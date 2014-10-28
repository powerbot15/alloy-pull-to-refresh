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
	
	
