import { Component, OnInit } from '@angular/core';
import { TagService } from '../../../shared/services/tag.service';
import { ActivatedRoute, Route } from '@angular/router';
import { first } from 'rxjs';
import { User } from '../../../shared/models/user.model';
import { ViewService } from '../../../shared/services/view.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})
export class GeneralComponent implements OnInit {
  currentView?: boolean;
  id?: string;
  results?: any[];
  user?: User



constructor (
  private tagService: TagService,
  private route: ActivatedRoute,
  private viewService: ViewService
) {}

ngOnInit(): void {
    this.currentView = this.viewService.freelancerView

    this.id = this.route.snapshot.params['id']
    console.log(this.id)

    this.tagService.getAllUsersFromTagById(this.id).pipe(first()).subscribe((x)=>{this.results = x.data
      console.log(this.results)
    })

}


  switch() {
   this.currentView = this.viewService.changeView()
  }
}
