var modalForms = {
	login: function() {
		$('#app-modal-window .modal-title').html('Login');
		this.openForm('login');
		$('#app-modal-window').modal('show');
	},
	register: function() {
		$('#app-modal-window .modal-title').html('Registration');
		this.openForm('registration');
		$('#app-modal-window').modal('show');
	},
	openForm: function(type) {
		switch(type){
			case 'login': this.ajaxLoad('/login'); break;
			case 'registration': this.ajaxLoad('/register'); break;
		}
	},
	ajaxLoad: function(action, params) {
		$.ajax({
			url: action,
			type: 'POST',
			data: params,
			success: function (data) {
				$('#app-modal-window .modal-body').html(data);
			}
		});
	},
	loginSubmit: function(e) {
		e.preventDefault();
		console.log('loginForm submitted');
		this.ajaxLoad('/login_check', $('#app-form-login').serialize());
	},
	registrationSubmit: function(e) {
		e.preventDefault();
		this.ajaxLoad('/register/', $('.fos_user_registration_register').serialize());
		console.log($('.fos_user_registration_register').serialize());
	}
};

$(function (){
	$(document).on('submit', '.fos_user_registration_register', function(e){ modalForms.registrationSubmit(e);});
	$(document).on('submit', '#app-form-login', function(e){ modalForms.loginSubmit(e);});
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
	var day = new Date().getDate();
	var eventData = {
		events : [
			{'id':1, 'start': new Date(year, month, day, 12), 'end': new Date(year, month, day, 12, 15),'title':'Lunch with Mike'}
		]
	};
	$('#calendar').weekCalendar({
		preventDragOnEventCreation: true,
		title: '%start%',
		timeslotsPerHour: 4,
		hourLine: false,
		data: eventData,
		defaultEventLength: 1,
		alwaysDisplayTimeMinutes: false,
		daysToShow: 5,
		use24Hour: false,
		dateFormat: 'M d, Y',
		newEventText: 'Reserved',
		minDate: new Date(year, month, day+1),
		maxDate: new Date(year, month+1, day),
		draggable: function(calEvent, element) {
		  return true;
		},
		resizable: function(calEvent, element) {
		  return false;
		},
		businessHours: {start: 8, end: 16, limitDisplay: true},
		height: function($calendar) {
		  return $(window).height() - $('h1').outerHeight(true);
		},
		eventRender : function(calEvent, $event) {
		  if (calEvent.end.getTime() < new Date().getTime()) {
			$event.css('backgroundColor', '#aaa');
			$event.find('.time').css({'backgroundColor': '#ccc', 'border':'1px solid #888'});
		  }
		},
		eventNew: function(calEvent, $event) { displayMessage('<strong>Added event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end); },
		eventDrop: function(calEvent, $event) { displayMessage('<strong>Moved Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end); },
		eventResize: function(calEvent, $event) { displayMessage('<strong>Resized Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end); },
		eventClick: function(calEvent, $event) { displayMessage('<strong>Clicked Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end); },
		eventMouseover: function(calEvent, $event) { displayMessage('<strong>Mouseover Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end); },
		eventMouseout: function(calEvent, $event) { displayMessage('<strong>Mouseout Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end); },
		noEvents: function() { displayMessage('There are no events for this week'); }
	});
});