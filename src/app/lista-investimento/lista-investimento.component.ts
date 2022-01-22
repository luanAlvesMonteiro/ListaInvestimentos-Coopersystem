import { Component, OnInit } from '@angular/core';
import { ListaInvestimentosService } from '../services/lista-investimentos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lista-investimento',
  templateUrl: './lista-investimento.component.html',
  styleUrls: ['./lista-investimento.component.css']
})
export class ListaInvestimentoComponent implements OnInit {

  router: Router;
  constructor(
    private listaInvestimentosService : ListaInvestimentosService,
    router: Router
  ) 
  { 
    this.router = router;  
  }

  ngOnInit(): void {
    this.getListaInvestimentos();
  }

  listaInvestimentos : any;

  getListaInvestimentos(){
    this.listaInvestimentosService.listarInvestimentos().subscribe((data: any) =>{                  
      this.listaInvestimentos = data.response.data.listaInvestimentos;
    }, error => {
      console.log(error)
    });    
  }
  
  converterMoeda(saldo: number, tipoMoeda : string )
  {    
    return this.listaInvestimentosService.converterMoeda(saldo, tipoMoeda);
  }
  
  resgatar(index : number)
  {    
    this.router.navigate(['resgate/'+index]);
  }  

}
