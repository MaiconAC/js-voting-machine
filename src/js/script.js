let seuVotoPara = document.querySelector('.div1_Voto span');
let cargo = document.querySelector('.div1_Cargo span');
let descricao = document.querySelector('.div1_Descricao');
let aviso = document.querySelector('.div2');
let lateral = document.querySelector('.divRight');
let numeros = document.querySelector('.div1_Numeros');

let etapaAtual = 0;
let numero = ''; 
let votoEmBranco = false;
let votoNulo = false;
let votos = []; 

function comecarEtapa(){ 
    let etapa = etapas[etapaAtual];
    let numeroHtml = ''; 
    numero = '';
    votoEmBranco = false;

    for (let i=0; i < etapa.numeros; i++) {
        if(i === 0){ 
            numeroHtml += '<div class="numero pisca"></div>';   
        } else{
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];  
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    
    if(candidato.length > 0){
        candidato = candidato[0]; 
        descricao.innerHTML = `Nome: ${candidato.nome} <br>Partido: ${candidato.partido}<br>`;
        if(candidato.vice !== undefined){ 
            descricao.innerHTML += `Vice: ${candidato.vice}`;    
        }
        
        let fotosHtml = ''; 
        for (const i in candidato.fotos) {
            if(candidato.fotos[i].small){ 
                fotosHtml += `<div class="div_image small"><img src="src/img/${candidato.fotos[i].url}" alt="Foto vice">${candidato.fotos[i].legenda}</div>`;    
            } else { 
                fotosHtml += `<div class="div_image"><img src="src/img/${candidato.fotos[i].url}" alt="Foto candidato">${candidato.fotos[i].legenda}</div>`;    
            }
        }
        lateral.innerHTML = fotosHtml;

    } else { 
        descricao.innerHTML = '<div class="avisoGrande pisca"><br>VOTO NULO</div>';
        votoNulo = true;
    }
}

function clicou(n){ 
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        } else{
            atualizaInterface();
        }
    }    
}

function branco(){
    if(numero === ''){
        votoEmBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        lateral.innerHTML = ''
        descricao.innerHTML = '<div class="avisoGrande pisca">VOTO EM BRANCO</div>';            
    } else{
        alert('Para votar em BRANCO \no campo de voto deve estar vazio.\n'+ 
            'Aperte CORRIGIR para apagar o campo de voto.');
    }
}

function corrige(){
    comecarEtapa();
}

function confirma(){
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;
    
    if(votoEmBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: "branco",
        })
    } else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        if (votoNulo = true){
            votos.push({
                etapa: etapas[etapaAtual].titulo,
                voto: "nulo",
            })
        } else {
            votos.push({
                etapa: etapas[etapaAtual].titulo,
                voto: numero,
            });
        }
    }
    
    if(votoConfirmado === true){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){ 
            comecarEtapa();
        } else{
            document.querySelector('.tela').innerHTML = '<div class="avisoGigante pisca">FIM</div>';  
            console.log(votos)  
        }
    }
}

comecarEtapa();