jQuery-Text-Autosize
====================

a jQuery plugin to size a text to fit its container


Examples
========


Simplest
--------

<script type="text/javascript">
	jQuery(document).ready(function(){
			jQuery('#container .auto-size').textAutoSize();
		});
</script>


More options
------------

<script type="text/javascript">
	jQuery(document).ready(function(){
		jQuery('#container .auto-size').textAutoSize({
			maxSize: 		100, //maximum font-size
			minSize: 		10, //minimum font-size
			grain:			0.5, //font-size grain 
			mode:				"rec-binary" //search algorithm to be used
		});
	});
</script>
	
	
	
Authors
=======
*  Emanuele 'Tex' Tessore <setola@gmail.com> - _Author/Ideator of the plugin_
*  Andrea Baccega <me@andreabaccega.com> - _Contributor who helped me to implement binary search_