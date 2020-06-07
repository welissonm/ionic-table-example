import { UsuarioServiceService } from './usuario-service.service';
import { TestBed } from '@angular/core/testing';


describe('UsuarioServiceService', () => {
  let service: UsuarioServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
