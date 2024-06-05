This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).  It's mostly just a personal space to for me to practice with Next.js and React, but I also have a [little Sonos app](src/app/sonos) that talks to the [Sonos Node API](https://github.com/jishi/node-sonos-http-api) I have running on a Raspberry Pi elsewhere in the house.  Eventually it's going to also host [code to access my old blog locally](src/app/chrisweb) if I want to look up something there.

# Sonos Controller
A front-end React app designed to interface with a [Sonos Node API](https://github.com/jishi/node-sonos-http-api) running elsewhere on the network.  For situations where the [official Sonos control apps](https://support.sonos.com/en-us/topic/sonos-apps) are unavailable or is otherwise not wanted.

## Getting Started

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/sonos](http://localhost:3000/sonos) with your browser to see the Sonos controller app.

Main app root page is `src/app/sonos/page.tsx`.

## Building and deploying

To build a production server

```bash
npm run build
```

To run server after building

```bash
npm run start
```

## Docker

This application can also be Dockerized.

### Prerequisites
- Docker must be installed
- User must have permission to access Docker

### Updater script
There is a simple [script](updateDockerImage.sh) that automatically builds, stops, and starts a new Docker-based server.

# Blog viewer

TBD