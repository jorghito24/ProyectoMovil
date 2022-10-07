import { TestBed } from '@angular/core/testing';

import { SqliteServerService } from './sqlite-server.service';

describe('SqliteServerService', () => {
  let service: SqliteServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqliteServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
