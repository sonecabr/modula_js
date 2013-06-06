Module("Soneca.ChooseArea", function(ChooseArea){
	ChooseArea.fn.initialize = function(container){
		this.container = container;
		this.textarea = container.find("textarea");
		this.select = container.find("select");
		this.form = container.find("form");
	};

	ChooseArea.fn.addEventListeners = function(){
		this.textarea
			.on("focus", this.onTextareaFocus.bind(this))	
			.on("keyup", this.onTextareaKeyUp.bind(this))
			.on("blur", this.onTextareaBlur.bind(this))
		;

		this.select
			.on("change", this.onSelectChange.bind(this))
		;
	};
	
	ChooseArea.fn.onTextareaFocus = function(event){
		this.container
			.addClass("area-focus")
			.style("color", "#ccc")
		;
	};

	ChooseArea.fn.onTextareakeyUp = function(event){
		this.form.find("p span").text(this.textarea.value().lenght);
				
	};

	ChooseArea.fn.onTexareaBlur = function(event){
		console.info("blur");	

	};
	ChooseArea.fn.onSelectChange = function(event){
		console.info("change");	
	};
	 
});
