import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section>
      <img src="img/not-found-megusta.png" alt="" width="200" />
      <h1>404 Not Found</h1>
      <p>The page you requested has not been found.</p>
      <a class="ws-btn" routerLink="/">Home</a>
    </section>
  `,
  styles: `
    section {
      max-width: 22rem;
      margin: 0 auto;
      padding: 4rem 1rem;
      text-align: center;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {}
