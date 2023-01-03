import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { PollIdKey } from '../keys';
import { Poll } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  private baseUrl: string = environment.services.poll.baseUrl;
  private _pollId: string = '';

  constructor(private http: HttpClient) {}

  listPollIds(): Observable<Poll[]> {
    return this.http.get<Poll[]>(this.baseUrl);
  }

  createPoll(): Observable<Poll> {
    return this.http.post<Poll>(`${this.baseUrl}/create`, {});
  }

  enterPoll(pollId: string): Observable<Poll> {
    return this.http.post<Poll>(`${this.baseUrl}/enter`, { pollId });
  }

  leavePoll(pollId: string): void {
    this._pollId = '';
    localStorage.removeItem(PollIdKey);
    this.http.delete(`${this.baseUrl}/delete/${pollId}`);
  }

  get pollId(): string {
    return localStorage.getItem(PollIdKey)?.toString() || this._pollId;
  }

  set pollId(id: string) {
    this._pollId = id;
    localStorage.setItem(PollIdKey, this._pollId);
  }
}