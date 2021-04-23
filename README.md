# speedtest-to-discord

Run this locally on your network to get discord notifications of your internet speed in a configured interval.

## Deployment

### Requirements

**Docker**: https://docs.docker.com/get-docker/

**Docker Compose**: https://docs.docker.com/compose/install/

### Steps

1. In this directory run `docker-compose pull` to pull the latest image or `docker-compose build` to build it locally.
2. Copy the `.env.template` file to `.env` and fill out the relevant information.
3. Run the application with `docker-compose up -d` and verify the logs with `docker-compose logs -f`
