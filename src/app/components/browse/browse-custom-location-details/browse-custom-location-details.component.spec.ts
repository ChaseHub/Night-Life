import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BrowseCustomLocationDetailsComponent } from './browse-custom-location-details.component';

describe('BrowseCustomLocationDetailsComponent', () => {
  let component: BrowseCustomLocationDetailsComponent;
  let fixture: ComponentFixture<BrowseCustomLocationDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseCustomLocationDetailsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BrowseCustomLocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
