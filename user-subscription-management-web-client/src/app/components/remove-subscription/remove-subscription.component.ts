// add-subscription.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { SubscriptionService } from '../../services/subscription/subscription.service';
import { Subscription } from '../../services/models/subscription';
import { NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aremove-subscription',
  templateUrl: './remove-subscription.component.html',
  styleUrls: ['./remove-subscription.component.css']
})
export class RemoveSubscriptionComponent implements OnInit {
  userSubscriptions: Subscription[] = [];
  @ViewChild('myForm') myForm!: NgForm;


  constructor(private subscriptionService: SubscriptionService, private router: Router) { }

  ngOnInit(): void {
    this.loadUserSubscriptions();
  }

  loadUserSubscriptions(): void {
    this.subscriptionService.getUserSubscriptions().subscribe(
      (data) => {
        this.userSubscriptions = data?.subscriptions ?? [];
      },
      (error) => {
        console.error('Error loading user subscriptions:', error);
      }
    );
  }

  isSubscriptionCheckedAndDisabled(subscription: Subscription): boolean {
    return this.userSubscriptions.some(userSub => userSub.key === subscription.key);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const checkedSubscriptions = this.userSubscriptions.filter(sub => sub.isChecked)
    const observables = checkedSubscriptions.map(sub =>
      this.subscriptionService.deleteUserSubscription(sub.key ?? "")
    );
    
    forkJoin(observables).subscribe(() => {
      this.router.navigate(['/add-subscription'])
    });
  }

  onCheckBoxChange(subscription: Subscription): void {
    subscription.isChecked = !subscription.isChecked
  }

}
