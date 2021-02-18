import { Controller, Post, Body, DataObject } from './../lib/main';

@DataObject()
class UserDTO {
    username: string;
    password: string;
}

@Controller({ url: '/login', cors: "*" })
export class Login {

    @Post()
    login(@Body() user: UserDTO) {
        return user;
    }

}