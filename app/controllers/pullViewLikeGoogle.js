
var args = arguments[0] || {},
	currentPullWidth = 0,
	lineAnimation = Ti.UI.createAnimation({
		width:0,
		duration : 100
	}),
	widthIncrementor,
	slides = [$.i1, $.i2, $.i3],
	refreshing = true,
	currentSlide = 1,
	higherZIndex = 100,
	slideAnimationUp = Ti.UI.createAnimation({
		width : Titanium.Platform.displayCaps.platformWidth,
		duration : 500
	});
	slideAnimationDown = Ti.UI.createAnimation({
		width : 0,
		duration : 100
	});

widthIncrementor = Titanium.Platform.displayCaps.platformWidth / (Alloy.Globals.pullHeight / Alloy.Globals.pullIncrementor);
//widthIncrementor = Titanium.Platform.displayCaps.platformWidth / (150 / 7);
console.log(widthIncrementor);


Ti.App.addEventListener('pullDown', function(event){
	currentPullWidth += widthIncrementor;
	$.i1.width = currentPullWidth + 'px';
});

Ti.App.addEventListener('pullEnd', function(event){
	currentPullWidth = 0;
	$.i1.width = 0;
});

Ti.App.addEventListener('refreshStartWorking', function(event){
	refreshing = true;
	refreshStartSliding();
});

Ti.App.addEventListener('refreshStopWorking', function(event){
	refreshing = false;
	refreshStopSliding();
});

function refreshStartSliding(){

	if(!refreshing){
		return;
	}
	if(currentSlide == 0){
		slides[slides.length - 2].animate(slideAnimationDown);
	}
	else{
		if(currentSlide == 1){
			slides[slides.length - 1].animate(slideAnimationDown);
		}
		else{
			slides[currentSlide - 2].animate(slideAnimationDown);
		}
	}
	
	
	higherZIndex++;
	if(higherZIndex >= 150){
		refreshing = false;
	}
	
	slides[currentSlide].zIndex = higherZIndex,
	
	slides[currentSlide].animate(slideAnimationUp);
	
	currentSlide++;
	if(currentSlide >= slides.length){
		currentSlide = 0;
	}
}

slideAnimationUp.addEventListener('complete', function(event){
	refreshStartSliding();
});

function refreshStopSliding(){
	console.log('stop refresh sliding');
	for(var i = 0; i < slides.length; i++){
		slides[i].animate(slideAnimationDown);
//		slides[i].width = 0;
		console.log('slide # ' + i + ' reseted?');
	}
}