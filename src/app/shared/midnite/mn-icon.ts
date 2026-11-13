import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * The Lucide icons the app uses (midnite-ui draws its icons with lucide-react).
 * Path data from lucide v1.70.0, ISC licence (https://lucide.dev/license);
 * circles and lines are written as paths so one element type renders them all.
 */
const ICONS = {
  'arrow-right': ['M5 12h14', 'm12 5 7 7-7 7'],
  box: [
    'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z',
    'm3.3 7 8.7 5 8.7-5',
    'M12 22V12',
  ],
  check: ['M20 6 9 17l-5-5'],
  'chevron-down': ['m6 9 6 6 6-6'],
  'circle-check': ['M2 12a10 10 0 1 0 20 0a10 10 0 1 0-20 0', 'm16 9-5.5 5.5L8 12'],
  'circle-x': ['M2 12a10 10 0 1 0 20 0a10 10 0 1 0-20 0', 'm15 9-6 6', 'm9 9 6 6'],
  crosshair: [
    'M2 12a10 10 0 1 0 20 0a10 10 0 1 0-20 0',
    'M22 12h-4',
    'M6 12H2',
    'M12 6V2',
    'M12 22v-4',
  ],
  info: ['M2 12a10 10 0 1 0 20 0a10 10 0 1 0-20 0', 'M12 16v-4', 'M12 8h.01'],
  laptop: [
    'M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z',
    'M20.054 15.987H3.946',
  ],
  layers: [
    'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z',
    'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12',
    'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17',
  ],
  map: [
    'M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z',
    'M15 5.764v15',
    'M9 3.236v15',
  ],
  menu: ['M4 5h16', 'M4 12h16', 'M4 19h16'],
  moon: [
    'M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401',
  ],
  mountain: ['m8 3 4 8 5-5 5 15H2L8 3z'],
  search: ['m21 21-4.34-4.34', 'M3 11a8 8 0 1 0 16 0a8 8 0 1 0-16 0'],
  sun: [
    'M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0',
    'M12 2v2',
    'M12 20v2',
    'm4.93 4.93 1.41 1.41',
    'm17.66 17.66 1.41 1.41',
    'M2 12h2',
    'M20 12h2',
    'm6.34 17.66-1.41 1.41',
    'm19.07 4.93-1.41 1.41',
  ],
  'triangle-alert': [
    'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3',
    'M12 9v4',
    'M12 17h.01',
  ],
  x: ['M18 6 6 18', 'm6 6 12 12'],
} satisfies Record<string, string[]>;

export type MnIconName = keyof typeof ICONS;
export const MN_ICON_NAMES = Object.keys(ICONS) as MnIconName[];

const SIZES = { sm: 'h-3.5 w-3.5', md: 'h-4 w-4', lg: 'h-5 w-5' } as const;

/** A decorative Lucide icon, drawn in `currentColor`; 16px (`md`) as in midnite-ui. */
@Component({
  selector: 'mn-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @for (d of paths(); track $index) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
  host: {
    class: 'inline-flex shrink-0',
    '[class]': 'sizeClass()',
    '[attr.data-icon]': 'name()',
  },
  styles: `
    svg {
      width: 100%;
      height: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MnIcon {
  readonly name = input.required<MnIconName>();
  readonly size = input<keyof typeof SIZES>('md');
  protected readonly sizeClass = computed(() => SIZES[this.size()]);
  protected readonly paths = computed(() => ICONS[this.name()]);
}
