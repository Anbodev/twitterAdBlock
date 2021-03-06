var trendCount = 0;
var followCount = 0;
var currentURL = window.location.href;
var newURL;

window.addEventListener('popstate', function (event) {
	newURL = this.location.href;
	setTimeout(function(){
		if(newURL != currentURL){
			trendCount = 0;
			followCount = 0;
			removeTrendPromo();
			removeFollowPromo();
			currentURL = newURL;
		}
	}, 200);
});

var splitURL = currentURL.split('?unsafe_link=');
if(splitURL[0] == 'https://twitter.com/safety/unsafe_link_warning'){
	window.history.replaceState({}, null, 'https://twitter.com/action/redirect');
	document.body.innerHTML = 'Redirecting you to '+splitURL[1];
	window.location.href = splitURL[1];
}else{
	removePromo();
	removeTrendPromo();
	removeFollowPromo();

	$('body').click(function() {
	   setTimeout(function(){
			newURL = window.location.href;
			if(newURL != currentURL){
				removeFollowPromo();
				removeTrendPromo();
				currentURL = newURL;
			}
		}, 200);
	});
}

function removePromo(){
		setTimeout(function(){
			if($('.css-1dbjc4n.r-j7yic.r-qklmqi.r-1adg3ll.r-1ny4l3l')[0]){
				var tweetClass = $('.css-1dbjc4n.r-j7yic.r-qklmqi.r-1adg3ll.r-1ny4l3l');
				for(var i=0; i < tweetClass.length; i++){
					if(tweetClass[i].innerHTML.indexOf('>Promoted</') !== -1){
						$(tweetClass[i]).remove();
					}					
				}
			}
		}, 200);
		setTimeout(function(){
			removePromo();
		}, 1000);
}

function removeTrendPromo(){
	if(trendCount < 10){
		setTimeout(function(){
			if($('.css-1dbjc4n.r-j7yic.r-qklmqi.r-1adg3ll.r-1ny4l3l')[0]){
				var tweetClass = $('.css-1dbjc4n.r-j7yic.r-qklmqi.r-1adg3ll.r-1ny4l3l');
				for(var i=0; i < tweetClass.length; i++){
					if(tweetClass[i].innerHTML.indexOf('>Promoted by ') !== -1){ 
						$(tweetClass[i]).remove();
					} 
					
				}
				trendCount = 0;
			}else{
				trendCount++;
				setTimeout(function(){
					removeTrendPromo();
				}, 200);				
			}
		}, 100);
	}
}

function removeFollowPromo(){
	if(followCount < 10){
		setTimeout(function(){
		if($('.css-18t94o4.css-1dbjc4n.r-j7yic.r-rull8r.r-qklmqi.r-1ny4l3l.r-1j3t67a.r-1w50u8q.r-o7ynqc.r-6416eg')[0]){
			var tweetClass = $('.css-18t94o4.css-1dbjc4n.r-j7yic.r-rull8r.r-qklmqi.r-1ny4l3l.r-1j3t67a.r-1w50u8q.r-o7ynqc.r-6416eg');
			for(var i=0; i < tweetClass.length; i++){
				if(tweetClass[i].innerHTML.indexOf('>Promoted</') !== -1){ 
					$(tweetClass[i]).remove();
				} 
					
			}
				followCount = 0;
				removeTrendPromo();
			}else{
				followCount++;
				setTimeout(function(){
					removeFollowPromo();
				}, 200);				
			}
		}, 100);
	}
}
