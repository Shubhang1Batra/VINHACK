# Database Schema

## Recipe

- title
- ingredients
- steps
- price
- story
- creatorLink
- videoUrl
- seasonal
- isContestEntry

## Ingredient

- name
- avgPrice
- unit
- seasonal
- substitutes

## User

- name
- email

## List

- userId
- name
- recipeIds

## Comment

- userId
- recipeId
- text
- createdAt

## ContestEntry

- recipeId
- userId
- contestName
- score