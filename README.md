### Vero Typescript Client
A wrapper for [Vero](http://www.getvero.com/)'s public [api](http://www.getvero.com/api/http/) using Typescript.

A newly updated one did not exist, so I made one.

### License
MIT

### Installing
`npm install vero-ts`

### Sample Usage

#### Create an instance
```typescript
import Vero from 'vero-ts';

const vero = new Vero('<YOUR_AUTH_TOKEN>');
```

#### Call the methods
```typescript
// -- Track a user
const userId:string = 'someId';
const userEmail:string = 'someEmail@example.org'
const dataAboutTheUser:object = {
    someProperty: 'someValue',
    anotherProperty: 123
}
await vero.Users.track(userId, userEmail, dataAboutTheUser);
// --

// -- Call an event
// (Assume the above user info still applies)
const eventName = '<EVENT-NAME>';
const eventData = {
    eventProperty: 'value',
    eventObjectProperty: {
        objectProperty: 'something'
    },
    anotherProperty: 123
};
await vero.Events.track(userId, userEmail, eventName, eventData);
```


