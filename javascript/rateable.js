(function($){
	$(function(){

		var rateables = $('.rateable-ui');

		rateables.each(function(){
			var self = $(this);
			var numratings = self.data('votes');
			
			self.raty({
				readOnly 	: self.hasClass('disabled'),
				score 		: self.data('averagescore'),
				path 		: 'rateable/images/'
			});

			function NumRatings() {
				if(numratings == 1) return numratings + ' vote';
				else return numratings + ' votes';
			}
				
			function ShowMessage(message) {
				var oldhtml = NumRatings();
				
				$('#raty-message').fadeOut(500, function() {
				    $('#raty-message').html(message).fadeIn();
				    $('#raty-message').delay(2000);
				    $('#raty-message').fadeIn(500, function() { $('#raty-message').html(oldhtml);  });
				});	
			}    
			
			function ShowRating() {
				$('#raty-message').html(NumRatings());
			}
			
			$('#raty-message').html(NumRatings());
						

			self.find('img').not('.raty-cancel').click(function(){
				var img = $(this);
				var score = img.attr('alt');

				if(self.hasClass('disabled')){
					ShowMessage("You have already rated this item");
					return;	
				} 

				$.getJSON(self.data('ratepath') + '?score=' + score, function(data) {
					if(data.status == 'error'){
						ShowMessage(data.message);
						return;
					}

					self.raty('set', {
						'readOnly' : true,
						'score' : data.averagescore
					});

					self.addClass('disabled');
					ShowMessage(data.message);
				});
			});
		});

	});
})(jQuery);
