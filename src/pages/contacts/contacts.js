import $ from 'jquery';
import '../../libs/passive.js';
import '../../libs/reset.styl';

import inputmask from 'inputmask/dist/jquery.inputmask.js';
import validate from 'jquery-validation';
import Header from '../../components/header/header.js';
import './contacts.styl';

class Contacts {
	static init() {
		$('input[type=tel]').inputmask('mask', {
			'mask': '+7(999)999-9999',
			'showMaskOnHover': false
		});
		$('form[name=contacts-from]').validate({
			rules: {
				person: {
					required: true
				},
				tel: {
					required: true
				}
			},
			submitHandler: function (form) {
				form.submit();
			}
		});
	}
}

$(() => {
	Header.init();
	Contacts.init();
});