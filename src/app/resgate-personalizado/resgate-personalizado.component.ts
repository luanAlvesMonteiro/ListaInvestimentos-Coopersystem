import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaInvestimentosService } from '../services/lista-investimentos.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resgate-personalizado',
  templateUrl: './resgate-personalizado.component.html',
  styleUrls: ['./resgate-personalizado.component.css']
})
export class ResgatePersonalizadoComponent implements OnInit {

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private listaInvestimentosService : ListaInvestimentosService
  ) {
    this.route.params.subscribe(                    
      params => {
        this.indexInvestimento = params.index
      }
    );    
  }

  indexInvestimento : any;
  modal : boolean = true;
  ngOnInit(): void {
    this.getListaInvestimentos();
  }

  investimento = {
    indicadorCarencia: "",
    nome: "",
    objetivo: "",
    saldoTotal: 0.0     
  }

  
  acoes: any;
  getListaInvestimentos(){
    this.listaInvestimentosService.listarInvestimentos().subscribe((data: any) =>{                   
      if( data.response.data.listaInvestimentos[this.indexInvestimento].acoes.length > 0 )
      {
        this.investimento = data.response.data.listaInvestimentos[this.indexInvestimento];
        this.acoes = data.response.data.listaInvestimentos[this.indexInvestimento].acoes;      
        for(var prop in this.acoes)
        {
          this.acoes[prop].valorResgate = null;
          this.acoes[prop].valid = false;
          this.acoes[prop].saldoAcumuladoDecimal = this.verificarSaldoAcumulado(this.acoes[prop].percentual);
          this.acoes[prop].saldoAcumulado = this.converterMoeda(this.verificarSaldoAcumulado(this.acoes[prop].percentual), 'real');
        }
      }      
    }, error => {
      console.log(error)
    });    
  }

  converterMoeda(saldo: number, tipoMoeda : string )
  {
    return this.listaInvestimentosService.converterMoeda(saldo, tipoMoeda);
  }
  
  verificarSaldoAcumulado(valor:number)
  {    
    let valorAcumulado = 0;
    valorAcumulado = (valor / 100) * this.investimento.saldoTotal;    
    return valorAcumulado;
  }
  valorTotalRestage : any = 0;
  somarValorResgate(event : any)
  {    
    this.valorTotalRestage = 0;
    setTimeout(()=>{
      for(var prop in this.acoes)
      {
        if(this.acoes[prop].valorResgate !== null)
        {
          this.valorTotalRestage = this.valorTotalRestage + parseFloat(this.acoes[prop].valorResgate);
        }        
      }
    })
  }
  msgInvalido = false;  
  verificarValores(dados : any)
  {    
    this.msgInvalido = false;
    var i=0;    
    for(var prop in dados)
    {
      if( (this.acoes[prop].valorResgate == null) || (this.acoes[prop].valorResgate == 0) )
      {        
        i++;
      } 
      else
      {
        if( this.acoes[prop].valorResgate > this.acoes[prop].saldoAcumuladoDecimal ) 
        {
          this.msgInvalido = true;        
          this.acoes[prop].valid = false;        
        }
        else
        {        
          this.acoes[prop].valid = true;
        }  
      }           
    
    }
    if(i < this.acoes.length)
    {
      this.modal = false;
    }    
  }

  fecharModal(tipoRetorno: string)
  {    
    this.modal = true;
    if(tipoRetorno == 'novo')
    {
      this.router.navigate(['home']);
    }    
  }

}
