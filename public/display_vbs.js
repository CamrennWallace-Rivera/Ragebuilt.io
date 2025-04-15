console.log("Hello world.");

async function display_VBs(){
	try{
		const response = await fetch('completed_builds');
		if(!response.ok){
			throw ner Error("error");
		}
		const data = await response.json();
		console.log(data);
	}
	catch(error){
		console.error("error" + error);
	}
}
