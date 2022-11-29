import {
  debounceTime,
  Observable,
  map,
  distinctUntilChanged,
  fromEvent,
} from 'rxjs';

// const search$ = new Observable<Event>((observer) => {
//   const search = document.getElementById('search');
//   // const search = document.getElementById('search') as HTMLElement | null;

//   // if (!search) {
//   //   observer.error('Element does not exist on the page');
//   //   return;
//   // }
//   search?.addEventListener('input', (event) => {
//     observer.next(event);
//     // observer.complete();
//   });
//   // observer.next(Math.floor(Math.random() * 10));
// });

const search$: Observable<Event> = fromEvent<Event>(
  document.getElementById('search') as HTMLInputElement,
  'input'
);

search$
  .pipe(
    map((event) => {
      return (event.target as HTMLInputElement).value;
    }),
    debounceTime(500),
    map((value) => (value.length > 3 ? value : '')),
    distinctUntilChanged()
  )
  .subscribe((value) => console.log(value));

// search$.subscribe({
//   next: (value) => {
//     console.log(value);
//   },
//   complete: () => console.log('finish the action'),
//   error: (err) => console.log(err),
// });
// search$.subscribe((value) => console.log('1: ', value));
