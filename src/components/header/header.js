import './header.css';
import '../../images/logo.svg';

class header {
	static bindings() {
		$('[data-action=show-main-menu]').on('click', (e) => {
			alert('click menu!');
		})
	}
	static init() {
		this.bindings();
	}
}

export default header;