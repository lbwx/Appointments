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

var appointment = {
	ajaxCall: function(data) {
		$.ajax({
			url: "/appointment/" + data.action,
			type: 'POST',
			data: {param: JSON.stringify(data.data)},
			dataType: 'json',
			success: function (result) {
				if(result.status === true) {
					$('#calendar').fullCalendar('renderEvent', result.response, true);
					$('#calendar').fullCalendar('unselect');
				} else {
					alert(result.response);
				}
			},
			error: function (error) {
				alert('Ooos, something went wrong!');
				console.log(error);
			}
		});
		
	},
};

$(function (){
	$(document).on('submit', '.fos_user_registration_register', function(e){ modalForms.registrationSubmit(e);});
	$(document).on('submit', '#app-form-login', function(e){ modalForms.loginSubmit(e);});
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,today,next',
			center: 'title',
			right: 'prev,today,next'
		},
		timeFormat: 'h:mm',
		columnFormat: 'dddd D.M.Y',
		titleFormat: 'DD.MMMM YYYY',
		weekends: false,
		minTime: "08:00:00",
		maxTime: "16:00:00",
		slotDuration: '00:30:00',
		defaultTimedEventDuration: '00:30:00',
		allDaySlot: false,
		defaultView: 'agendaWeek',
		displayEventEnd: true,
		eventDurationEditable: false,
		editable: false,
		selectable: true,
		select: function(start) {
			appointment.ajaxCall({action: 'create', data: start});
			//$('#calendar').fullCalendar('renderEvent', eventData, true);
			//$('#calendar').fullCalendar('unselect');
		},
		events: [{
			title: 'Reserved',
			start: '2016-10-13T10:30:00',
			end: '2016-10-13T11:00:00',
			color: 'red'
		}]
	});
});