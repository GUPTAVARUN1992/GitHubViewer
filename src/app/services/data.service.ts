import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DataService {
  public url: string = "";
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  get(id: string | number) {
    return this.http.get(this.url + '/' + id)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  create(resource: any) {
    return this.http.post(this.url, resource)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  update(resource: any) {
    return this.http.patch(this.url + '/' + resource.id, { isRead: true })
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  delete(id: string | number) {
    return this.http.delete(this.url + '/' + id)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  private handleError(error: Response) {
    if (error.status === 400)
      return throwError(() => new BadInput(error));

    if (error.status === 404)
      return throwError(() => new NotFoundError());

    return throwError(() => new AppError(error));
  }
}
