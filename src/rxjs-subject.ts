import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

//some examples from https://dev.to/devbyrayray/when-use-rxjs-subject-behavioursubject-replaysubject-asyncsubject-or-void-subject-in-angular-4pn9
const subject = new Subject();

// subject.subscribe({
//   next: (v) => console.log(`observerA: ${v}`),
// });
// subject.next(1);
// subject.subscribe({
//   next: (v) => console.log(`observerB: ${v}`),
// });

// subject.next(2);
// subject.next(3);

// void subject

subject.subscribe({
  next: () => console.log('One second has passed'),
});

setTimeout(() => subject.next(1), 1000);
