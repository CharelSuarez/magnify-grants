# Magnify Grant Website

A fully-featured and accessible grant website that allows anyone to find and apply for grants, even with a screen reader. This was a group project for our software engineering class, which we did in partnership with [MagnifyAccess](https://www.magnifyaccess.ai/), a company that provides accessibility solutions, and who gave us a list of requirements for an accessible grant website.

<figure>
  <img src="images/home.png"/>
</figure>


On the user side, some notable features include: a grant exploration page, grant description page, fully-featured form submission page, and grant statuses page.

On the admin side, there is a fully-featured form builder, grant creation page, application viewing page, and user management page. Other cool features include email verification when logging in, color options, and fully translated pages in many languages.

## Design

The application was built with [Svelte](https://svelte.dev/) as the frontend framework, along with [SvelteKit](https://kit.svelte.dev/) (with Vite) in order to do server-side rendering for every page (there is no other backend). The site's styling is done using [tailwindcss](https://tailwindcss.com/) and the component library [shadcn-svelte](https://www.shadcn-svelte.com/).

It also uses [Supabase](https://supabase.com/), using its built-in PostgreSQL database (with the [Prisma](https://www.prisma.io/) ORM) to store grant and user information, and supabase buckets to hold grant images and file submissions.

## Contribution

I worked a lot on both the frontend and backend side of the website, styling many pages, and implementing their backend logic (and designing database schemas). Here are a few pages which I implemented completely:

## Grant User Page

I created the grant user page (and backend), which shows information about the grant and conveniently has links to fill out the grant's forms.

<figure>
  <img src="images/grant.png"/>
  <figcaption>The user grant page, showing information about the grant, the company offering the grant, and the forms that are required to apply to it.</figcaption>
</figure>

## Form Filler Page

I created the user form filling page (and backend), which populates the page with the required questions on what the grant admin created in the form builder. It features field validation with scrolling, auto save when the user doesn't type for a 5 seconds, and the ability to safely save drafts on the server.

<figure>
  <img src="images/form.gif"/>
  <figcaption>The form filling page, demonstrating filling out a short answer question, auto-saving after 5 seconds, manually saving, and returning to the grant page.</figcaption>
</figure>

## Admin Application List Page

I created the applications page (and backend), which, for admins of an organization, shows a list of users who submitted a grant application along with their information, and tools to filter though and action them.

<figure>
  <img src="images/applications.png"/>
  <figcaption>The application page, with a data table for submitted applications and a filter card.</figcaption>
</figure>

## Usage

First clone this repository anywhere on your computer.

```sh
git clone git@github.com:CharelSuarez/magnify-grants.git
cd magnify-grants
```

Next, ensure you have `pnpm` installed. We won't be using npm.

If you have npm installed you can install `pnpm` with

```sh
npm install -g pnpm
```

or

```sh
brew install pnpm
```

If not, follow these instructions: https://pnpm.io/installation.

Afterwards, while in the working directory of the project, run

```sh
pnpm install
```

This will install all the required packages.

To allow our project to interact with the database, we need to supply it the database information. To do this, let's create a `.env` file. This file will not be committed to git and is unique to your environment.

Create a file named `.env` in the root of your project directory. That is, `magnify-grants/.env`.

You will now be able to use the website by visiting http://localhost:5173/ in the browser.

There is a default seeding on the db with an admin account and organization already setup. The credentials are,

admin@admin.com  
admin

Please note, the production database is on a free tier and may not be very fast to connect to.

## Dev Setup

If you want to run the website without connecting to a hosted database, you can run and initialize the local supabase database.

You will also need Docker installed on your machine if you want to run the local database. I highly recommend this.

Install Docker here https://docs.docker.com/get-docker/

If later you find that your database is failing to connect, verify these values by running `supabase status` or `npx supabase status`

And then you're done!

Update the `.env` file in the root of your project directory to use the local database.

(local DB)

```
PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
PUBLIC_SUPABASE_ANON_KEY=

DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
DIRECT_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
```

To start the local development server with Vite, do

```sh
pnpm run dev
```

This will attempt to start the local database before starting the Vite server for Sveltekit development.

The first time you run this, or if there are any updates to supabase images, it will download quite a few things. This will not happen on every start.

If you don't have Docker currently running, this will fail since the database will not be able to start. If you want to start the website without the dababase, please use the same commanb from the first section:

```sh
pnpm run dev-nodb
```

If you want to stop the database, run `supabase stop` or `npx supabase stop` if the previous command doesn't work.

Similarily, to start the database run `supabase start` or `npx supabase start`. Like above, if this is the first time you're running this or haven't in a while, it will download a few things so it may take a while. Afterwards, it should not take long.

To access the web interface of the local database, you can head to http://127.0.0.1:54323 in your local browser. It is port 54323 by default. This is very useful for local development.

http://127.0.0.1:54324 also exists to test sending emails. We will use this later.

## Production Setup

Fill the contents of `.env` with the information from a production database from your own supabase instance: https://supabase.com/.

```
PUBLIC_SUPABASE_URL="supabase url here"
PUBLIC_SUPABASE_ANON_KEY="supabase anon key here"

// https://www.prisma.io/docs/orm/reference/prisma-schema-reference @url @directUrl
DATABASE_URL="supabase postgres db url here"
DIRECT_URL="supabase postgres db url here"
```

Now can you run the local development server by running

```sh
pnpm run dev-nodb
```

You will now be able to use the website by visiting http://localhost:5173/ in the browser.

There is a default seeding on the db with an admin account and organization already setup. The credentials are:

User: `admin@admin.com`
Pass: `admin`