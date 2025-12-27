import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubFollowersService } from '../services/github-followers.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-followers',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './followers.html',
  styleUrl: './followers.css',
})
export class Followers implements OnInit {
  followers: any[] = [];

  gitHubForm = new FormGroup({
    gitHubUsername: new FormControl('')
  });

  constructor(public service: GithubFollowersService) { }

  ngOnInit() {
    this.getAllFollowers();
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
