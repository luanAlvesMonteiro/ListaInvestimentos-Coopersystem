import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInvestimentoComponent } from './lista-investimento.component';

describe('ListaInvestimentoComponent', () => {
  let component: ListaInvestimentoComponent;
  let fixture: ComponentFixture<ListaInvestimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaInvestimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaInvestimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
