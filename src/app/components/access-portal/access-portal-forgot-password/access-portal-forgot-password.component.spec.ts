import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccessPortalForgotPasswordComponent } from './access-portal-forgot-password.component';

describe('AccessPortalForgotPasswordComponent', () => {
  let component: AccessPortalForgotPasswordComponent;
  let fixture: ComponentFixture<AccessPortalForgotPasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessPortalForgotPasswordComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccessPortalForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
