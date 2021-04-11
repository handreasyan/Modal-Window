function footerCreator(buttons = []){
	const futer = document.createElement("div");
	if(buttons.length === 0 ) {
		return futer;
	}

	buttons.forEach( (but) => {
		const $but = document.createElement("button");
		$but.classList.add(but.className);
		$but.textContent = but.text;
		$but.onclick = but.handler || function(){};
		futer.appendChild($but)
		
	});
	
	futer.classList.add("modal_foot");
	return futer

}
function ModalWindCreate(options){
	const modalDiv = document.createElement("div");
	modalDiv.classList.add("modal");
	modalDiv.insertAdjacentHTML("afterbegin",`
		<div class="modal_bg" data-close="true">
			<div class="modal_wind" style = 'width:${options.width || `600px`};'>
				<div class="modal_head">
					<h2>${options.title || "Window"}</h2>
					${options.closeable ? `<span data-close="true">&times;</span>` : "" }
				</div>
				<div class="modal_body" id="modal_content" data-content>
					${options.content || " "}
				</div>
				
			</div>
		</div>
	`)

	const futer = footerCreator(options.buttons);
	modalDiv.querySelector("#modal_content").after(futer);

	document.body.appendChild(modalDiv)
	return modalDiv;
}





function modalFunc(options){
	let modalNode = ModalWindCreate(options);

	let closing = false;
	const closingTime = 200;
	let destroyed = false;

	let modalMethods = {
		open() {
			if(!destroyed && !closing){
				modalNode.classList.add("open");
			}

		},
		close() {
			closing = true;
			modalNode.classList.remove("open");
			setTimeout(() => {
				closing = false;
				if(typeof options.onClose === "function"){
					options.onClose();
				}
			}, closingTime);
		},
		destroy() {
			modalNode.removeEventListener("click",listener);
			modalNode.parentNode.removeChild(modalNode); 
			destroyed = false;
		},
		setContent (html) {
			const modalBody = modalNode.querySelector(".modal_body");
			modalBody.innerHTML = html;
		}
	}

	const listener = (event) => {
		if(event.target.dataset.close === "true"){
			modal.close()
		} 
	}
	modalNode.addEventListener("click",listener);

	return modalMethods;
	
}


	