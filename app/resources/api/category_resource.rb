class Api::CategoryResource < JSONAPI::Resource
  attributes :category
  has_many :tasks
end
