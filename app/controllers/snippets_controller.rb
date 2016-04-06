class SnippetsController < ApplicationController

  def new
    @snippet = Snippet.new
  end

  def show
    @snippet = Snippet.find(params[:id])
  end

end
