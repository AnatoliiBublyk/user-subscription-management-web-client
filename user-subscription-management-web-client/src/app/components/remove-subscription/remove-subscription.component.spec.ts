import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveSubscriptionComponent } from './remove-subscription.component';

describe('RemoveSubscriptionComponent', () => {
  let component: RemoveSubscriptionComponent;
  let fixture: ComponentFixture<RemoveSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveSubscriptionComponent]
    });
    fixture = TestBed.createComponent(RemoveSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
