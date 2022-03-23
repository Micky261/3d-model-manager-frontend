# 3D Model Manager (Frontend)
The 3D Model Manager is a webservice to collect and manage your 3D models.

Currently, the project is still in its early stages and contributions are welcome, but there is no documentation on how to set up the development environment or the server itself.

## Structure of the software
The backend ([3D Model Manager Slim Backend](https://github.com/Micky261/3D-Model-Manager-Slim-Backend)) is based on the Slim 4 framework (PHP) with a database (known to be working: MariaDB/MySQL). Composer is required.

The frontend (this repository) is based on the Angular framework with Bootstrap. Yarn is required.

The frontend and backend are completely separated and shall work independently, which means that you should be able to set up a frontend yourself and use any available 3D Model Manager API available. (CORS and CSRF-protection not fully developed yet!)

## Planned features (first version)
### Features
- Separated User Spaces (without sharing any data -> later version)
- Creating+Uploading "Models" with 3D files, images, diagrams, ..., descriptions, notes, links, ... (and downloading, of course)
- Tagging system to tag models
- Importer for 3D model repositories
  - Thingiverse
  - Cults3D
  - MyMiniFactory
  - TinkerCAD
  - SketchFab
  - Thangs
- Simple text search
- German and English language

### Repositories
- CI for linting (and possibly other build processes)
- Example live server
- Documentation & Guides

## Future planning
### Features
- Sets/collections, additionally to tags
- Sharing of models between users and making them available to the public
- Better search
- More importers for other services, e.g. PinShape
- Support of more data formats for documents and diagrams (pdf, eagle, CAD, ...) (viewers in frontend)
- Set limits for users (by admin)
- Generally more settings in the frontend
- More languages (if someone can translate English or German to another language)

### Code
- Use OpenAPI/Swagger in backend with auto-generation for TypeScript.

## Developer setup
### Dependencies
Check out the repository and in the root directory install all dependencies with
```shell
yarn install
```

### Configuration
In the `app/` directory set the `server` to the one you are using and the `folder` to the API endpoint.
If you are using the built-in php server of the backend the configuration can be left unchanged.

If you use another setup, you might also need to change the proxy in the root directory `dev_proxy.conf.json`.

### Start server
You can use the built-in server to start the application:
```shell
yarn run start
```
