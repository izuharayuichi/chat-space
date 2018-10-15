# README

## usersテーブル

|column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|

### Association
- has_many :groups, through: :group_users
- has_many :messages
- has_many :group_users

## groupsテーブル

|column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|

### Association
- has_many :users, through: :group_users
- has_many :messages
- has_many :group_users
- accepts_nested_attributes_for :group_users


## messagesテーブル

|column|Type|Options|
|------|----|-------|
|text|text||
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## group_userテーブル

|column|Type|Options|
|------|----|-------|
|group_id|references|null: false, foreign_key: true|
|user_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
