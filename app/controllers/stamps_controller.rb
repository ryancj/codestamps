class StampsController < ApplicationController
  before_action :find_snippet, only: [:index, :create]

  def index
    render json: @snippet.stamps
  end

  def create
    @stamp = @snippet.stamps.build(stamp_params)
    respond_to do |format|
      if @stamp.save
        format.json { render json: @stamp }
      else
        format.json { render json: @stamp.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @stamp = Stamp.find(params[:id])
    if @stamp.update(stamp_params)
      render json: @stamp
    end
  end

  def destroy
    
  end

  private
    def stamp_params
      params.permit().tap do |whitelisted|
        whitelisted[:state] = params[:state]
      end
    end

    def find_snippet
      @snippet = Snippet.find(params[:snippet_id])
    end

end
