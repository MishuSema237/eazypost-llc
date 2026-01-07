
interface SmartLocation {
    name: string;
    lat: number;
    lng: number;
}

/**
 * Smart Geocoding Service
 * Resolves a query string (Address name or "Lat, Lon") into a unified object.
 * Returns: { lat, lng, name } or null
 */
export const resolveLocation = async (query: string): Promise<SmartLocation | null> => {
    if (!query) return null;

    // 1. Detect if input is raw coordinates (e.g. "4.047, 9.689")
    // Allows optional spaces, handles negative numbers
    const coordRegex = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/;
    const match = query.match(coordRegex);

    // CASE A: Input is Coordinates -> Reverse Geocode
    if (match) {
        const lat = parseFloat(match[1]);
        const lon = parseFloat(match[3]);

        try {
            // Using Photon API (OpenStreetMap based, CORS friendly)
            const url = `https://photon.komoot.io/reverse?lon=${lon}&lat=${lat}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.features && data.features.length > 0) {
                const props = data.features[0].properties;

                // Try to construct a more specific address line
                let addressName = props.name;
                if (props.housenumber && props.street) {
                    addressName = `${props.housenumber} ${props.street}`;
                } else if (props.street) {
                    addressName = props.street;
                }

                const addressParts = [
                    addressName,
                    props.city,
                    props.state,
                    props.postcode,
                    props.country
                ].filter(item => item && item !== "");

                const uniqueParts = Array.from(new Set(addressParts));

                return {
                    lat: lat,
                    lng: lon,
                    name: uniqueParts.join(", ") || `Coordinates: ${lat}, ${lon}`
                };
            } else {
                // Valid coordinates but no address found
                return {
                    lat: lat,
                    lng: lon,
                    name: `Logistics Point (${lat.toFixed(4)}, ${lon.toFixed(4)})`
                };
            }
        } catch (error) {
            console.error("Reverse geocoding error:", error);
            // Fallback if API fails but we have coords
            return { lat, lng: lon, name: `Logistics Point (${lat.toFixed(4)}, ${lon.toFixed(4)})` };
        }
    }

    // CASE B: Input is Address -> Forward Geocode
    try {
        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const coords = data.features[0].geometry.coordinates; // Photon returns [lon, lat]
            const props = data.features[0].properties;

            const addressParts = [
                props.name,
                props.street,
                props.city,
                props.country
            ].filter(Boolean);

            return {
                lat: coords[1],
                lng: coords[0],
                name: addressParts.join(", ") || query
            };
        }
    } catch (error) {
        console.error("Geocoding error:", error);
    }

    // Fallback: If we couldn't resolve it, return null so the caller knows
    // The caller might usually just fallback to saving the string as-is without coords
    return null;
};
