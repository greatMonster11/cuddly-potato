## cuddly-potato
Todo app. Give the user ability to creating and managing task with simple UI 
<br />
For those user with `paid` plan they could using the note taking under each task(s).
<img width="1509" alt="image" src="https://github.com/user-attachments/assets/59579474-076a-45c6-b170-4508740a1b4c">


## Preview 
[LINK](http://20.198.218.49/todos)

## Setup
The app made with [VueJS](vuejs.org) for client side and [NestJS](nestjs.com) for server side with data stored on the memory (temporary)

- Client:
  + Repo are generated with support from [vite](vite.dev), structured with [Typescript](https://www.typescriptlang.org/) for coding convention
  + State management using with [Pinia](https://pinia.vuejs.org/)
  + `axios` used for asynchronous interaction between user and the apis
  + Components are broken down for easy to reuse and testable
 
- Server:
  + Generated from `nest` command which can be installed via `npm`.
  + The data will be communicated via Restfull api with JSON format
  + Module `in-mem` take responsible for interacting with data from memory
  + Module `todo` provide the api for client, recive and call api from `in-mem` service
  + Some payload are repared and validate under `dto` layer for those `update` or `create` actions
 
- Deployment:
  + Linux based virtual machine
  + Using Github registry to store docker images for each application (client/server)
  + Still handly actions e.g. build/push/pull process during deployment (take time)
 
## Improvement (Personal perspective)
- Add auth (authentication + authorization) to protect the application for paid users
- User could create a collection of tasks (categorized with purpose or lables)
  + Collaboration between users with sharing feature
  + Include web-socket for real time interacting between users on the same collection
- Repsonesive UI for different device.
- Could be separate into mono-repo (using Nx)
- Include automation testing (Playright)
- Create the complete CI/CD pipeline for development
