# 3D Model Manager (Frontend)
The 3D Model Manager is a webservice to collect and manage your 3D models.

Currently, the project is still in its early stages and contributions are welcome, but there is no documentation on how to set up the development environment or the server itself.

## Structure of the software
The backend ([another repository](https://github.com/Micky261/3d-model-manager-backend)) is based on Laravel 8 (PHP) and a MySQL/MariaDB database. The frontend of laravel is not used and will (hopefully) be discarded, only the API server is used. Composer is required.

The frontend (this repository) is based on Angular 10 with Typescript and Bootstrap. Yarn is required.

The frontend and backend are completely separated and shall work independently, which means that you should be able to set up a frontend yourself and use any available 3D Model Manager API available.

## Planned features (first version)
### Features
- Separated User Spaces (without sharing any data -> later version) with Registration for new users
- Creating+Uploading "Models" with 3D files, images, diagrams, ..., descriptions, notes, links, ... (and downloading, of course)
- Tagging system to tag models
- Importer for 3D model repositories
    - Thingiverse
    - Cults3D
    - MyMiniFactory
    - TinkerCAD
- Simple text search
- German and English language

### Repositories
- CI for linting (and possibly other build processes)
- Example live server
- Documentation & Guides

## Future planning
### Features
- Besides tags also sets (collections)
- Sharing of models between users and making them available to the public
- Better search (if needed)
- More importers for other services, e.g. PinShape
- Support of more data formats for documents and diagrams (pdf, eagle, CAD, ...) (viewers in frontend)
- Set limits for users (by admin)
- Generally more settings in the frontend
- More languages (if someone can translate English or German to another language)

### Code
- Use OpenAPI/Swagger in backend with auto-generation for TypeScript.
