class AddStampsToSnippets < ActiveRecord::Migration
  def change
    add_reference :stamps, :snippet, index: true, foreign_key: true
  end
end
