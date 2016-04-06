class CreateStamps < ActiveRecord::Migration
  def change
    create_table :stamps do |t|
      t.jsonb :state
      t.timestamps null: false
    end
  end
end
