class Task < ApplicationRecord
  belongs_to :category
  validates :task, presence: true
  validates :due, presence: true
end
