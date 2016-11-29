# API Routes

## Summary

* [/auth](#auth)
    * [Login](#login)
    * [Sign up](#sign-up)
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

* ![Int](http://gautierguillaume.com/imgs/int.png) status 
* ![String](http://gautierguillaume.com/imgs/string.png) token 

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

* ![String](http://gautierguillaume.com/imgs/string.png) username ( 16 char max )
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
* ![Int](http://gautierguillaume.com/imgs/int.png) status 
* ![Int](http://gautierguillaume.com/imgs/int.png) user_id 
* ![String](http://gautierguillaume.com/imgs/string.png) token 

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
    time : 10,
    state : 3,
    created : "2002-05-30T09:30:10.5",
    end : "2002-05-30T09:30:10.5",
    users : {},
    beacons : {},
    missions : {}
} 
```

* ![Int](http://gautierguillaume.com/imgs/int.png) status 
* ![String](http://gautierguillaume.com/imgs/string.png) name 
* ![Int](http://gautierguillaume.com/imgs/int.png) time 
* ![Int](http://gautierguillaume.com/imgs/int.png) state 
* ![string](http://gautierguillaume.com/imgs/string.png) created 
* (optional) ![string](http://gautierguillaume.com/imgs/string.png) end 
* ![object](http://gautierguillaume.com/imgs/object.png) users 
* ![object](http://gautierguillaume.com/imgs/object.png) beacons 
* ![object](http://gautierguillaume.com/imgs/object.png) missions 


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
    name : "PartyName",
    password : "password"
}
```

* ![int](http://gautierguillaume.com/imgs/int.png) id 
or
* ![String](http://gautierguillaume.com/imgs/string.png) name 

* (optional) ![String](http://gautierguillaume.com/imgs/string.png) password

#### Response sample

```JS
{
    status : 200,
    name : "PartyName",
    time : 10,
    state : 3,
    created : "2002-05-30T09:30:10.5",
    users : {},
    baecons : {},
    missions : {}
} 
```

* ![int](http://gautierguillaume.com/imgs/int.png) status 
* ![string](http://gautierguillaume.com/imgs/string.png) name 
* ![int](http://gautierguillaume.com/imgs/int.png) time 
* ![int](http://gautierguillaume.com/imgs/int.png) state 
* ![string](http://gautierguillaume.com/imgs/string.png) created 
* ![object](http://gautierguillaume.com/imgs/object.png) users 
* ![object](http://gautierguillaume.com/imgs/object.png) beacons 
* ![object](http://gautierguillaume.com/imgs/object.png) missions 


#### Response Messages

* 200 : Party joined
* 400 : Invalid request
* 401 : Invalid token
* 403 : Party can't be found
* 403 : Party is full

***

### Party Create
![HTTP POST](http://gautierguillaume.com/imgs/post.png) `/party`

#### Params : 
```JS
{
    user_id : 1,
    name : "PartyName",
    player_limit : 3,
    password : "password",
    time : 10,
    beacons : {
        1 : "8367927whdjhba",
        2 : "2434235435nfjk",
        ...
    }
}
```

* ![int](http://gautierguillaume.com/imgs/int.png) user_id 
* ![String](http://gautierguillaume.com/imgs/string.png) name
* ![int](http://gautierguillaume.com/imgs/int.png) player_limit (max 3)

* (optional) ![String](http://gautierguillaume.com/imgs/string.png) password ( max 16 char )
* (optional) ![int](http://gautierguillaume.com/imgs/int.png) time ( in minutes )

* ![object](http://gautierguillaume.com/imgs/object.png) time ( in minutes )

#### Response sample

```JS
{
    status : 200,
    name : "PartyName",
    time : 10,
    state : 3,
    created : "2002-05-30T09:30:10.5",
    users : {},
    beacons : {},
    missions : {},
} 
```

* ![int](http://gautierguillaume.com/imgs/int.png) status 
* ![string](http://gautierguillaume.com/imgs/string.png) name 
* ![int](http://gautierguillaume.com/imgs/int.png) time 
* ![int](http://gautierguillaume.com/imgs/int.png) state 
* ![string](http://gautierguillaume.com/imgs/string.png) created 
* ![object](http://gautierguillaume.com/imgs/object.png) users 
* ![object](http://gautierguillaume.com/imgs/object.png) beacons 
* ![object](http://gautierguillaume.com/imgs/object.png) missions 


#### Response Messages

* 200 : Party created
* 400 : Invalid request
* 401 : Invalid token
* 403 : Party can't be created (same name)
* 403 : Unknow error

***

### Party End
![HTTP DELETE](http://gautierguillaume.com/imgs/delete.png) `/party`

#### Params : 
```JS
{
    party_id : 1
}
```

* ![int](http://gautierguillaume.com/imgs/int.png) party_id 

#### Response sample

```JS
{
    status : 200
} 
```

* ![int](http://gautierguillaume.com/imgs/int.png) status 

#### Response Messages

* 200 : Party ended
* 400 : Invalid request
* 401 : Invalid token
* 403 : Party can't be ended (missing permission)
* 403 : Unknow error

***

## User

***

### User info
![HTTP GET](http://gautierguillaume.com/imgs/get.png) `/user`

#### Params : 
```JS
{
    user_id : 1
}
```

* ![int](http://gautierguillaume.com/imgs/int.png) user_id 

#### Response sample

```JS
{
    status : 200,
    username : "username",
    email : "user@email.com"
} 
```

* ![int](http://gautierguillaume.com/imgs/int.png) status 
* ![string](http://gautierguillaume.com/imgs/string.png) username 
* ![string](http://gautierguillaume.com/imgs/string.png) email 

#### Response Messages

* 200 : User exist
* 400 : Invalid request
* 401 : Invalid token
* 403 : User can't be found

***

### User edit
![HTTP PATCH](http://gautierguillaume.com/imgs/patch.png) `/user`

#### Params : 
```JS
{
    user_id : 1,
    username : "username",
    email : "me@email.com",
    password : "supermotdepassedeouf"
}
```

* ![int](http://gautierguillaume.com/imgs/int.png) user_id 
* (optional) ![string](http://gautierguillaume.com/imgs/string.png) username 
* (optional) ![string](http://gautierguillaume.com/imgs/string.png) email 
* (optional) ![string](http://gautierguillaume.com/imgs/string.png) password 

#### Response sample

```JS
{
    status : 200,
    username : "username",
    email : "user@email.com",
    password : true
} 
```

* ![int](http://gautierguillaume.com/imgs/int.png) status 
* (optional) ![string](http://gautierguillaume.com/imgs/string.png) username 
* (optional) ![string](http://gautierguillaume.com/imgs/string.png) email 
* (optional) ![boolean](http://gautierguillaume.com/imgs/bool.png) password 

#### Response Messages

* 200 : User edited
* 400 : Invalid request
* 401 : Invalid token
* 403 : User can't be edited

***

### User delete
![HTTP delete](http://gautierguillaume.com/imgs/delete.png) `/user`

#### Params : 
```JS
{
    user_id : 1
}
```

* ![int](http://gautierguillaume.com/imgs/int.png) user_id 

#### Response sample

```JS
{
    status : 200
} 
```

* ![int](http://gautierguillaume.com/imgs/int.png) status 

#### Response Messages

* 200 : User deleted
* 400 : Invalid request
* 401 : Invalid token
* 403 : User can't be deleted
