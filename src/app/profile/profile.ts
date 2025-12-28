import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  id!: number;
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
  }
}
