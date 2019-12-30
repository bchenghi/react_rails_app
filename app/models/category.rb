class Category < ApplicationRecord
  has_many :tasks
  validates :category, presence: true, length: {minimum: 3 }
end
