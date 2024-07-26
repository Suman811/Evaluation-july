import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailsentComponent } from './mailsent.component';

describe('MailsentComponent', () => {
  let component: MailsentComponent;
  let fixture: ComponentFixture<MailsentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailsentComponent]
    });
    fixture = TestBed.createComponent(MailsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
