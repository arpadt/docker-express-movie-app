import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSnippetsComponent } from './movie-snippets.component';

describe('MovieSnippetsComponent', () => {
  let component: MovieSnippetsComponent;
  let fixture: ComponentFixture<MovieSnippetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieSnippetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSnippetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
