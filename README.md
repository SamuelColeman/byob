# College Football API

## List All Teams

A successful response returns an array of all college football teams in the FBS.

```
GET /api/v1/teams
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique identifier of the team|
|school|string| Name of the university|
|mascot|string| School's mascot name|
|conference|string| Name of the conference in which the school belongs|

## List All Conferences

A successful response returns an array of all college football conferences in the FBS.

```
GET /api/v1/conferences
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique identifier of the conference|
|name|string| Official name of the conference|
|abbreviation|string| Abbreviated name of the conference|

## Display Specific Team

A successful response returns data for a certain college football team selected by id.

```
GET /api/v1/teams/:id
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique identifier of the team|
|school|string| Name of the university|
|mascot|string| School's mascot name|
|conference|string| Name of the conference in which the school belongs|

## Display Specific Conference

A successful response returns data for a certain college football conference selected by id.

```
GET /api/v1/conferences/:id
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique identifier of the conference|
|name|string| Official name of the conference|
|abbreviation|string| Abbreviated name of the conference|

## Add New Team

A successful response returns the id of the new team that was just added.

```
POST /api/v1/teams
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique identifier of the team|
|school|string| Name of the university|
|mascot|string| School's mascot name|
|conference|string| Name of the conference in which the school belongs|

## Add New Conference

A successful response returns the id of the new conference that was just added.

```
POST /api/v1/conferences
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique identifier of the conference|
|name|string| Official name of the conference|
|abbreviation|string| Abbreviated name of the conference|

## Remove Existing Team

A successful response returns a message confirming that the team matching the provided id was deleted.

```
DELETE /api/v1/teams/:id
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique identifier of the team|
|school|string| Name of the university|
|mascot|string| School's mascot name|
|conference|string| Name of the conference in which the school belongs|
