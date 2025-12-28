import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Followers } from './followers/followers';
import { Notfound } from './notfound/notfound';
import { Profile } from './profile/profile';
import { Posts } from './posts/posts';
export const routes: Routes = [
    { path: '', component: Home },
    { path: 'followers', component: Followers },
    { path: 'posts', component: Posts },
    { path: 'profile/:id/:username', component: Profile },
    { path: '**', component: Notfound },
];
