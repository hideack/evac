
### mysql

Subscription in MySQL.

#### Parameters

| Name   | parameter |
|--------|----------------------------|
| settings | MySQL connection settings.  |
| query | Executing SQL statements and queries. |
| target | Fetch target column.  |

#### Example

    "mysql": {
      "settings": {
        "host": "host_name",
        "database": "database_name",
        "user": "mysql_user",
        "password": "mysql_pw"
      },
      "query": "select count(*) as count from users;",
      "target": "count"
    }
