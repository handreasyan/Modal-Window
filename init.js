let fruits = [
	{id:1,title:"Pomegranate ",price:20,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRimu6owTdKvb1x2CWXZAJ8aVomzf_O7Tq2vw&usqp=CAU"},
	{id:2,title:"Banana",price:30,img:"https://static.vecteezy.com/system/resources/previews/001/208/675/original/banana-png.png"},
	{id:3,title:"Mango",price:40,img:"https://pngimg.com/uploads/mango/mango_PNG9168.png"},
	undefined
]

const modal = modalFunc({
	title:"Item price",
	closeable:true,
	width:"400px",
	buttons:[
		{text:"OK",className:"normal",handler(){
			modal.close();
		}}
	]
});

const confirm = function(options){
	return new Promise((resolve,reject) => {
		const confirmModal = modalFunc({
			title:options.title,
			closeable:false,
			width:"400px",
			content:options.content,
			onClose(){
				confirmModal.destroy()
			},
			buttons:[
				{text:"Delete",className:"danger",handler(){
					confirmModal.close();
					resolve();
				}},
				{text:"Chancel",className:"normal",handler(){
					confirmModal.close();
					reject();
				}},
			]
		})
		setTimeout( () => confirmModal.open(),100);
	})
};

function render(fruit){	
	if(fruit === undefined){
		return ;
	}
	const item = document.createElement("div")
	item.classList.add("item");
	item.setAttribute("id","fruit"+fruit.id);
	item.innerHTML = `
		<div class="item_img">
			<img src="${fruit.img}">
		</div>
		<p class="item_title">${fruit.title}</p>
		<div class="item_buttons">
			<button class="normal" data-btn="forPrice" data-btn-id="${fruit.id}">Show</button>
			<button class="danger" data-btn="forRemove" data-btn-id="${fruit.id}">Delete</button>
		</div>
	`
	document.body.append(item);

}

fruits.forEach( function(element) {
	render(element);
});

document.addEventListener("click",(event) => {
	let id = +event.target.dataset.btnId;
	let itemOfArr = fruits.find((f) => f !== undefined && f.id === id)
	if(event.target.dataset.btn === "forPrice"){
		modal.open();
		modal.setContent(`<p>Price of ${itemOfArr.title} ,is a <strong> ${itemOfArr.price} $ </strong></p>`);
	} else if(event.target.dataset.btn === "forRemove"){
		confirm({
			title:"Are you sure ?",
			content:`<p>You are want delete ${itemOfArr.title}</p>`
		}).then(()=>{
			fruits.id = undefined
			const deletedItem  = document.getElementById("fruit" + id);
			deletedItem.remove()
		}).catch(() =>{
			console.log("Chanceled");
		})

		
	}
})

