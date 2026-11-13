import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { UiThemeService } from '../../core/ui-theme.service';
import { MnButton } from '../../shared/midnite/mn-button';
import { MnCard } from '../../shared/midnite/mn-card';
import { overlayColor } from '../../shared/midnite/token-color';
import type { WsItem } from '../../shared/ws/ws-item';
import { WsAutocomplete } from '../../shared/ws/ws-autocomplete/ws-autocomplete';
import { WsInput } from '../../shared/ws/ws-input/ws-input';
import { WsList } from '../../shared/ws/ws-list/ws-list';
import { WsLoader } from '../../shared/ws/ws-loader/ws-loader';
import { resolveMapTheme } from '../../shared/ws/ws-map/map-themes';
import { WsMap } from '../../shared/ws/ws-map/ws-map';
import { WsMapService } from '../../shared/ws/ws-map/ws-map.service';
import { WsModalService } from '../../shared/ws/ws-modal/ws-modal.service';
import { WsPointPicker, type WsPoint } from '../../shared/ws/ws-point/ws-point';
import { WsSelect } from '../../shared/ws/ws-select/ws-select';
import { WsTabs } from '../../shared/ws/ws-tabs/ws-tabs';
import { WsToastService } from '../../shared/ws/ws-toast/ws-toast.service';
import { WsToggle } from '../../shared/ws/ws-toggle/ws-toggle';

type Demo =
  | 'overview'
  | 'autocomplete'
  | 'card'
  | 'input'
  | 'loader'
  | 'modal'
  | 'select'
  | 'tabs'
  | 'toast'
  | 'toggle';

const GODS: [string, string][] = [
  ['Ares', 'Mars'],
  ['Athena', 'Minerva'],
  ['Artemis', 'Diana'],
  ['Apollo', 'Apollo'],
  ['Aphrodite', 'Venus'],
  ['Demeter', 'Ceres'],
  ['Dionysus', 'Bacchus'],
  ['Hades', 'Pluto'],
  ['Hera', 'Juno'],
  ['Hermes', 'Mercury'],
  ['Hephaestus', 'Vulcan'],
  ['Poseidon', 'Neptune'],
  ['Nike', 'Victoria'],
  ['Tyche', 'Fortuna'],
  ['Zeus', 'Jupiter'],
];

/** A live catalogue of the ws components. */
@Component({
  selector: 'app-ws-demo',
  imports: [
    MnButton,
    MnCard,
    WsAutocomplete,
    WsInput,
    WsList,
    WsLoader,
    WsMap,
    WsPointPicker,
    WsSelect,
    WsTabs,
    WsToggle,
  ],
  templateUrl: './ws-demo.html',
  styleUrl: './ws-demo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WsDemo {
  protected readonly toaster = inject(WsToastService);
  private readonly modal = inject(WsModalService);
  private readonly map = inject(WsMapService);
  private readonly ui = inject(UiThemeService);

  protected readonly demos: WsItem<Demo>[] = [
    { name: 'Overview', value: 'overview' },
    { name: 'Autocomplete', value: 'autocomplete' },
    { name: 'Card', value: 'card' },
    { name: 'Input', value: 'input' },
    { name: 'Loader', value: 'loader' },
    { name: 'Modal', value: 'modal' },
    { name: 'Select', value: 'select' },
    { name: 'Tabs', value: 'tabs' },
    { name: 'Toast', value: 'toast' },
    { name: 'Toggle', value: 'toggle' },
  ];
  protected readonly demo = signal<Demo[]>(['overview']);

  protected readonly gods: WsItem[] = GODS.map(([greek, roman]) => ({ name: greek, value: roman }));
  protected readonly picked = signal('');
  protected readonly selectItems: WsItem[] = [1, 2, 3, 4, 5].map((n) => ({
    name: `Name${n}`,
    value: `Value${n}`,
  }));
  protected readonly single = signal<string[]>([]);
  protected readonly multiple = signal<string[]>([]);
  protected readonly text = signal('textModelValue');
  protected readonly number = signal('12345');
  protected readonly tabs: WsItem<number>[] = [
    { name: 'Tab1', value: 0 },
    { name: 'Tab2', value: 1 },
    { name: 'Tab3', value: 2 },
  ];
  protected readonly tab = signal(0);
  protected readonly switchOn = signal(true);
  protected readonly modalResult = signal('');
  protected readonly mapTheme = computed(() => resolveMapTheme('auto', this.ui.scheme()));

  constructor() {
    effect(() => {
      this.ui.scheme();
      untracked(() => this.map.recolour(overlayColor()));
    });
  }

  protected showPoint(place: WsPoint): void {
    this.map.showPoints([{ name: place.name, point: place.point, color: overlayColor() }]);
    this.map.panTo(place.point, 13);
  }

  protected async openModal(confirm: boolean): Promise<void> {
    const confirmed = await this.modal.show({
      title: confirm ? 'Choice modal' : 'Dismiss modal',
      message: 'This is the message of the test modal.',
      dismissButton: confirm ? 'Cancel' : 'Ok',
      confirmButton: confirm ? 'Ok' : undefined,
    });
    this.modalResult.set(confirmed ? 'Confirmed' : 'Dismissed');
  }
}
