import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class ViewService {
  freelancerView = false;
  private viewSub = new BehaviorSubject<any | undefined | null> (null);

  public getCurrentView() {
    return this.viewSub.asObservable()
  }


  changeView() {
    this.freelancerView = !this.freelancerView
    return this.freelancerView
  }
}
