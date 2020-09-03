/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService, Post } from './post.service';

describe('Service: Post', () => {

  let postService: PostService;
  let httpMock: HttpTestingController;
  const postItem = [
    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "userId": 1,
      "id": 2,
      "title": "qui est esse",
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
      "userId": 1,
      "id": 3,
      "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    }
  ];

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          HttpClientTestingModule,
        ],
        providers: [
          PostService,
        ],
      });
  });

  beforeEach(() => {
    // Inject SUT service
    postService = TestBed.get(PostService);

    // Inject service's dependencies
    httpMock = TestBed.get(HttpTestingController);

    // Expect instances's presence
    expect(postService).toBeTruthy();
    expect(httpMock).toBeTruthy();
  });


  it('Should the service be created',
  inject([PostService], (service: PostService) => {
    expect(service).toBeTruthy();
    expect(service).toEqual(postService);
  }));


  describe('Should all the urls be defined', () => {
    it('urlPosts', () => {
      expect(postService['REST_API']).toBeDefined();
      expect(postService['REST_API']).toEqual(jasmine.any(String));
    });
  });


  describe('#getPosts in service PostService', () => {

    it('Should get posts and return a Object type Post', () => {
      // Nos subscribimos al método getPosts del servicio
      postService.getPosts().subscribe((posts: Post[]) => {
        expect(posts.length).toBe(3);
      });

      // Validamos la url de la Api
      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
      expect(req.request.method).toBe('GET');

      req.flush(postItem);
      httpMock.verify();

    });


    it('Should get a Post with id 1 and return a type Post Object ', () => {
      const id = 1;
      postService.getPostsById(id).subscribe((post: any) => {
        expect(post.userId).toBeDefined();
        expect(post.id).toBeDefined();
        expect(post.title).toBeDefined();
        expect(post.body).toBeDefined();
      });

      // Validamos la url de la Api
      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/1');
      expect(req.request.method).toBe('GET');

      req.flush(postItem[0]);
      httpMock.verify();

    });

  });

});
