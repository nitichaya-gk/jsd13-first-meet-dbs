# MongoDB vs PostgreSQL Query Comparison

MongoDB separates basic document retrieval and multi-step data processing into two common styles:

- `find()` for standard queries
- `aggregate()` for aggregation pipelines

PostgreSQL does not have the same split. PostgreSQL mainly uses SQL `SELECT` statements for both simple queries and advanced data processing.

## Simple Query

MongoDB `find()` is used when you want to retrieve matching documents with optional projection, sorting, and limiting.

```js
db.movies.find(
  { year: { $gte: 2010 } },
  { title: 1, year: 1, _id: 0 },
  { sort: { year: -1 }, limit: 10 }
);
```

The PostgreSQL equivalent is a normal `SELECT` query.

```sql
SELECT title, year
FROM movies
WHERE year >= 2010
ORDER BY year DESC
LIMIT 10;
```

## Aggregation Query

MongoDB `aggregate()` is used when the query needs multiple processing stages such as filtering, grouping, sorting, joining, or calculating values.

```js
db.movies.aggregate([
  { $match: { year: { $gte: 2010 } } },
  { $group: { _id: "$rated", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);
```

The PostgreSQL equivalent still uses SQL, but with features such as `GROUP BY`, aggregate functions, joins, subqueries, common table expressions, or window functions.

```sql
SELECT rated, COUNT(*) AS count
FROM movies
WHERE year >= 2010
GROUP BY rated
ORDER BY count DESC;
```

## Concept Mapping

| MongoDB | PostgreSQL |
| --- | --- |
| `find()` | `SELECT ... FROM ... WHERE ...` |
| query filter | `WHERE` |
| projection | selected columns after `SELECT` |
| `options.sort` | `ORDER BY` |
| `options.limit` | `LIMIT` |
| `aggregate()` | advanced `SELECT` query |
| `$match` | `WHERE` |
| `$project` | selected columns or calculated expressions |
| `$group` | `GROUP BY` |
| `$sort` | `ORDER BY` |
| `$limit` | `LIMIT` |
| `$lookup` | `JOIN` |

## Rule of Thumb

Use MongoDB `find()` when you only need to retrieve documents with simple filtering, projection, sorting, or limiting.

Use MongoDB `aggregate()` when you need to transform data, calculate values, group records, join collections, or build a multi-step result.

In PostgreSQL, use SQL for both cases. Simple work uses a simple `SELECT`; advanced work uses a more advanced `SELECT`.