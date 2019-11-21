var reacty = (function(window, undefined){
	function render(App, elem){
		const appInstance = new App();
		if(appInstance.state){
			appInstance.state = getWatchedState(appInstance.state, () => {
				const newVDOM = expandVDOM(appInstance.render());
				appInstance._dom = applyDOMChanges(newVDOM, appInstance._vdom, appInstance._dom);
				appInstance._vdom = newVDOM;
			});
		}
		appInstance._vdom = expandVDOM(appInstance.render());
		appInstance._dom = convertVDOMtoDOM(appInstance._vdom);
		[...elem.childNodes].forEach(node => elem.removeChild(node));
		elem.appendChild(appInstance._dom);

		if(appInstance.componentDidMount){
			appInstance.componentDidMount(appInstance._dom);
		}
	}

	function expandVDOM(root){
		// не клонируем root, чтобы сравнивать
		if(root.children){
			root.children = root.children.map(expandVDOM);
		}

		if(typeof root.elem !== 'string'){
			return root.elem.render(root);
		} else {
			return root;
		}
	}

	function convertVDOMtoDOM(vdom){}

	function getWatchedState(stateData, callback){
		;// must debounce the callback
	}

	function applyDOMChanges(oldVDOM, newVDOM, dom){
		;
	}

	return render;
})(window);
