class BHT{
	constructor(m,n){
		this.m = m;
		this.n = n;
		this.tableSize = Math.pow(2, m);
		this.estado = new Array(this.tableSize);
		this.historico = new Array(this.tableSize);
		this.historico.fill(-1);
		(n == 1) ? this.estado.fill(1) : this.estado.fill(2);
		this.hits = new Array(this.tableSize);
		this.hits.fill(0);
		this.hitsGeral = 0;
		this.miss = new Array(this.tableSize);
		this.miss.fill(0);
		this.missGeral = 0;
        this.animationQueue = new Array(this.tableSize);
	}

	doTheThing(endereco, resultado){
		let predPos = (parseInt(endereco, 16) >>> 2) % this.tableSize;
		let predicao = this.estado[predPos];
		/*
		let allHist = "";
		for (let b = 0; b<this.tableSize; b++){
			allHist+=dec2bin(this.estado[b]);
			allHist+=' ';
		}*/
		
        let hueAux = 116;

		//preditor de 1 bit
		if(this.n == 1){
			//acertou a predicao
			if ((predicao == 0 && (resultado == "N" || resultado == 0))||(predicao == 1 && (resultado == "T" || resultado == 1))){
				this.hits[predPos]++;
                this.hitsGeral++;
			}
			//errou a predicao
			else {
				this.miss[predPos]++;
				this.missGeral++;
				(predicao == 0) ? this.estado[predPos] = 1 : this.estado[predPos] = 0;
                hueAux = 0;
			}
			(this.estado[predPos] == 0) ? this.historico[predPos] = 'N' : this.historico[predPos] = 'T';
		}
		//preditor de 2 bits
		else {
			//acertou a predicao
			if ((predicao <= 1 && (resultado == "N" || resultado == 0)) || (predicao >= 2 && (resultado == "T" || resultado == 1))){
				this.hits[predPos]++;
				this.hitsGeral++;
				if (predicao == 1){
					this.estado[predPos] = 0;
				}
				else if (predicao == 2){
					this.estado[predPos] = 3;
				}
			}
			//errou a predicao
			else {
                hueAux = 0;
				this.miss[predPos]++;
				this.missGeral++;
				if (predicao <= 1){
					this.estado[predPos]++;
				}
				else {
					this.estado[predPos]--;
				}
			}
			if(this.historico[predPos] == -1){
				(this.estado[predPos] == 1) ? this.historico[predPos] = 'N' : this.historico[predPos] = 'T';
			}
			else {
				let aux = this.historico[predPos][0];
				(this.estado[predPos] < predicao || this.estado[predPos] === 0) ? this.historico[predPos] = "N," + aux : this.historico[predPos] = "T," + aux;
			}
		}
		if (predicao == 0){
			predicao = "N";
		}
		else if ((predicao == 1 && this.n == 1) || predicao == 3){
			predicao = "T";
		}
		else if (predicao == 1){
			predicao = "N*";
		}
		else if (predicao == 2){
			predicao = "T*";
		}
		else {
			predicao = "errado";
		}
		
		let estado = this.estado[predPos];
		
		if (estado == 2){
			estado = "T*";
		}
		else if (estado == 3){
			estado = "T";
		}
		else if (estado == 0 && this.n == 1){
			estado = "N";
		}
		else if (estado == 1 && this.n == 1){
			estado = "T";
		}
		else if (estado == 0){
			estado = "N";
		}
		else if (estado == 1){
			estado = "N*";
		}
		
		(resultado == "N" || resultado == 0) ? resultado = "N" : resultado = "T";
		
		document.getElementById("myTable").rows[predPos+1].cells[1].innerHTML = endereco;
		document.getElementById("myTable").rows[predPos+1].cells[2].innerHTML = this.historico[predPos];
		document.getElementById("myTable").rows[predPos+1].cells[3].innerHTML = estado;
		document.getElementById("myTable").rows[predPos+1].cells[4].innerHTML = resultado;
		document.getElementById("myTable").rows[predPos+1].cells[5].innerHTML = predicao;
		document.getElementById("myTable").rows[predPos+1].cells[6].innerHTML = this.hits[predPos];
		document.getElementById("myTable").rows[predPos+1].cells[7].innerHTML = this.miss[predPos];
		document.getElementById("myTable").rows[predPos+1].cells[8].innerHTML = this.getPercent(predPos);
        window.clearTimeout(this.animationQueue[predPos]);
        this.animationQueue[predPos] = window.setTimeout("animar("+hueAux+", 50, "+ (predPos+1) +")",7);
		
		
	}

    getPercentGeral(){
        if ((this.missGeral + this.hitsGeral) == 0){
            return "INCALCULÁVEL";
        } else {
            return parseInt((this.hitsGeral * 100) / (this.hitsGeral + this.missGeral));
        }
    }

	getPercent(predPos){
		return parseInt(this.hits[predPos]/(this.hits[predPos] + this.miss[predPos])*100);
	}

	getHits(){
		return this.hits[this.estado[histIndex]];
	}

	getMiss(){
		return this.miss[this.estado[histIndex]];
	}
}

var fileAsString = Array();
var lineNumber = -1;
let bht;
var done = false;

function dec2bin(dec) {
	var binario = dec >= 0 ? dec.toString(2) : (~dec).toString(2);
	return ("0".repeat(this.n) + binario).substr(-this.n);
}

function fileRead(){
	let file = document.getElementById("file-id").files[0];
	let reader = new FileReader();
	reader.onload = function(){
		lineNumber = -1;
		fileAsString = this.result.split('\n');
	};
	reader.readAsText(file);
}

function computeLine(){ // não chamem isso, front!!!!!!!
	var line = fileAsString[lineNumber].split(' ');
    if (line.length == 2){
	    bht.doTheThing(line[0], line[1].charAt(0));
    } else {
        done = true;
	    let next = document.getElementById("but-next");
	    let skip = document.getElementById("but-skip");
	    next.hidden = "hidden";
	    skip.hidden = "hidden";
    }
    document.getElementById("p_texto").innerHTML = "PORCENTAGEM GERAL: " + bht.getPercentGeral() + "%";
}

function radio() {
	var rbs = document.getElementsByName('n');
	for (var i=0, iLen=rbs.length; i<iLen; i++) {
		if (rbs[i].checked) {
			return rbs[i].value;
		}
	}
}

function go(){
	//mudar os hidden;
	let menu1 = document.getElementById("menu-1");
	let menu2 = document.getElementById("menu-2");
	menu1.hidden = true;
	menu2.hidden = false;
	let table = document.getElementById("myTable");
	let m = document.getElementById("m").value;
	let n = radio();
	console.log(n);
	let m2 = 1;
	
	fileRead();
	
	bht = new BHT(m, n);
	for (let i=0; i<m; i++){
		m2*=2;
	}
	
	for (let i=0; i<m2; i++){
		let row = table.insertRow(table.length);
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		let cell3 = row.insertCell(2);
		let cell4 = row.insertCell(3);
		let cell5 = row.insertCell(4);
		let cell6 = row.insertCell(5);
		let cell7 = row.insertCell(6);
		let cell8 = row.insertCell(7);
		let cell9 = row.insertCell(8);
		
		let index = dec2bin(i).toString();
		
		while (index.length < m){
			index = "0" + index;
		}
		
		cell1.innerHTML = index;
		cell2.innerHTML = "";
		cell3.innerHTML = "";
		cell4.innerHTML = "";
		cell5.innerHTML = "";
		cell6.innerHTML = "";
		cell7.innerHTML = "";
		cell8.innerHTML = "";
		cell9.innerHTML = "";
	}
    document.getElementById("p_texto").innerHTML = "PORCENTAGEM GERAL: " + bht.getPercentGeral();
}
function goBack(){
	location.reload()
}
function skipAll(){
	while (!done) {
		updateRowInTable();
	}
}
function updateRowInTable(){
	lineNumber += 1;
	if (lineNumber >= fileAsString.length){
		done = true;
	} else {
		computeLine();
		done = false;
	}
}
function animar(hue, ilum, elementRow){
    let element = document.getElementById("myTable").rows[elementRow];
    ilum += 0.5;
    let str = 'hsl(' + hue + ',100%,' + ilum + '%)';
    element.style.backgroundColor = str;
    let otherStr = "animar("+hue+", "+ilum+", "+elementRow+")";
    if (ilum >= 90){
        element.style.backgroundColor = 'hsl('+hue+',100%,90%)';
    } else { bht.animationQueue[elementRow -1] = window.setTimeout(otherStr,5);}
}
