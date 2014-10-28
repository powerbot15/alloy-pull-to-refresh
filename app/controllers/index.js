


var items = Alloy.Collections.item,
	currentContainerPosition = 0,
	
	freeze = false,
	pullAnimation = Ti.UI.createAnimation({
		top : 0,
		duration : 300
	}),
	arg = {
		heigh : 100,
		incrementor : 7
	},
	touchY,
	canRefresh;
	
pullAnimation.addEventListener('complete', function(e){
	console.log('complete');
	freeze = false;
});

for(var i = 80; i < 105; i++){  //fake collection items
	items.add({text : i});
}

$.index.open();

$.scrollContainer.addEventListener('touchstart', function(event){

	touchY = event.y;

	if(event.index == 0 || event.index == 1){ //okay we pull down first items(tale rows), may be it'll be refresh request
		canRefresh = true; 
	}
	else{
		canRefresh = false;
	}
});

$.scrollContainer.addEventListener('touchmove', function(event){

	if(freeze || !canRefresh){ 
		return;
	}

	var scrollView = this;
	
	if(!touchY){
		touchY = event.y;
	}
	
	if(touchY <= event.y){
		currentContainerPosition += Alloy.Globals.pullIncrementor;
		Ti.App.fireEvent('pullDown');
		if(currentContainerPosition >= Alloy.Globals.pullHeight){
			currentContainerPosition = 0;
			Ti.App.fireEvent('pullEnd');
			freeze = true;
			scrollView.touchEnabled = false;
			Ti.App.fireEvent('refreshStartWorking');

			//custom refresh methods
			
			setTimeout(function(){
				freeze = false;
				Ti.App.fireEvent('refreshStopWorking');
				touchY = 0;
				items.add({text : 'new item'});
				scrollView.touchEnabled = true;
				
			}, 3600);
			return;
		}
	}
	touchY = event.y;
});

$.scrollContainer.addEventListener('touchend', function(event){
	if(freeze || !canRefresh){
		return;
	}
	freeze = false;
	currentContainerPosition = 0;
	Ti.App.fireEvent('pullEnd');
});

$.index.addEventListener("close", function(){
    $.destroy();
});


