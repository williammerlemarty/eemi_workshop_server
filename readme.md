# API Routes

## Summary

* [/auth](#auth)
    * [Login](#login)
    * [Signup](#sign-up)
* [/party](#party)
    * [Infos](#party-info)
    * [Join](#party-join)
    * [Create](#party-create)
    * [End](#party-end)
* [/user](#user)
    * [Infos](#user-info)
    * [Edit](#user-edit)
    * [Delete](#user-delete)

***

## Token authentification

* [Tuto authentification](http://www.meanjs.fr/jwt-lauthentification-avec-token-plutot-quavec-cookie/)

***

## Auth

***

### Login
![HTTP GET](http://gautierguillaume.com/imgs/get.png) `/auth`

#### Params : 
```JS
{
     email : "user@email.com",
     password : "dqdskjhdsqdklsjqdjkn"
}
```

* ![String](http://gautierguillaume.com/imgs/string.png) email 
* ![String](http://gautierguillaume.com/imgs/string.png) password

#### Response sample

```JS
{
    status : 200,
    token : "slkjdhsquygdiozjd989d7z8q4d6qzd-dqzgjbsqdjbzqlj"
}
```

#### Response Messages

* 200 : User exist
* 400 : Invalid request
* 401 : Invalid token
* 403 : User not found

***

### Sign up
![HTTP POST](http://gautierguillaume.com/imgs/post.png) `/auth`

#### Params : 
```JS
{
    username : "username",
    email : "user@email.com",
    password : "dqdskjhdsqdklsjqdjkn"
}
```

* ![String](http://gautierguillaume.com/imgs/string.png) username
* ![String](http://gautierguillaume.com/imgs/string.png) email 
* ![String](http://gautierguillaume.com/imgs/string.png) password  

#### Response sample

```JS
{
    status : 200,
    user_id : 2,
    token :  "slkjdhsquygdiozjd989d7z8q4d6qzd-dqzgjbsqdjbzqlj"
} 
```

#### Response Messages

* 200 : User added
* 400 : Invalid request
* 401 : Invalid token
* 403 : User can't be added

***

## Party

***

### Party Info
![HTTP GET](http://gautierguillaume.com/imgs/get.png) `/party`

#### Params : 
```JS
{
    id : 1,
    name : "PartyTest"
}
```

At least **one** parameter is mandatory
* ![int](http://gautierguillaume.com/imgs/int.png) id 
* ![String](http://gautierguillaume.com/imgs/string.png) name 

#### Response sample

```JS
{
    status : 200,
    name : "PartyName",
    password : "password",
    time : 10,
    state : 3,
    created : "2002-05-30T09:30:10.5",
    end : "2002-05-30T09:30:10.5",
    users : {}
} 
```

#### Response Messages

* 200 : Party exits
* 400 : Invalid request
* 401 : Invalid token
* 403 : Party can't be added

***

### Party Join
![HTTP PUT](http://gautierguillaume.com/imgs/put.png) `/party`

#### Params : 
```JS
{
    id : 1,
    name : "PartyTest"
}
```

At least **one** parameter is mandatory
* ![int](http://gautierguillaume.com/imgs/int.png) id 
* ![String](http://gautierguillaume.com/imgs/string.png) name 

#### Response sample

```JS
{
    status : 200,
    name : "PartyName",
    password : "password",
    time : 10,
    state : 3,
    created : "2002-05-30T09:30:10.5",
    end : "2002-05-30T09:30:10.5",
    users : {}
} 
```

#### Response Messages

* 200 : Party joined
* 400 : Invalid request
* 401 : Invalid token
* 403 : Party can't be found
* 403 : Party is full