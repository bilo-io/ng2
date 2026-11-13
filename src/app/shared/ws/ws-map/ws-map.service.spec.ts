import { TestBed } from '@angular/core/testing';
import { Point } from '../../geojson';
import type { WsMapCameraCommand } from './ws-map.models';
import { WsMapService } from './ws-map.service';

describe('WsMapService', () => {
  let service: WsMapService;
  beforeEach(() => (service = TestBed.inject(WsMapService)));

  it('holds what the map draws', () => {
    const point = new Point([28.18, -25.95]);
    service.showPoints([{ name: 'Midrand', point, color: '#00adee' }]);
    expect(service.points()).toHaveLength(1);
    service.clearPoints();
    expect(service.points()).toEqual([]);
  });

  it('sends camera moves, but not an empty fitBounds', () => {
    const commands: WsMapCameraCommand[] = [];
    service.camera$.subscribe((c) => commands.push(c));
    service.fitBounds([]);
    service.panTo(new Point([18.4, -33.96]), 12);
    expect(commands).toHaveLength(1);
    expect(commands[0]).toMatchObject({ kind: 'panTo', zoom: 12 });
  });

  it('remembers and broadcasts the last click', () => {
    const clicks: Point[] = [];
    service.clicked$.subscribe((p) => clicks.push(p));
    const point = new Point([1, 2]);
    service.emitClick(point);
    expect(service.lastClicked()).toBe(point);
    expect(clicks).toEqual([point]);
  });
});
