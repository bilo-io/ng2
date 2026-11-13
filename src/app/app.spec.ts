import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the navbar with the three sections', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('.title')?.textContent).toContain('ng2');
    const links = [...root.querySelectorAll('nav.links a')].map((a) => a.textContent?.trim());
    expect(links).toEqual(['Home', 'Map', 'Ws components']);
  });
});
