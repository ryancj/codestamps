class StampSerializer < ActiveModel::Serializer
  attributes :id, :stamp, :yPos

  def stamp
    object.state["stamp"]
  end

  def yPos
    object.state["yPos"]
  end

  def stampColor
  end

  def stampTail
  end

  def sidePos
  end

end
