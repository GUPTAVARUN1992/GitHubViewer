import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubFollowersService } from '../services/github-followers.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { RouterLink, ActivatedRoute } from "@angular/router";
import { combineLatest, map, switchMap } from 'rxjs';
@Component({
  selector: 'app-followers',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './followers.html',
  styleUrl: './followers.css',
})
export class Followers implements OnInit {
  followers: any[] = [];
  page !: number;
  order !: string;
  id!: number;
  gitHubForm = new FormGroup({
    gitHubUsername: new FormControl('')
  });

  constructor(public service: GithubFollowersService, private route: ActivatedRoute) { }

  ngOnInit() {
    combineLatest([this.route.queryParams, this.route.params]).pipe(
      switchMap(([queryParams, params]) => {
        this.page = queryParams['page'];
        this.order = queryParams['order'];
        this.id = params['id'];
        return this.service.getAll();
      })
    ).subscribe((followers) => this.followers = followers as any[]);

    console.log(this.page, this.order, this.id);
  }

  getAllFollowers() {
    this.service.getAll()
      .subscribe({
        next: (followers) => this.followers = followers as any[],
        error: (error) => {
          alert('User not found or unexpected error occurred.');
          this.followers = [];
        }
      });
  }

  search() {
    const username = this.gitHubForm.get('gitHubUsername')?.value;
    if (username) {
      this.service.updateUser(username);
      this.getAllFollowers();
    }
  }
}
