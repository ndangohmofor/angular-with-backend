import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const request = req.clone({
    headers: req.headers.set('X-DEBUG', 'TESTING'),
  });
  console.log('[Outgoing Request: ]', req);
  return next(request);
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
}).catch((err) => console.error(err));
