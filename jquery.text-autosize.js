/**
 * Calculates the width of a text element
 * with given fontSize by inserting the
 * text in a testEl.
 * The testEl must be in the DOM
 * or the width will be always 0.
 * @param fontSize the size of the font
 * @param testEl the DOM element where insert the text
 * @return the width of the text
 */

jQuery.fn.textWidth = function(fontSize, testEl){
	testEl.css({
		"font-size": fontSize+'px'
	});
	testEl.html(jQuery(this).html());
	var width = testEl.outerWidth(true);
	testEl.html('');
	return width;
};


/**
 * jQuery plugin that gives a font size 
 * to fill the given width
 */
jQuery.fn.textAutoSize = function(options){
	var testElID = 'test-'+Math.floor((Math.random()*10000)+1);
	settings = {
		width: 			'auto',
		maxSize: 		100,
		minSize: 		10,
		testEl:			jQuery('<span/>',{"class":"textAutoSize-test"}),
		grain:			0.5,
		availableSizes: [],
		mode:				'ite-binary',
		css:				{
		    position			: "absolute",
		    visibility		: "hidden",
		    height				: "auto",
		    width					: "auto",
		    "white-space"	: "nowrap"
		}
	};

	for(var i=settings.minSize; i<settings.maxSize; i+=settings.grain){
		settings.availableSizes.push(i);
	}
	if(options) jQuery.extend(settings,options);
	
	
	
	if(settings.testEl.attr('id')==''){
		settings.testEl.attr('id', testElID);
	}
	
	settings.testEl.css(settings.css);
	
	
	jQuery(this).each(function(){
		var that = jQuery(this);
		if(that.text().lenght == 0) return;
		if(settings.width == 'auto'){
			settings.width = that.width();
		}
		that.append(settings.testEl);
		
		var currentSize = settings.minSize;
		var iterationsLeft = settings.maxIterations;
		
		switch(settings.mode){

		case 'ite-binary':
			var imax = settings.maxSize;
			var imin = settings.minSize;
			var currentWidth, imid;
			
		  while (imax >= imin){
		      imid = parseInt((imin + imax) / 2);
		      currentWidth = that.textWidth(settings.availableSizes[imid], settings.testEl);
		      if(currentWidth <  settings.width){
		      	imin = imid + 1;
		      } else {
		      	imax = imid - 1;
		      }
		  }
		  currentSize = settings.availableSizes[imax];
			break;
			
		case 'rec-binary':
			
			function recursiveSearch(availableSizes, width, imin, imax, testEl, that){
				if (imax < imin){
					/*
					 * Recursion is over. 
					 * The perfect result is between those indexes. 
					 * Let's return the minor index to do not overflow the container
					 */
					return imax;
				}

				var imid = parseInt((imin + imax) / 2);

				currentWidth = that.textWidth(availableSizes[imid], testEl);
				
				if (currentWidth > width){
					return recursiveSearch(availableSizes, width, imin, imid-1, testEl, that);
				}
				else if (currentWidth < (width)){
					return recursiveSearch(availableSizes, width, imid+1, imax, testEl, that);
				}
				else{//this is fairly impossible...
					return imid;
				}
			}
			
			var index = recursiveSearch(
					settings.availableSizes, 
					settings.width, 
					settings.minSize, 
					settings.maxSize, 
					settings.testEl, 
					that
			);
			currentSize = settings.availableSizes[index];
			
			break;
		
		// Precise but slow
		case 'linear':
			currentSize = settings.minSize;
			do {
				iterationsLeft--;
				currentSize += settings.minGrain;
				currentWidth = that.textWidth(currentSize, settings.testEl);
			} while(currentWidth <= settings.width  && iterationsLeft > 0);
			currentSize -= settings.minGrain;
			break;
		}
		
		that.css('font-size',currentSize+'px');
		/**console.log(jQuery(this).text());
		console.warn('currentSize: '+currentSize);
		console.warn('currentWidth: '+currentWidth);
		console.warn('iterations: '+(settings.maxIterations-iterationsLeft));
		console.warn('-------------------');/**/
		

		
		settings.testEl.detach();
		
	});

};