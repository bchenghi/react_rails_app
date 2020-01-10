class Api::TaskResource < JSONAPI::Resource
  caching
  attributes :task, :due
  has_one :category

  filter :category
end
