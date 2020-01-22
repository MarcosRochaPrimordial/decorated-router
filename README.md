# Router with Typescript decorators

This is an easy way to use Express and define controllers with no route files and run your application with dependency injection.
Let's take a look.

# Installation

```
npm install decorated-router
```

# Basic usage

## Loader (index) file

```typescript
import { LoadApp, METHOD, HEADER } from 'decorated-router';

@LoadApp({
    controllers: [
        Controller
    ],
    server: {
        port: 3000,
        methods: [METHOD.GET, METHOD.POST, METHOD.PUT, METHOD.DELETE, METHOD.PATCH, METHOD.OPTIONS],
        headers: [HEADER.ORIGIN, HEADER.XREQUESTEDWITH, HEADER.CONTENTTYPE, HEADER.ACCEPT, HEADER.AUTHORIZATION]
    }
})
class loader {}
```

## Controllers

```typescript
import { Controller, Get, Delete, Post, Put, PathVariable, RequestParam, RequestBody } from 'decorated-router';
import { Response } from 'express';

@Controller({
    url: '/controller',
    cors: "*",
    auth: AuthenticationMiddleware
})
export class Controller {

    constructor(
        private _someInjectedService: SomeInjectedService
    ) { }

    @Get('/to/:to')
    getTo(@PathVariable('to') to) {
        return new Promise((resolve, reject) => {
            resolve({ to });
        })
    }

    @Delete('/from') // ?from=someValue
    delete(@RequestParam('from') from, res: Response) {
        setTimeout(() => {
            res.json({ from });
        }, 1000);
    }

    @Post('/when')
    post(@RequestBody() someDto: SomeDTO) {
        return { start: someDto.getStart() };
    }

    @Put('/where')
    put(@RequestBody() someDto: SomeDTO) {
        return this._someInjectedService.doThings(someDto.getEnd());
    }
}
```

## Data Objects

```typescript
import { DataObject } from 'decorated-router';

@DataObject()
class SomeDTO {
    private start: number;
    private end: number;

    public getStart(): number {
        return this.start;
    }

    public getEnd(): number {
        return this.end;
    }
}
```

## Dependency Injection

```typescript
import { Injectable } from 'decorated-router';

@Injectable()
export class SomeInjectedService {

    private name: string

    constructor(
        private _someOtherInjectedService: SomeOtherInjectedService
    ) { }

    doThings(end: number): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this._someOtherInjectedService.someMagic) {
                resolve(end);
            } else {
                reject('error');
            }
        });
    }
}
```