# Oman coastline

The map is an editorial diagram, not a navigation product. It is traced from public-domain Natural Earth 1:10m Admin 0.

1. Download `ne_10m_admin_0_countries.zip` into `data/` from the Natural Earth cultural 10m release.
2. Filter to Oman, project to UTM zone 40N, and export GeoJSON:

```
npx mapshaper data/ne_10m_admin_0_countries.zip \
  -filter 'ADM0_A3 == "OMN"' \
  -proj EPSG:32640 \
  -o format=geojson precision=1 data/oman-full.json
```

Mapshaper writes one file per layer. Use the file that contains the Oman MultiPolygon (`data/oman-full2.json`).

3. Run `npm run map:oman`. The script keeps the mainland and Musandam, simplifies the rings, flips them into an SVG viewBox, and writes `lib/network/oman.ts`.
4. Sample markers sit on the simplified coastline. Their highlight paths are stretches of that coastline. No line crosses the sea.

The committed `lib/network/oman.ts` is the build output. Regenerate it when the source data is refreshed. Do not draw neighbouring countries.
