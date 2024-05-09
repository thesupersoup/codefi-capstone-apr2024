import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Tag } from '../models/tag.model';

@Injectable({ providedIn: 'root' })
export class TagService {
  private tagSub = new BehaviorSubject<Tag | undefined | null>(null);

  constructor(private router: Router, private http: HttpClient) {}

  public getCurrentTag() {
    return this.tagSub.asObservable();
  }

  createTag(tag: Tag) {
    return this.http.post(`${environment.API_URL}/tags`, tag, {
      withCredentials: true,
    });
  }

  getTagsByName(name: string): Observable<any> {
    return this.http
      .get<{ success: boolean; data: { tags: Tag[] } }>(
        `${environment.API_URL}/tags?name=${name}`
      )
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }

  getTagById(id: string) {
    return this.http
      .get<{ success: true; data: { tag: any } }>(
        `${environment.API_URL}/tags/${id}`,
        { withCredentials: true }
      )
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }

  assignUserToTag(id: string, params: any) {
    return this.http
      .patch(`${environment.API_URL}/tags/${id}`, params, {
        withCredentials: true,
      })
      .pipe(
        map((x) => {
          const tag = { ...this.tagSub, ...params };
          this.tagSub.next(tag);
          return x;
        })
      );
  }

  removeTagFromUser(id: string) {
    return this.http.delete(`${environment.API_URL}/tags/${id}`, {
      withCredentials: true,
    });
  }

  getAllUsersFromTagById(id: string): Observable<any> {
    return this.http
      .get<{ success: boolean; data: { users: any[] } }>(
        `${environment.API_URL}/tags/users/${id}`,
        { withCredentials: true }
      )
  }
}
