import { Injectable } from "@angular/core";
import { CanActivate } from '@angular/router';
import { StorageService } from "../services/storage.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const vistaIntro = await this.storageService.get('visita-intro');

    if (vistaIntro === 'si') {
      return true;
    } else {
      this.router.navigate(['/intro']);
      return false;
    }
  }
}