# Finerio PFM Web SDK

This SDK lets you connect to [Finerio PFM API](http://ec2-3-16-174-50.us-east-2.compute.amazonaws.com:8082/swagger-ui/index.html#/) in an easier way.

## Table of contents

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
  - [Accounts](#accounts)
    - [List Accounts](#list-accounts)
    - [Get Account](#get-account)
    - [Create Account](#create-account)
    - [Update Account](#update-account)
    - [Delete Account](#delete-account)
  - [Categories](#categories)
    - [List Categories](#list-categories)
    - [List Categories and Subcategories](#list-categories-and-subcategories)
    - [Get Category](#get-category)
    - [Create Category](#create-category)
    - [Update Category](#update-category)
    - [Delete Category](#delete-category)
  - [Transactions](#transactions)
    - [List Transactions](#list-transactions)
    - [Get Transaction](#get-transaction)
    - [Create Transaction](#create-transaction)
    - [Update Transaction](#update-transaction)
    - [Delete Transaction](#delete-transaction)
  - [Budgets](#budgets)
    - [List Budgets](#list-budgets)
    - [Get Budget](#get-budget)
    - [Create Budget](#create-budget)
    - [Update Budget](#update-budget)
    - [Delete Budget](#delete-budget)
  - [Insights](#insights)
    - [Resume](#resume)
    - [Analysis](#analysis)
  - [Financial Entities](#financial-entities)
    - [List Financial Entities](#list-financial-entities)
    - [Get Financial Entity](#get-financial-entity)

## Installation

NPM:

```
npm install finerio-pfm-web
```

## Setup

```javascript
import { FinerioConnectSDK } from "finerio-pfm-web";
import { CATEGORY_TYPE, TRANSACTION_TYPE } from "finerio-pfm-web";

//The constructor can receive an object as parameter specifying in the includes key the SDK instances you want to use as an array of types or a single type, depending on which SDK instances you want to use and in sandbox key the environment to use.
//If constructor has no parameters all the SDK instances will be returned and production mode will be used.
const fcPfm = new FinerioConnectSDK({
  includes: [CATEGORY_TYPE, TRANSACTION_TYPE],
  sandbox: true,
});

//Call the login method to obatain the an object with the previously established instances.
fcPfm
  .login(username, password, clientId)
  .then(({ Categories, Transactions }) => {
    ...
  })
  .catch((error) => console.log(error));

```

The following constant types can be used:
| Instance Types | Instance returned when you connect |
| --------------------- | ---------------------------------- |
| ACCOUNT_TYPE | `Accounts` |
| CATEGORY_TYPE | `Categories` |
| TRANSACTION_TYPE | `Transactions` |
| BUDGET_TYPE | `Budgets` |
| INSIGHTS_TYPE | `Insights` |
| FINANCIAL_ENTITY_TYPE | `FinancialEntities` |


---

**Production environment is not available at this version**

## Usage

Finerio PFM Web uses **Promises** to fetch responses from the API.

### Accounts

An account is the representation of your users' bank accounts.

### List Accounts

Fetches a list of accounts per user, sorted by ID in descending order.

```javascript
Accounts.list(cursor)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

The list starts with the item that has that ID.

Output:

```console
[
  Account {
    id: 2230303,
    dateCreated: 1646243107260,
    lastUpdated: 1646243107260,
    nature: "Mortgage",
    name: "nas",
    number: "1234126312341234",
    balance: 100,
    chargeable: false
  },
  Account {
    id: 1486887,
    dateCreated: 1645212332784,
    lastUpdated: 1645212433106,
    nature: "Investment",
    name: "Investment Account",
    number: "0277",
    balance: 251.03,
    chargeable: false
  }
  ...
]

```

### Get Account

Given a valid account ID, fetches the information of an account.

```javascript
Accounts.get(accountId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Account {
  id: 2230303,
  dateCreated: 1646243107260,
  lastUpdated: 1646243107260,
  nature: "Mortgage",
  name: "nas",
  number: "1234126312341234",
  balance: 100,
  chargeable: false
},

```

### Create Account

Creates an account. A previosuly created user and a financial entity is required. You have to import the Account Payload Model to create a new one.

```javascript
import { Account } from "finerio-pfm-web";

...

const account = new Account(
        1115164,
        743443,
        "Mortgage",
        "Cuenta prueba",
        "1111 1111 1111 1111",
        1000
      );

Accounts.create(account)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Account {
  id: 2230303,
  dateCreated: 1646243107260,
  lastUpdated: 1646243107260,
  nature: "Mortgage",
  name: "Cuenta prueba",
  number: "1111 1111 1111 1111",
  balance: 1000,
  chargeable: false
}

```

### Update Account

Updates an account. You have to import the Account Payload Model to update it.

```javascript
import { Account } from "finerio-pfm-web";

...

const account = new Account(
        1115164,
        743443,
        "Mortgage",
        "Cuenta prueba 2",
        "1111 1111 1111 1111",
        1000
      );

Accounts.update(accountId, account)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Account {
  id: 2230303,
  dateCreated: 1646243107260,
  lastUpdated: 1646243107260,
  nature: "Mortgage",
  name: "Cuenta prueba 2",
  number: "1111 1111 1111 1111",
  balance: 1000,
  chargeable: false
}

```

### Delete Account

Deletes an account and all its information, including transactions.

```javascript
Accounts.delete(accountId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
204

```

If the account was deleted code 204 will be returned.

### Categories

Categories are the classification of transactions and budgets.

### List Categories

Fetches a list of categories, sorted by ID in ascending order. The API is able to fetch up to 100 categories.

```javascript
Categories.list()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Categories are fetched.

Output:

```console
[
  Category {
    id: 1,
    name: 'Hogar',
    color: '#A3CB38',
    parentCategoryId: null,
    userId: null,
    dateCreated: null,
    lastUpdated: null
  },
  Category {
    id: 2,
    name: 'Alimentos',
    color: '#FECA46',
    parentCategoryId: null,
    userId: null,
    dateCreated: null,
    lastUpdated: null
  },
  ...
]

```

### List Categories And Subcategories

Fetches a list of categories, sorted by ID in ascending order grouped by parent category and subcategories. The API is able to fetch up to 100 categories.

```javascript
Categories.listWithSubcategories()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Categories grouped by subcateogires are fetched.

Output:

```console
[
  ParentCategory {
    id: 1,
    name: 'Hogar',
    color: '#A3CB38',
    parentCategoryId: null,
    userId: null,
    dateCreated: null,
    lastUpdated: null,
    subcategories: [
      [Category], [Category],
      [Category], [Category],
      [Category], [Category],
      [Category], [Category],
      [Category]
    ]
  },
  ParentCategory {
    id: 2,
    name: 'Alimentos',
    color: '#FECA46',
    parentCategoryId: null,
    userId: null,
    dateCreated: null,
    lastUpdated: null,
    subcategories: [ [Category], [Category], [Category] ]
  },
  ...
]

```

### Get Category

Given a valid category ID, fetches the information of a category.

```javascript
const categoryId = 27;
Categories.get(userId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Category {
  id: 27,
  name: 'Otros Auto y Transporte',
  color: '#99ECD8',
  parentCategoryId: 5,
  userId: null,
  dateCreated: null,
  lastUpdated: null
}

```

### Create Category

Creates a category. If a user ID is not specified, the category is considered as a system category. If a parent category ID is specified, the category is considered a subcategory. You have to import the Category Payload Model to update it.

```javascript
import { Category } from "finerio-pfm-web";

...
const name = "Streaming";
const color = "#FF0000";
const parentCategoryId = 1859616;
const category = new Category(name, color, parentCategoryId, [userId]);

Categories.create(category)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Category {
  id: 1859620,
  name: 'Streaming',
  color: '#FF0000',
  parentCategoryId: 1859616,
  userId: null,
  dateCreated: 1647380144534,
  lastUpdated: 1647380144534
}
```

### Update Category

Given a valid category id updates a category. You have to import the Category Payload Model to update it.

```javascript
import { Category } from "finerio-pfm-web";

...
const name = "Streaming Test";
const color = "#00FF00";
const parentCategoryId = null;
const category = new Category(name, color, parentCategoryId);

Categories.create(category)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Category {
  id: 1859621,
  name: 'Streaming Test',
  color: '#00FF00',
  parentCategoryId: null,
  userId: null,
  dateCreated: 1647380312266,
  lastUpdated: 1647380312266
}

```

### Delete Category

Given a valid category id deletes a category.

```javascript
const categoryId = 1859621;
Categories.delete(categoryId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
204

```

If the category was deleted code 204 will be returned.

### Transactions

A transaction is the representation of the financial movements within an account.

### List Transactions

Fetches a list of transactions per account, sorted by ID in descending order.

```javascript
Transactions.list(accountId, [listOptions])
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

If a listOptions object is specified, the list is filtered based on the added properties.

The following properties can be used:
| Name | Type | Example | Description |
| --------------------- | ---------------------------------- | ---------------------------------- |---------------------------------- |
| **categoryId** | _integer_ | `categoryId=123` | The ID of the category. |
| **description** | _string_ | `description=UBER` | The description of the transaction. It can be partial. |
| **charge** | _boolean_ | `charge=true` | The type of the transaction (true = charge, false = deposit) |
| **minAmount** | _number_ | `minAmount=123.45` | The minimum amount of the transaction. |
| **maxAmount** | _number_ | `maxAmount=123.45` | The maximum amount of the transaction. |
| **dateFrom** | _number_ | `dateFrom=1587567125458` | The minimum date of the transaction, in UNIX format. |
| **dateTo** | _number_ | `dateTo=1587567125458` | The maxumum date of the transaction, in UNIX format. |
| **cursor** | _integer_ | `cursor=123` | The ID of the transaction where the list starts. |

Output:

```console
[
  Transaction {
    id: 123,
    date: 1587567125458,
    charge: true,
    description: "UBER EATS",
    amount: 1234.56,
    categoryId: 123,
    dateCreated: 1587567125458,
    lastUpdated: 1587567125458
  },
  Transaction {
    id: 456,
    date: 1587567145458,
    charge: true,
    description: "RAPPI",
    amount: 1234.56,
    categoryId: 123,
    dateCreated: 1646259197099,
    lastUpdated: 1646259197099,
  }
  ...
]

```

### Get Transaction

Given a valid transaction ID, fetches the information of a transaction.

```javascript
Transactions.get(transactionId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Transaction {
  id: 123,
  date: 1587567125458,
  charge: true,
  description: "UBER EATS",
  amount: 1234.56,
  categoryId: 123,
  dateCreated: 1587567125458,
  lastUpdated: 1587567125458
}

```

### Create Transaction

Creates a transaction. A previosuly created account is required. You have to import the Transaction Payload Model to create a new one.

```javascript
import { Transaction } from "finerio-pfm-web";

...

const transaction = new Transaction(
        2230303,
        new Date(),
        true,
        "Transaction Test",
        1111,
        79
      );

Transactions.create(transaction)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Transaction {
  id: 789,
  date: 1587567145458,
  charge: true,
  description: "Transaction Test",
  amount: 1111,
  categoryId: 79,
  dateCreated: 1587567145458,
  lastUpdated: 1587567145458
}

```

### Update Transaction

Given a valid transaction id updates a transaction. The new name should not be previously registered. You have to import the Transaction Payload Model to update it.

```javascript
import { Transaction } from "finerio-pfm-web";

...

const transaction = new Transaction(
        2230303,
        new Date(),
        true,
        "Edited Transaction Test",
        1111,
        79
      );

Transactions.update(transactionId, transaction)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Transaction {
  id: 789,
  date: 1587567165458,
  charge: true,
  description: "Edited Transaction Test",
  amount: 1111,
  categoryId: 79,
  dateCreated: 1587567145458,
  lastUpdated: 1587567165458
}


```

### Delete Transaction

Deletes a transaction and all its information.

```javascript
Transactions.delete(transactionId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
204

```

If the transaction was deleted code 204 will be returned.

### Budgets

A budget is the representation of your users' budget plan.

### List Budgets

Fetches a list of budgets per user, sorted by ID in descending order.

```javascript

Budgets.list(cursor?)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

If a cursor is specified, the list starts with the item that has that ID.

Output:

```console
[
  Budget {
    id: 1486872,
    categoryId: 3,
    name: 'Streaming services',
    amount: 1500,
    warningPercentage: 0.6,
    spent: 0,
    leftToSpend: 1500,
    status: 'ok',
    dateCreated: 1646257102160,
    lastUpdated: 1646257642253
  },
  Budget {
    id: 1486874,
    categoryId: 87,
    name: 'Sports',
    amount: 178.17999267578125,
    warningPercentage: 0.7,
    spent: 0,
    leftToSpend: 178.17999267578125,
    status: 'ok',
    dateCreated: 1646259181915,
    lastUpdated: 1646259181915
  },
  ...
]

```

### Get Budget

Given a valid budget ID, fetches the information of a budget.

```javascript
const budgetId = 1486874;
Budgets.get(budgetId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Budget {
  id: 1486874,
  categoryId: 87,
  name: 'Sports',
  amount: 178.17999267578125,
  warningPercentage: 0.7,
  spent: 0,
  leftToSpend: 178.17999267578125,
  status: 'ok',
  dateCreated: 1646259181915,
  lastUpdated: 1646259181915
}

```

### Create Budget

Creates a budget. You have to import the Budget Payload Model to create a new one.

```javascript
import { Budget } from "finerio-pfm-web";

...
const name = "Budget Test";
const amount = 5000;
const warningPercentage = 0.5;
const categoryId = 15;
const userId = 1115162;

const newBudget = new Budget(
  name,
  amount,
  warningPercentage,
  categoryId,
  userId
);

Budgets.create(newBudget)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Budget {
  id: 1858596,
  categoryId: 15,
  name: 'Budget Test',
  amount: 5000,
  warningPercentage: 0.5,
  spent: 0,
  leftToSpend: 5000,
  status: 'ok',
  dateCreated: 1647299628041,
  lastUpdated: 1647299628041
}

```

### Update Budget

Given a valid budget id updates a budget. You have to import the User Payload Model to update it.

```javascript
import { Budget } from "finerio-pfm-web";

...

const name = "Budget";
const amount = 5000;
const warningPercentage = 0.5;
const categoryId = 16;

const budget = new Budget(name, amount, warningPercentage [, categoryId]);
const budgetId = 1858596;

Budgets.update(budgetId, budget)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

categoryId is optional, set only if you want to change the budget's category.

Output:

```console
Budget {
  id: 1858596,
  categoryId: 16,
  name: 'Budget',
  amount: 5000,
  warningPercentage: 0.5,
  spent: 0,
  leftToSpend: 5000,
  status: 'ok',
  dateCreated: 1647299628041,
  lastUpdated: 1647299628041
}

```

### Delete Budget

Given a valid budget id deletes budget.

```javascript
const budgetId = 1858596;
Budgets.delete(budgetId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
204

```

If the budget was deleted code 204 will be returned.

### Insights

### Analysis

Fetches an analysis of the financial information of a user.

```javascript
Insights.analysis([dateFrom, dateTo])
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
[
  Analysis {
    date: 1646114400000,
    categories: [
      {
        categoryId: 12,
        amount: 400,
        average: undefined,
        quantity: undefined,
        subcategories: [
          {
            categoryId: 82,
            amount: 400,
            average: 200,
            quantity: 2,
            transactionsByDate: [],
            transactions: [
              Transaction {
                id: undefined,
                accountId: undefined,
                amount: 400,
                charge: undefined,
                date: undefined,
                description: 'Test',
                categoryId: undefined,
                dateCreated: undefined,
                lastUpdated: undefined,
                average: 200,
                quantity: 2
              }
            ]
          }
         ],
        transactions: []
      }
    ]
  }
]

```

### Resume

Fetches a resume of the financial information of a user. It contains expenses, incomes and balances.

```javascript
Insights.resume([accountId, dateFrom, dateTo])
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Resume {
  incomes: [
    IncomeExpense {
      date: 1643695200000,
      categories: [
        {
          categoryId: 12,
          amount: 200,
          average: undefined,
          quantity: undefined,
          subcategories: [
            {
              categoryId: 82,
              amount: 200,
              average: undefined,
              quantity: undefined,
              transactionsByDate: [
                {
                  date: 1645596000000,
                  transactions: [
                    {
                      id: 2230310,
                      accountId: undefined,
                      amount: 200,
                      charge: false,
                      date: 1645632564947,
                      description: 'Test',
                      categoryId: null,
                      dateCreated: 1646258563935,
                      lastUpdated: 1646258563935,
                      average: undefined,
                      quantity: undefined
                    }
                  ]
                }
              ],
              transactions: []
            }
          ],
          transactions: []
        }
      ],
      amount: 200
    }
  ],
  expenses: [
    IncomeExpense {
      date: 1646114400000,
      categories: [Array],
      amount: 400
    }
  ],
  balances: [
    Balance { incomes: 200, expenses: 0, date: 1643695200000 },
    Balance { incomes: 0, expenses: 400, date: 1646114400000 }
  ]
}

```

### Financial Entities

Financial entities represents the financial institutions where your customers keep their money, or something else that helps you modelling the way you manage the accounts of your users.

### List Financial Entities

Fetches a list of financial entities per client,, sorted by ID in descending order.

```javascript
FinancialEntities.list(cursor)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

The list starts with the item that has that ID.

Output:

```console
[
  FinancialEntity {
    id: 12,
    dateCreated: 1646243107260,
    lastUpdated: 1646243107260,
    name: "New Bank",
    code: "NBK",
    image_path: "http://image/logo.png",
  },
  FinancialEntity {
    id: 13,
    dateCreated: 1646243107260,
    lastUpdated: 1646243107260,
    name: "Central Bank",
    code: "CBK",
    image_path: "http://image/logo.png",
  }
  ...
]

```

### Get Financial Entity

Given a valid financial entity ID, fetches the information of an financial entity.

```javascript
FinancialEntities.get(financialEntityId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
FinancialEntity {
  id: 13,
  dateCreated: 1646243107260,
  lastUpdated: 1646243107260,
  name: "Central Bank",
  code: "CBK",
  image_path: "http://image/logo.png",
},

```