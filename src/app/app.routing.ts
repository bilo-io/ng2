import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { HeroesComponent }      from './heroes.component';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { WsDemoComponent } from './shared/ws-demo/ws-demo.component';
const appRoutes: Routes = [
    {
        path: '', 
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'map',
        component: MapComponent
    },
    {
        path: 'ws',
        component: WsDemoComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
