class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.text :task
      t.date :due

      t.timestamps
    end
  end
end
