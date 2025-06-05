# Smriti Lok [https://smriti-lok.vercel.app/]

## User in DB

- Store user in db only if he creates a first entry or else keep it in clerk.

## Todo

- [x] Reject media file other than image/video and image size should not be greater than 5 mb and video file should not be greater than 10mb.

- [ ] Add pagination in /journeys page.

- [ ] Add images in metadata in detailed page

- [ ] Delete, Edit, feature, filter buttons.

- [ ] Search-bar integrated with open-streets api for locations search.

- [ ] Image full screen image preview when clicked in detailed page.

- [x] Add Image Upload feature.

- [x] Clerk Auth

- [x] Dynamic Route Page for journey.

- [x] Db Integration with Prisma (Provider MongoDB)

  - [x] User Model
    - name, email, picture, role, timestamps
  - [x] Journey Model
    - title, description, date, location, tags, notes, media file, timestamps

## Stretch

- [ ] Delete User Account

- [ ] If the notes length is less than 100 characters then use ai to generate 100 characters.
