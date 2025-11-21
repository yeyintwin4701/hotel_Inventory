import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsComponent } from './rooms.component';
import { ConfigService } from '../services/config.service';
import { RoomsService } from './services/rooms.service';
import { HttpClientModule } from '@angular/common/http';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { appendFile } from 'fs';
import { RouteConfigToken } from '../services/routeConfig.service';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [RoomsComponent],
      providers: [
        RoomsService,
        ConfigService,
        {
          provide: APP_SERVICE_CONFIG,
          useValue: { apiEndpoint: 'https://localhost:3000' },
        },
          {
          provide: RouteConfigToken,
          useValue: { title: 'rooms' },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
