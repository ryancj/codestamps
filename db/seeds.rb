# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Snippet.create(theme: 'ruby', codeblock: 'class Array
  def to_hash
    keys_and_values = self.map {|x| [x, yield(x)] }
    # Now `keys_and_values` is an array of arrays reperesenting
    # the hash. If the array this method was called on was, for
    # example, `[1, 2, 3]`, and the block passed to this method
    # was `{|x| x + 1 }`, `keys_and_values` would be:
    #
    #     [[1, 2], [2, 3], [3, 4]]

    #stamp

    keys_and_values = keys_and_values.flatten
    # now `keys_and_values` still contains all of the keys/values
    # of the new hash, but without the inner arrays. Even numbered
    # indexes will be keys, and odd indexes will be values. Example:
    #
    #     [1, 2, 2, 3, 3, 4]


    Hash[*keys_and_values]
    # This returns the keys/values translated to a hash. The docs
    # for the `Hash.[]` method is here:
    #
    # http://ruby-doc.org/core/classes/Hash.html#M002839
  end
end
')
