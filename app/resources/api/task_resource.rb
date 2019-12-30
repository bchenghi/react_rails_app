class Api::TaskResource < JSONAPI::Resource
  attributes :task, :due
  has_one :category

  filter :category
end
