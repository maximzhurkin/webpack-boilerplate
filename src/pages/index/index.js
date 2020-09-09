import $ from 'jquery';
import '../../libs/passive.js';
import '../../libs/reset.styl';

import owlCarousel from 'owl.carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import Header from '../../components/header/header.js';
import './index.styl';

class Index {
	static init() {
		$('h1').html('Hello, Jony!');
		$('p').html('You number: 7');
		$('.slides').owlCarousel();
	}
}

$(document).ready(() => {
	Header.init();
	Index.init();
});