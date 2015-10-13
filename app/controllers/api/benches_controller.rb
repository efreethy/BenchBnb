class Api::BenchesController < ApplicationController

  def index

    @benches = Bench.in_bounds(params[:bounds],params[:seatingBounds])

    render json: @benches
  end

  def create
    @bench = Bench.new(bench_params)

    if @bench.save
      render json: @bench
    else
      render json: @bench.errors.full_messages, status: 422
    end
  end

  def bench_params
    params.require(:bench).permit(:description, :lat, :lng, :bounds, :seating)
  end
end
