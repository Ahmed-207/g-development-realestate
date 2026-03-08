import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAccessCardComponent } from './contact-access-card.component';

describe('ContactAccessCardComponent', () => {
  let component: ContactAccessCardComponent;
  let fixture: ComponentFixture<ContactAccessCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactAccessCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactAccessCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
