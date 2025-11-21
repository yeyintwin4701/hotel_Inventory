import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { RouteConfigToken } from './routeConfig.service';
import { RouteConfig } from './routeConfig';

@Injectable({
  providedIn: 'any'
})
export class ConfigService {

  constructor(@Inject(RouteConfigToken) private configToken: RouteConfig) {
    console.log("ConfigService Initialized");
    console.log(this.configToken); 
   }
}
