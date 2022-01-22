import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaInvestimentosService {

  private url : string;
  constructor(private http: HttpClient) { 
    this.url = `https://run.mocky.io/v3/ca4ec77d-b941-4477-8a7f-95d4daf7a653`;
  }  

  listarInvestimentos(): Observable<any> {
    return this.http.get<any>(this.url).pipe(map((data:any)=>data))
  }

  converterMoeda(saldo: number, tipoMoeda : string )
  {
    let valor;
    switch (tipoMoeda) 
    {
      case 'real':
        valor = saldo.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
      break;
    }
    return valor;    
  }
}
