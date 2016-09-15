import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { HeroesComponent }      from './heroes.component';
import { Component1 } from './components/component-1/component-1.component';
import { Component2 } from './components/component-2/component-2.component';

const appRoutes: Routes = [
    {
        path: '', 
        component: Component1
    },
    {
        path: 'component1',
        component: Component1
    },
    {
        path: 'component2',
        component: Component2
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
