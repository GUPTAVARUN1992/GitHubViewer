import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class GithubFollowersService extends DataService {
    public user = 'mosh-hamedani';
    constructor(http: HttpClient) {
        super(http);
        this.url = `https://api.github.com/users/${this.user}/followers`;
    }

    updateUser(username: string) {
        this.user = username;
        this.url = `https://api.github.com/users/${this.user}/followers`;
    }
}
