import 'reflect-metadata';

export class DiContainer {
    public static resolve(target: any): any {
        let tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        let injections = tokens.map(token => this.resolve(token));

        return new target(...injections);
    }
}