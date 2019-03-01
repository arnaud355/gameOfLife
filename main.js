
let declenchement = document.getElementById("declenche");

declenchement.addEventListener('click',function(){

	const canvasWidth = 900;
	const canvasHeight = 600;
	const blockSize = 10;
	const canvas = document.createElement('canvas'); //cree un nouvel element de type canvas, dans le doc d'hmtl
	const ctx = canvas.getContext('2d');//creation context
	let delay;
	const widthInBlocks = canvasWidth/blockSize;//90
	const heightInBlocks = canvasHeight/blockSize;//60
	const nbCarreMax = widthInBlocks * heightInBlocks;
	let popInitiale = 0.25 * nbCarreMax;//Je souhaite que popInitiale remplisse au moins 25% d la carte
	let generations;
	let timeOut;
	const centreX = canvasWidth / 2;
	const centreY = canvasHeight / 2;
	//tab avec 3 entrees à chaque index, le 1er pour alea, et pour x et y
	let tableauVie = [[0,0,0]];
	init();		
	function init(){
		
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		canvas.style.border = "30px solid gray";
		canvas.style.margin = "50px auto";
		/*pour centrer element et que marges marchent
		il faut un type display*/
		canvas.style.display = "block";
		/*en CSS3 on fait background-color mais
		ej JS on met une MAJ à la place du tiret*/
		canvas.style.backgroundColor = "#ddd";
		document.body.appendChild(canvas); //ajoute un noeud au canvas
		launch();
	}

	function launch(){
		generations = 0;
		clearTimeout(timeOut);
		delay = 1000;
		refreshCanvas();
	}
	function refreshCanvas(){
		if(generations === 25){
			gameOver();
		}
		else{
			afficheGenerations();
			dissemine();
			verifSurvieSupp();
			generations++;
			timeOut = setTimeout(refreshCanvas,delay,tableauVie);
		}
	}
		
	function dissemine(){
			
		let v = 0;
		let x = 0,y = 0;
		let coordX = 0,coordY = 0;
		let alea = 0;
	
		while(v < popInitiale){
			
			for(let j = 0; j < heightInBlocks; j++ ){
				for(let i = 0; i < widthInBlocks; i++ ){
					//Soit 1 ou 0
					alea = Math.round(Math.random() * (1 - 0));
					if(alea === 1){
						x = i * blockSize;//pixel
						y = j * blockSize;//pixel
						coordX = i;
						coordY = j;
						
						if(j === 0 && i === 0){//c'est donc le premier emplacement en haut à gauche
							tableauVie = [0][0] = 1;
							ctx.save();
							ctx.fillStyle = "#00a600";
						    ctx.fillRect(x,y,blockSize,blockSize);
						    ctx.restore();
						}
							//On enregistre les coordonnes où il y a de la vie
							//pour le push pas besoindes double crochet
							tableauVie.push([1,coordX,coordY]);
							//alert("x:" x ,"y:"y," coordY:"coordX," coordY:"coordY );
							ctx.save();
							ctx.fillStyle = "#00a600";
						    ctx.fillRect(x,y,blockSize,blockSize);
						    ctx.restore();
						
					}
					else{
						x = i * blockSize;//pixel
						y = j * blockSize;//pixel
						coordX = i;
						coordY = j;
						/*On enregistre tout de même les coordonnes pour la verif dans
						la fonction verif car sinon comparaison par rappport à du vide*/
						tableauVie.push([0,0,0]);
					}
				}
			}
			v++;
		}
	}
	function verifSurvieSupp(){
		let coordX = 0,coordY = 0;
		let comptagevie = 0;
		let longueur = widthInBlocks - 1;
		let hauteur = heightInBlocks - 1;
		let tableau = [[0,0]];
		for(let j = 0; j < heightInBlocks; j++ ){
			for(let i = 0; i < widthInBlocks; i++ ){
				coordX = i;//renvoie une coordonne : ex: 25
				coordY = j;
				//Si les 2 coord sont egale à des coordonnes du tab de vie c'est qu'il y a 1
				if(coordX === tableauVie[i][1] && coordY === tableauVie[j][2] ){
					/*Si coord en x - 1 est present c'est qu'il a ete enregistré en tab de vie
					et qu'il contient donc 1, sinon il n'existe pas dans tab de vie*/
					if(i === 0){
						
					}	
					else if(){
						
					}
					else if(){
						
					}
					else if(){
						
					}
					else if(){
						
					}
					else if(){
						
					}
					else{
						if(tableauVie[i - 1][1] === coordX - 1){
							comptagevie += 1;
						}
						if((tableauVie[i - 1][1] === coordX - 1) && (tableauVie[j - 1][2] === coordY - 1)){
							comptagevie += 1;
						}
						if(tableauVie[j - 1][2] === coordY - 1){
							comptagevie += 1;
						}
						if((tableauVie[i + 1][1] === coordX + 1) && (tableauVie[j - 1][2] === coordY - 1)){
							comptagevie += 1;
						}
						if(tableauVie[i + 1][1] === coordX + 1){
							comptagevie += 1;
						}
						if((tableauVie[i + 1][1] === coordX + 1) && (tableauVie[j + 1][2] === coordY + 1)){
							comptagevie += 1;
						}
						if(tableauVie[j + 1][2] === coordY + 1){
							comptagevie += 1;
						}
						if((tableauVie[i - 1][1] === coordX - 1) && (tableauVie[j + 1][2] === coordY + 1)){
							comptagevie += 1;
						}
						if(comptagevie === 3 || comptagevie === 2){
							ctx.save();
							//ctx.fillStyle = "#00a600";
							ctx.fillStyle = "#40caee";
							ctx.fillRect(x,y,blockSize,blockSize);
							ctx.restore();
						}
						else{
							ctx.save();
							tableauVie[i][0] = 0;
							//effacer le rect 
							ctx.clearRect(coordX,coordY,blockSize,blockSize);
							//efface l'indice du tableauVie et réorganise le tableauVie
							tableauVie.splice(i,1);	
							ctx.restore();
						}
					}
				}
			}
		}
	}
	
	function gameOver(){
		ctx.save();
		ctx.font = "bold 70px sans-serif";
		ctx.fillStyle = "#000";
		ctx.textAlign = "center";
		ctx.textbaseline = "middle"; //affichage par rapport au milieu
		ctx.strokeStyle = "white";
		ctx.lineWidth = 5;
		ctx.strokeText("Game Over",centreX,centreY - 180);
		ctx.fillText("Game Over",centreX,centreY - 180);
		ctx.font = "bold 30px sans-serif";
		ctx.strokeText("Apuyer sur la touche Espace pour rejouer",centreX,centreY - 120);
		ctx.fillText("Apuyer sur la touche Espace pour rejouer",centreX,centreY - 120);
		ctx.restore();
	}
		
	function afficheGenerations(){
		ctx.save();
		ctx.font = "bold 200px sans-serif";
		ctx.fillStyle = "gray";
		ctx.textAlign = "center";
		ctx.textbaseline = "middle"; //affichage par rapport au milieu
		ctx.fillText(generations.toString(),centreX,centreY);
		
		ctx.font = "bold 70px sans-serif";
		ctx.strokeText("Generation: ",centreX,centreY - 180);
		ctx.fillText("Generation: ",centreX,centreY - 180);
		ctx.restore();
	}
	
	document.onkeydown = function handlekeyDown(e){
		const key = e.keyCode;
		switch(key)
		{
			case 32 :
				launch();
				return
			default:
				return;
		}

	}
},false);
