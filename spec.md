# GURU & ASSOCIATES

## Current State
Film entries stored in localStorage only. Posters lost when browser cleared or from another device.

## Requested Changes (Diff)

### Add
- FilmData type in backend with name, releaseDate, optional poster blob
- Backend: addFilm, removeFilm, getFilms, updateFilmPoster functions
- Frontend: load/save films from backend

### Modify
- About.tsx: replace localStorage with backend canister calls
- main.mo: add stable film storage

### Remove
- localStorage usage for films

## Implementation Plan
1. Update main.mo with stable film storage
2. Update About.tsx to use backend APIs
