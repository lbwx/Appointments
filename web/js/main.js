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
});