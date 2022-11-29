import {
  debounceTime,
  Observable,
  map,
  distinctUntilChanged,
  fromEvent,
  Subscription,
  takeUntil,
} from 'rxjs';

//// first part without rxjs
// const search$ = new Observable<Event>((observer) => {
//   // const search = document.getElementById('search');
//   const search = document.getElementById('search') as HTMLElement | null;
//   const stop = document.getElementById('stop');
//   if (!search || !stop) {
//     observer.error('Element does not exist on the page');
//     return;
//   }

//   const onSearch = (event: Event) => {
//     checkSubscription();
//     observer.next(event);
//   };

//   const onStop = (event: Event) => {
//     checkSubscription();
//     observer.complete();
//     clear();
//   };

//   stop?.addEventListener('click', onStop);
//   //  ? after search in case / const search = document.getElementById('search');
//   search.addEventListener('input', onSearch);

//   const checkSubscription = () => {
//     if (observer.closed) {
//       clear();
//     }
//   };

//   const clear = () => {
//     search.removeEventListener('input', onSearch);
//     stop.removeEventListener('click', onStop);
//   };
// });
////////////

const search$: Observable<Event> = fromEvent<Event>(
  document.getElementById('search') as HTMLInputElement,
  'input'
);
const stop$: Observable<Event> = fromEvent<Event>(
  document.getElementById('stop') as HTMLInputElement,
  'click'
);

// const searchSubscription = search$
search$
  .pipe(
    map((event) => {
      return (event.target as HTMLInputElement).value;
    }),
    debounceTime(500),
    map((value) => (value.length > 3 ? value : '')),
    distinctUntilChanged(),
    takeUntil(stop$)
  )
  .subscribe((value) => console.log(value));

// const stopSubscription = stop$.subscribe(() => {
//   searchSubscription.unsubscribe();
//   stopSubscription.unsubscribe();
// });

///// to the first part
// setTimeout(() => {
//   console.log('unsubscribed');
//   searchSubscription.unsubscribe();
// }, 10000);
////////////
