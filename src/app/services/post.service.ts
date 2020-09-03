import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  REST_API: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  /**
   * Método para obtener la información de los posts
   */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.REST_API}`)
  }

  /**
   * Método para obtener la información de de un post
   */
  getPostsById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.REST_API}/${id}`)
  }

}


export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
