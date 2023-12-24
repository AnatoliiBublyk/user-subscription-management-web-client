// edit-profile.component.ts

import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/profile/profile.service';
import { UserProfile } from '../../services/models/profile';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userProfile: UserProfile = {
    id: 0,
    email: null,
    first_name: null,
    last_name: null,
    middle_name: null,
    address: null,
    phone: null,
    zip: null,
  };

  constructor(private userProfileService: UserProfileService, private router: Router) { }

  ngOnInit(): void {
    this.userProfileService.getUserProfile().subscribe(
      (profile: UserProfile | null) => {
        if(profile !== null)
          this.userProfile = profile;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  onSubmit(form: NgForm, event: Event): void {
    event.preventDefault();
    if(!form.valid) {
      return;
    }
    this.userProfileService.updateUserProfile(this.userProfile).subscribe(
      () => {
        this.router.navigate(['/add-subscription']);
      },
      (error) => {
        console.error('Error updating user profile:', error);
      }
    );
  }
}
