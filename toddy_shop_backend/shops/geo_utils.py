import math


def haversine(lat1, lng1, lat2, lng2):
    """
    Calculate the great-circle distance in kilometres between two points
    on Earth using the Haversine formula.
    """
    R = 6371  # Earth radius in km
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lng2 - lng1)

    a = (
        math.sin(dphi / 2) ** 2
        + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2
    )
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def filter_shops_by_distance(queryset, lat, lng, radius_km):
    """
    Filter and annotate a ToddyShop queryset by proximity.
    Returns a list of (shop, distance_km) tuples sorted by distance.
    """
    results = []
    for shop in queryset:
        place = shop.place
        if place.latitude is None or place.longitude is None:
            continue
        distance = haversine(lat, lng, float(place.latitude), float(place.longitude))
        if distance <= radius_km:
            results.append((shop, round(distance, 2)))
    results.sort(key=lambda x: x[1])
    return results
