import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  urlServer = "https://music.fly.dev";

  constructor() {}

 

  // USERS
  listUsers(page: number = 1, perPage: number = 10) {
    return fetch(`${this.urlServer}/list_users?page=${page}&per_page=${perPage}`, {
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());
  }

  findUser(query: string) {
    return fetch(`${this.urlServer}/find_user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: query })
    }).then(response => response.json());
  }

  getCurrentUser(userId: number) {
    return fetch(`${this.urlServer}/current_user/${userId}`, {
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());
  }

  // POSTS
  getAllPosts(page: number = 1, perPage: number = 10) {
    return fetch(`${this.urlServer}/posts?page=${page}&per_page=${perPage}`, {
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());
  }

  createPost(content: string, userId: number) {
    return fetch(`${this.urlServer}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ post: { content, user_id: userId } })
    }).then(response => response.json());
  }

  likePost(postId: number) {
    return fetch(`${this.urlServer}/posts/${postId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());
  }

  // FOLLOWS
  followUser(userId: number) {
    return fetch(`${this.urlServer}/follow/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());
  }

  unfollowUser(userId: number) {
    return fetch(`${this.urlServer}/unfollow/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());
  }

  // FAVORITE TRACKS
  getAllFavorites() {
    return fetch(`${this.urlServer}/favorite_tracks`, {
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());
  }

  getUserFavorites(userId: number) {
    return fetch(`${this.urlServer}/user_favorites/${userId}`, {
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());
  }
}
