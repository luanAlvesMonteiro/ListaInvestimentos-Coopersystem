import { TestBed } from '@angular/core/testing';

import { ListaInvestimentosService } from './lista-investimentos.service';

describe('ListaInvestimentosService', () => {
  let service: ListaInvestimentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaInvestimentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
