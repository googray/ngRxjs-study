import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

// const subject = new Subject<number>();
// const subject = new BehaviorSubject<number>(0);
const subject = new ReplaySubject<number>(2);

subject.next(1);
subject.next(2);

console.log('before 1 subs');
let value = 0;
subject.subscribe((val) => {
  console.log('first: ', val);
  value = val;
});
console.log('after 1 subs', value);

subject.next(3);

console.log('before 2 subs');
subject.subscribe((val) => console.log('second: ', val));
console.log('after 2 subs');

subject.next(4);

subject.subscribe((val) => console.log('third : ', val));
