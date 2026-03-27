# GURU & ASSOCIATES

## Current State
Photos stored as base64 in localStorage (4MB limit). Causes memory full errors.

## Requested Changes (Diff)

### Add
- Blob-storage backend integration
- useBlobPhotos hook using ExternalBlob

### Modify
- main.mo: Add blob-storage mixin and photo metadata (addPhoto, removePhoto, getPhotos, clearPhotos)
- Photos.tsx: Use blob-storage URLs instead of dataURLs

### Remove
- usePersistedPhotos hook

## Implementation Plan
1. Update backend to include blob-storage mixin and photo list
2. Regenerate bindings
3. Create useBlobPhotos hook
4. Update Photos.tsx to upload/display/delete via blob-storage
