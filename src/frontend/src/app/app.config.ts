import {IAppConfig} from './models/i-app-config';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AppConfig {
  public static config: IAppConfig;

  constructor(
    private http: HttpClient,
  ) {
  }

  load(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get<IAppConfig>('/settings').subscribe((config) => {
        AppConfig.config = config;
        resolve();
      }, (response: any) => {
        reject(`Could not get /settings: ${JSON.stringify(response)}`);
      });
    });
  }
}
