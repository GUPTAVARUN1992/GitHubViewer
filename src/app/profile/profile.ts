import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  id!: number;
  username!: string;
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.username = params['username'];
      console.log('Hello, ' + this.username + ' with id ' + this.id);
    });
  }

  backToFollowers() {
    this.router.navigate(['/followers'], {
      queryParams: { page: 1, order: 'newest' }
    });
  }
}
