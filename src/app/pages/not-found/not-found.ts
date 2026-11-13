import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MnButton } from '../../shared/midnite/mn-button';
import { MnCard } from '../../shared/midnite/mn-card';
import { MnIcon } from '../../shared/midnite/mn-icon';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, MnButton, MnCard, MnIcon],
  template: `
    <div
      class="mn-ambient grid min-h-[calc(100dvh-var(--ws-navbar-height))] place-items-center px-4 py-12"
    >
      <section mnCard class="w-full max-w-sm p-8 text-center">
        <img
          class="mx-auto h-auto max-w-[10rem] rounded-md"
          src="img/not-found-megusta.png"
          alt=""
          width="200"
        />
        <p class="mn-eyebrow mt-6">Error 404</p>
        <h1 class="mt-1 text-2xl font-bold tracking-tight">Not found</h1>
        <p class="mt-2 text-sm text-muted-foreground">The page you requested has not been found.</p>
        <a mnButton class="mt-6" routerLink="/">
          <mn-icon name="arrow-right" class="rotate-180" />
          Home
        </a>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {}
