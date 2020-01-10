class Api::CategoryResource < JSONAPI::Resource
  caching
  attributes :category
  has_many :tasks
end
