import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { TagService } from '../../../shared/services/tag.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrl: './freelancer.component.scss'
})
export class FreelancerComponent implements OnInit{
  id?: string;
  results?: any[];
  user?: User


  constructor (
    private tagService: TagService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      this.id = this.route.snapshot.params['id']

      this.tagService.getAllUsersFromTagById(this.id).pipe(first()).subscribe((x) => {this.results = x.data})
  }
}
