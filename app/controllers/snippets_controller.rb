class SnippetsController < ApplicationController

  def show
    @snippet = Snippet.find(params[:id])
  end

end
