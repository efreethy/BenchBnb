class Bench < ActiveRecord::Base
  validates :lat, :lng, :description, presence: true

  def self.in_bounds(bounds, seatingBounds)
    # bounds in the following format:
    # { "northEast"=> {"lat"=>"37.80971", "lng"=>"-122.39208"},
   #   "southWest"=> {"lat"=>"37.74187", "lng"=>"-122.47791"} }

    boundsHash = JSON.parse(bounds.to_json)
    soutwest_lat = boundsHash["southWest"]["lat"]
    northeast_lat = boundsHash["northEast"]["lat"]

    southwest_long = boundsHash["southWest"]["lng"]
    northeast_long = boundsHash["northEast"]["lng"]

    seatingBoundsHash = JSON.parse(seatingBounds.to_json)
    min_seating = seatingBoundsHash["minSeating"]
    max_seating = seatingBoundsHash["maxSeating"]

    query_string = "lat > #{soutwest_lat} AND lat < #{northeast_lat} AND lng > #{southwest_long} AND lng < #{northeast_long} AND seating >= #{min_seating} AND seating <= #{max_seating}"

    # query_string = "lat > 37.74187 AND lat < 37.80971 AND lng > -122.39208 AND lng < -122.47791"
    Bench.where(query_string)
  end
end
